"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import type { ModuleKey } from "@/content/site";
import { useI18n } from "@/i18n/client";
import { IconArrowRight, IconCatalog, IconCollect, IconPrepare } from "@/components/brand/icons";
import { delay } from "@/components/ui/primitives";

export type PipelineModule = {
  key: ModuleKey;
  index: string;
  title: string;
  product: string;
  href: string;
  summary: string;
  verbs: string[];
};

// Fixed geometry: 6 source lanes, 4 outputs (labels come from the dictionary).
const SOURCES = Array.from({ length: 6 });
const OUTPUTS = Array.from({ length: 4 });
const ICONS: Record<ModuleKey, ComponentType<{ size?: number }>> = {
  collect: IconCollect,
  catalog: IconCatalog,
  prepare: IconPrepare,
};

type Pt = { x: number; y: number };
type Layout = {
  w: number;
  h: number;
  sources: Pt[];
  stages: Pt[];
  outputs: Pt[];
  curve: (a: Pt, b: Pt) => string;
  labelAnchor: "start" | "middle";
};

const horizontal: Layout = {
  w: 1200,
  h: 440,
  sources: SOURCES.map((_, i) => ({ x: 70, y: 50 + i * 68 })),
  stages: [370, 580, 790].map((x) => ({ x, y: 220 })),
  outputs: OUTPUTS.map((_, i) => ({ x: 1030, y: 100 + i * 80 })),
  curve: (a, b) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
  },
  labelAnchor: "start",
};

const vertical: Layout = {
  w: 400,
  h: 900,
  sources: SOURCES.map((_, i) => ({ x: 45 + (i % 3) * 155, y: 40 + Math.floor(i / 3) * 56 })),
  stages: [290, 470, 650].map((y) => ({ x: 200, y })),
  outputs: OUTPUTS.map((_, i) => ({ x: 60 + (i % 2) * 210, y: 790 + Math.floor(i / 2) * 44 })),
  curve: (a, b) => {
    const my = (a.y + b.y) / 2;
    return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  },
  labelAnchor: "middle",
};

function Diagram({
  layout,
  active,
  setActive,
  className,
  modules,
}: {
  layout: Layout;
  active: ModuleKey | null;
  setActive: (k: ModuleKey | null) => void;
  className?: string;
  modules: PipelineModule[];
}) {
  const { t } = useI18n();
  const { w, h, sources, stages, outputs, curve } = layout;
  const isH = layout === horizontal;
  const R = 42;

  const inPaths = sources.map((s) => curve(isH ? { x: s.x + 46, y: s.y } : { x: s.x, y: s.y + 14 }, isH ? { x: stages[0].x - R, y: stages[0].y } : { x: stages[0].x, y: stages[0].y - R }));
  const outPaths = outputs.map((o) => curve(isH ? { x: stages[2].x + R, y: stages[2].y } : { x: stages[2].x, y: stages[2].y + R }, isH ? { x: o.x - 16, y: o.y } : { x: o.x, y: o.y - 16 }));
  const links = [0, 1].map((i) => curve(isH ? { x: stages[i].x + R, y: stages[i].y } : { x: stages[i].x, y: stages[i].y + R }, isH ? { x: stages[i + 1].x - R, y: stages[i + 1].y } : { x: stages[i + 1].x, y: stages[i + 1].y - R }));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label={t.pipeline.aria}>
      <defs>
        <linearGradient id={`pl-${isH}`} x1="0" x2={isH ? "1" : "0"} y1="0" y2={isH ? "0" : "1"}>
          <stop offset="0" stopColor="#6C63FF" />
          <stop offset="1" stopColor="#E04FF0" />
        </linearGradient>
        <radialGradient id={`glow-${isH}`}>
          <stop offset="0" stopColor="#9A5CFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#9A5CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* paths */}
      <g fill="none" strokeWidth="1">
        {inPaths.map((d, i) => (
          <g key={`in${i}`}>
            <path id={`in-${isH}-${i}`} d={d} stroke="rgb(236 235 255 / 0.10)" />
            <path d={d} stroke="#6C63FF" strokeOpacity={active === "collect" ? 0.9 : 0.45} className="flow-line" />
          </g>
        ))}
        {links.map((d, i) => (
          <g key={`ln${i}`}>
            <path id={`ln-${isH}-${i}`} d={d} stroke={`url(#pl-${isH})`} strokeWidth="1.5" strokeOpacity="0.8" />
          </g>
        ))}
        {outPaths.map((d, i) => (
          <g key={`out${i}`}>
            <path id={`out-${isH}-${i}`} d={d} stroke="rgb(236 235 255 / 0.10)" />
            <path d={d} stroke="#E04FF0" strokeOpacity={active === "prepare" ? 0.9 : 0.45} className="flow-line" />
          </g>
        ))}
      </g>

      {/* packets: heterogeneous in, homogeneous through, insights out */}
      <g>
        {inPaths.map((_, i) => (
          <rect key={`pin${i}`} x={-3} y={-3} width={6} height={6} rx={i % 2 ? 3 : 1} fill="#B6B5D8">
            <animateMotion dur={`${(2.6 + (i % 3) * 0.55).toFixed(2)}s`} begin={`-${(i * 0.37 + 0.1).toFixed(2)}s`} repeatCount="indefinite">
              <mpath href={`#in-${isH}-${i}`} />
            </animateMotion>
          </rect>
        ))}
        {links.map((_, i) =>
          [0, 0.6, 1.2].map((b) => (
            <circle key={`pl${i}${b}`} r={3} fill="#fff">
              <animateMotion dur="1.8s" begin={`-${(b + i * 0.3 + 0.1).toFixed(2)}s`} repeatCount="indefinite">
                <mpath href={`#ln-${isH}-${i}`} />
              </animateMotion>
            </circle>
          )),
        )}
        {outPaths.map((_, i) => (
          <circle key={`pout${i}`} r={3.5} fill="#E04FF0">
            <animateMotion dur={`${2.4 + (i % 2) * 0.6}s`} begin={`-${(0.5 + i * 0.45).toFixed(2)}s`} repeatCount="indefinite">
              <mpath href={`#out-${isH}-${i}`} />
            </animateMotion>
          </circle>
        ))}
      </g>

      {/* sources */}
      {sources.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`}>
          <rect x={isH ? -58 : -48} y={-14} width={isH ? 104 : 96} height={28} rx={14} fill="#0B0B33" stroke="rgb(236 235 255 / 0.14)" />
          <text x={isH ? -6 : 0} y={4.5} textAnchor="middle" fontSize="12" fill="#B6B5D8" className="t-mono">
            {t.pipeline.sources[i]}
          </text>
        </g>
      ))}

      {/* stages */}
      {modules.map((m, i) => {
        const p = stages[i];
        const on = active === m.key;
        const Icon = ICONS[m.key];
        return (
          <g
            key={m.key}
            transform={`translate(${p.x} ${p.y})`}
            onMouseEnter={() => setActive(m.key)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          >
            <circle r={90} fill={`url(#glow-${isH})`} opacity={on ? 1 : 0.35} style={{ transition: "opacity .5s" }} />
            <circle r={R} fill="#07072A" stroke={on ? `url(#pl-${isH})` : "rgb(236 235 255 / 0.18)"} strokeWidth={on ? 2 : 1} />
            {on && <circle r={R} fill="none" stroke="#9A5CFF" className="pulse-ring" />}
            <g transform="translate(-14 -14)" color={on ? "#fff" : "#ECEBFF"}>
              <Icon size={28} />
            </g>
            <text y={R + 26} textAnchor="middle" fontSize="11" fill="#8B8AB6" className="t-mono" letterSpacing="1.5">
              {m.index}
            </text>
            <text y={R + 46} textAnchor="middle" fontSize="15" fill="#ECEBFF" fontWeight={500}>
              {m.title}
            </text>
          </g>
        );
      })}

      {/* outputs */}
      {outputs.map((o, i) => (
        <g key={i} transform={`translate(${o.x} ${o.y})`}>
          <circle r={5} fill="#E04FF0" />
          <circle r={11} fill="none" stroke="#E04FF0" strokeOpacity="0.35" />
          <text x={isH ? 22 : 0} y={isH ? 4.5 : 30} textAnchor={isH ? "start" : "middle"} fontSize="13" fill="#ECEBFF">
            {t.pipeline.outputs[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Pipeline({ modules }: { modules: PipelineModule[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState<ModuleKey | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // SMIL and dash animations run on the main thread: only tick while visible.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const svgs = () => Array.from(el.querySelectorAll("svg")) as SVGSVGElement[];
    svgs().forEach((s) => s.pauseAnimations());
    el.dataset.paused = "";
    const io = new IntersectionObserver(([e]) => {
      svgs().forEach((s) => (e.isIntersecting && (s.checkVisibility?.() ?? true) ? s.unpauseAnimations() : s.pauseAnimations()));
      if (e.isIntersecting) delete el.dataset.paused;
      else el.dataset.paused = "";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <div ref={frameRef} className="card relative overflow-hidden px-4 py-10 md:px-8" data-reveal>
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <Diagram modules={modules} layout={horizontal} active={active} setActive={setActive} className="relative hidden h-auto w-full md:block" />
        <Diagram modules={modules} layout={vertical} active={active} setActive={setActive} className="relative mx-auto block h-auto w-full max-w-[420px] md:hidden" />
      </div>

      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {modules.map((m, i) => (
          <li key={m.key} data-reveal style={delay(i * 100)}>
            <Link
              href={m.href}
              onMouseEnter={() => setActive(m.key)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(m.key)}
              onBlur={() => setActive(null)}
              className={`card card-glow group flex h-full flex-col p-7 ${active === m.key ? "border-line-2" : ""}`}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="t-mono text-sm text-ink-3">{m.index}</span>
                <span className="t-eyebrow">{m.product}</span>
              </div>
              <h3 className="t-h3 mt-10">{m.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{m.summary}</p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <span className="t-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{m.verbs.join(" · ")}</span>
                <span className="flex shrink-0 items-center gap-1.5 text-sm text-ink">
                  {t.common.seeMore}
                  <span className="sr-only">
                    {" "}
                    {t.common.about} {m.product}
                  </span>
                  <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
