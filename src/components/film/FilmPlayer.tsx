"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DURATION, H, SCENES, W, render, sceneIndexAt, type Env } from "./engine";
import { FilmAudio } from "./audio";
import {
  IconDownload,
  IconExpand,
  IconMute,
  IconPause,
  IconPlay,
  IconReplay,
  IconSound,
} from "@/components/brand/icons";
import { useClientValue } from "@/lib/hooks";
import { useI18n } from "@/i18n/client";
import { fmt as tpl } from "@/i18n/config";

const fmt = (s: number) => {
  const v = Math.max(0, Math.floor(s));
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
};

function pickMime() {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    { mime: "video/mp4;codecs=avc1.640028", ext: "mp4" },
    { mime: "video/mp4", ext: "mp4" },
    { mime: "video/webm;codecs=vp9", ext: "webm" },
    { mime: "video/webm", ext: "webm" },
  ];
  return candidates.find((c) => MediaRecorder.isTypeSupported(c.mime)) ?? null;
}

export function FilmPlayer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { locale, t: dict } = useI18n();
  const p = dict.player;
  const chapter = (i: number) => dict.film.chapters[i] ?? SCENES[i].chapter;
  const envRef = useRef<Env>({ font: "sans-serif", mono: "monospace", s: dict.film });
  const audioRef = useRef<FilmAudio | null>(null);
  const clock = useRef({ base: 0, startedAt: 0, playing: false });
  const rafRef = useRef(0);
  const exportRef = useRef<{ rec: MediaRecorder; chunks: Blob[]; ext: string } | null>(null);

  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const [exporting, setExporting] = useState(false);
  const canExport = useClientValue(() => !!pickMime() && "captureStream" in HTMLCanvasElement.prototype, false);
  const [ready, setReady] = useState(false);

  const now = () => {
    const c = clock.current;
    return c.playing ? c.base + (performance.now() - c.startedAt) / 1000 : c.base;
  };

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    render(ctx, time, envRef.current);
  }, []);

  const finishExport = useCallback(() => {
    const ex = exportRef.current;
    if (!ex) return;
    ex.rec.stop();
  }, []);

  // The frame loop lives in a ref so it can reschedule itself with the latest closures.
  const loopRef = useRef<() => void>(() => {});
  useEffect(() => {
    loopRef.current = () => {
      const time = now();
      if (time >= DURATION) {
        clock.current = { base: DURATION, startedAt: 0, playing: false };
        setPlaying(false);
        draw(DURATION);
        setT(DURATION);
        if (exportRef.current) finishExport();
        return;
      }
      draw(time);
      setT(time);
      audioRef.current?.setScene(sceneIndexAt(time));
      rafRef.current = requestAnimationFrame(() => loopRef.current());
    };
  }, [draw, finishExport]);

  const play = useCallback(() => {
    if (clock.current.playing) return;
    const from = clock.current.base >= DURATION ? 0 : clock.current.base;
    clock.current = { base: from, startedAt: performance.now(), playing: true };
    setPlaying(true);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => loopRef.current());
  }, []);

  const pause = useCallback(() => {
    clock.current = { base: now(), startedAt: 0, playing: false };
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
    audioRef.current?.pause();
  }, []);

  const seek = useCallback(
    (time: number) => {
      const v = Math.min(DURATION, Math.max(0, time));
      clock.current = { ...clock.current, base: v, startedAt: performance.now() };
      setT(v);
      if (!clock.current.playing) draw(v);
    },
    [draw],
  );

  // Fit the backing store to the element (capped at 1080p) and redraw.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(([entry]) => {
      if (exportRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.min(W, Math.round(entry.contentRect.width * dpr));
      canvas.width = w;
      canvas.height = Math.round((w * H) / W);
      draw(now());
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  // Fonts, export support, autoplay-in-view (unless reduced motion).
  useEffect(() => {
    const cs = getComputedStyle(document.body);
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim();
    envRef.current = { font: cs.fontFamily, mono: mono ? `${mono}, monospace` : "monospace", s: envRef.current.s };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    // Deep link to a timecode, e.g. /film?t=19 (paused on that frame)
    const deep = Number(new URLSearchParams(window.location.search).get("t"));
    document.fonts.ready.then(() => {
      setReady(true);
      if (deep > 0) {
        seek(deep);
        return;
      }
      if (reduce) {
        seek(SCENES[SCENES.length - 1].start + 3);
        return;
      }
      draw(0);
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !clock.current.playing && clock.current.base === 0) play();
          if (!e.isIntersecting && clock.current.playing && !exportRef.current) pause();
        },
        { threshold: 0.5 },
      );
      if (wrapRef.current) io.observe(wrapRef.current);
    });
    return () => {
      io?.disconnect();
      cancelAnimationFrame(rafRef.current);
      audioRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sound && playing) audioRef.current?.start().then(() => audioRef.current?.setScene(sceneIndexAt(now())));
    if (!sound || !playing) audioRef.current?.pause();
  }, [sound, playing]);

  const toggleSound = () => {
    if (!audioRef.current) audioRef.current = new FilmAudio();
    setSound((s) => !s);
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const startExport = async () => {
    const canvas = canvasRef.current;
    const choice = pickMime();
    if (!canvas || !choice || exportRef.current) return;
    canvas.width = W;
    canvas.height = H;
    const stream = canvas.captureStream(60);
    if (sound && audioRef.current) {
      await audioRef.current.start();
      audioRef.current.stream?.stream.getAudioTracks().forEach((tr) => stream.addTrack(tr));
    }
    const rec = new MediaRecorder(stream, { mimeType: choice.mime, videoBitsPerSecond: 12_000_000 });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: choice.mime.split(";")[0] });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `loamics-film-${locale}.${choice.ext}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      exportRef.current = null;
      setExporting(false);
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.min(W, Math.round(rect.width * dpr));
      canvas.height = Math.round((canvas.width * H) / W);
      draw(now());
    };
    exportRef.current = { rec, chunks, ext: choice.ext };
    setExporting(true);
    pause();
    seek(0);
    rec.start(250);
    play();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (exporting) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") {
      e.preventDefault();
      if (playing) pause();
      else play();
    } else if (k === "arrowright") seek(now() + 5);
    else if (k === "arrowleft") seek(now() - 5);
    else if (k === "f") fullscreen();
    else if (k === "m") toggleSound();
    else if (k === "home") seek(0);
  };

  const si = sceneIndexAt(t);
  const ended = t >= DURATION;

  return (
    <div>
      <div
        ref={wrapRef}
        tabIndex={0}
        onKeyDown={onKey}
        aria-label={p.aria}
        className="group relative overflow-hidden rounded-[22px] border border-line bg-night-950 outline-none focus-visible:ring-2 focus-visible:ring-violet [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
      >
        <canvas
          ref={canvasRef}
          onClick={() => !exporting && (playing ? pause() : play())}
          className={`block aspect-video w-full cursor-pointer transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          role="img"
          aria-label={tpl(p.canvas, { chapter: chapter(si) })}
        />

        {!playing && !exporting && <div aria-hidden className="pointer-events-none absolute inset-0 bg-night-950/45" />}
        {!playing && !exporting && (
          <button
            type="button"
            onClick={play}
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-night-950 shadow-2xl transition-transform duration-500 hover:scale-105"
            aria-label={ended ? p.replay : p.play}
          >
            {ended ? <IconReplay size={28} /> : <IconPlay size={28} />}
          </button>
        )}

        {exporting && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-night-950/80 px-3 py-1.5 text-xs backdrop-blur" role="status">
            <span className="h-2 w-2 animate-pulse rounded-full bg-magenta" />
            {p.recording} {fmt(t)} / {fmt(DURATION)}
          </div>
        )}

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/90 to-transparent px-4 pb-3 pt-10 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 [&:has(:focus-visible)]:opacity-100">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={DURATION}
              step={0.01}
              value={t}
              disabled={exporting}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label={p.seek}
              aria-valuetext={`${fmt(t)} ${p.of} ${fmt(DURATION)}`}
              className="film-range w-full"
              style={{ ["--p" as string]: `${(t / DURATION) * 100}%` }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-0">
              {SCENES.slice(1).map((s) => (
                <span key={s.id} className="absolute h-2 w-px -translate-y-1/2 bg-night-950" style={{ left: `${(s.start / DURATION) * 100}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-ink">
            <button type="button" disabled={exporting} onClick={playing ? pause : play} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={playing ? p.pause : p.playShort}>
              {playing ? <IconPause size={18} /> : <IconPlay size={18} />}
            </button>
            <button type="button" onClick={toggleSound} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={sound ? p.mute : p.unmute} aria-pressed={sound}>
              {sound ? <IconSound size={18} /> : <IconMute size={18} />}
            </button>
            <span className="t-mono ml-2 text-xs text-ink-2">
              {fmt(t)} / {fmt(DURATION)}
            </span>
            <span className="t-mono ml-3 hidden truncate text-xs text-ink-3 sm:inline">{chapter(si)}</span>
            <span className="flex-1" />
            {canExport && (
              <button type="button" onClick={startExport} disabled={exporting} className="flex h-9 items-center gap-2 rounded-full px-3 text-xs hover:bg-white/10 disabled:opacity-50" aria-label={p.exportAria}>
                <IconDownload size={16} />
                <span className="hidden sm:inline">{exporting ? p.exporting : p.export}</span>
              </button>
            )}
            <button type="button" onClick={fullscreen} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label={p.fullscreen}>
              <IconExpand size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <ol className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-9">
        {SCENES.map((s, i) => (
          <li key={s.id} className="bg-night-950">
            <button
              type="button"
              disabled={exporting}
              onClick={() => {
                seek(s.start + 0.001);
                if (!playing) play();
              }}
              aria-current={i === si ? "step" : undefined}
              className={`relative block h-full w-full p-4 text-left transition-colors hover:bg-night-900 ${i === si ? "bg-night-900" : ""}`}
            >
              <span className="t-mono block text-[11px] text-ink-3">{fmt(s.start)}</span>
              <span className={`mt-2 block text-sm leading-tight ${i === si ? "text-ink" : "text-ink-2"}`}>{chapter(i)}</span>
              {i === si && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 bg-[image:var(--signal)]"
                  style={{ width: `${((t - s.start) / (s.end - s.start)) * 100}%` }}
                />
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
