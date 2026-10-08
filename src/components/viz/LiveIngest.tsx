"use client";

import { useEffect, useRef, useState } from "react";
import { mulberry32 } from "@/lib/math";
import { DemoFrame } from "./DemoFrame";
import { useI18n } from "@/i18n/client";
import { IconPause, IconPlay } from "@/components/brand/icons";

type Event = { id: number; ts: string; source: string; format: string; payload: string };

const SOURCES: { source: string; format: string; make: (r: () => number) => string }[] = [
  { source: "ERP", format: "XML", make: (r) => `<order id="${4000 + Math.floor(r() * 900)}" qty="${1 + Math.floor(r() * 40)}"/>` },
  { source: "CRM", format: "JSON", make: (r) => `{"account":"AC-${Math.floor(r() * 9000)}","stage":"${["lead", "won", "lost"][Math.floor(r() * 3)]}"}` },
  { source: "IoT", format: "MQTT", make: (r) => `plant/line-${"ABC"[Math.floor(r() * 3)]}/temp ${(19 + r() * 6).toFixed(1)}` },
  { source: "E-commerce", format: "JSON", make: (r) => `{"cart":${Math.floor(r() * 9999)},"total":${(r() * 420).toFixed(2)}}` },
  { source: "Files", format: "CSV", make: (r) => `2024-03-01,${(r() * 1000).toFixed(0)},EUR,${["FR", "DE", "ES"][Math.floor(r() * 3)]}` },
  { source: "Logs", format: "TEXT", make: (r) => `INFO gateway latency=${Math.floor(8 + r() * 40)}ms` },
];

/** A simulated real-time stream: raw events are collected as-is, without transformation. */
export function LiveIngest() {
  const { locale, t } = useI18n();
  const x = t.ingest;
  const [events, setEvents] = useState<Event[]>([]);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const rand = useRef(mulberry32(42));
  const id = useRef(0);

  // Stream only while on screen: no work for an unseen demo.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const r = rand.current;
      const s = SOURCES[Math.floor(r() * SOURCES.length)];
      const now = new Date();
      const ev: Event = {
        id: id.current++,
        ts: now.toISOString().slice(11, 23),
        source: s.source,
        format: s.format,
        payload: s.make(r),
      };
      setEvents((e) => [ev, ...e].slice(0, 8));
      setCount((c) => c + 1);
    };
    tick();
    const h = setInterval(tick, reduce ? 1600 : 420);
    return () => clearInterval(h);
  }, [running, visible]);

  const formats = new Set(events.map((e) => e.format)).size;
  const sources = new Set(events.map((e) => e.source)).size;

  return (
    <DemoFrame
      title={x.title}
      controls={
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
          aria-pressed={!running}
        >
          {running ? <IconPause size={14} /> : <IconPlay size={14} />}
          {running ? x.pause : x.resume}
        </button>
      }
      caption={x.caption}
    >
      <div ref={rootRef} className="grid md:grid-cols-[1fr_220px]">
        <ol className="t-mono min-h-[340px] space-y-1 overflow-hidden p-4 text-xs md:p-5" aria-live="off" aria-label={x.events}>
          {events.map((e, i) => (
            <li
              key={e.id}
              className="grid grid-cols-[86px_88px_48px_1fr] items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-700"
              style={{ opacity: 1 - i * 0.09, background: i === 0 ? "rgb(108 99 255 / 0.12)" : "transparent" }}
            >
              <span className="text-ink-3">{e.ts}</span>
              <span className="truncate text-ink">{e.source}</span>
              <span className="text-violet">{e.format}</span>
              <span className="truncate text-ink-2">{e.payload}</span>
            </li>
          ))}
        </ol>
        <dl className="grid grid-cols-3 gap-px border-t border-line bg-line md:grid-cols-1 md:border-l md:border-t-0">
          {[
            { k: x.ingested, v: count.toLocaleString(locale === "fr" ? "fr-FR" : "en-US") },
            { k: x.sources, v: sources },
            { k: x.formats, v: formats },
          ].map((s) => (
            <div key={s.k} className="bg-night-950 p-4 md:p-5">
              <dt className="t-eyebrow text-[10px]">{s.k}</dt>
              <dd className="mt-2 text-2xl font-medium tabular-nums tracking-tight md:text-3xl">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DemoFrame>
  );
}
