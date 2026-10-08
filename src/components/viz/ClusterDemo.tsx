"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/config";
import { blobs, kmeans } from "@/lib/kmeans";
import { DemoFrame } from "./DemoFrame";
import { IconReplay } from "@/components/brand/icons";

const CENTERS = [
  { x: 0.22, y: 0.28 },
  { x: 0.72, y: 0.22 },
  { x: 0.5, y: 0.7 },
  { x: 0.85, y: 0.72 },
  { x: 0.18, y: 0.78 },
];
// Validated (dataviz validator, dark, all pairs): 3 hues is the ceiling for a scatter.
// Segments 4 to 6 reuse the hues with a square mark, so identity never relies on color alone.
const HUES = ["#3987E5", "#D95926", "#199E70"];
const color = (i: number) => HUES[i % 3];
const square = (i: number) => i >= 3;
const K_RANGE = [2, 3, 4, 5, 6];
const POINTS = blobs(260, CENTERS, 0.075, 21);

/** Loamics AutoML · clustering: real k-means++ (src/lib/kmeans.ts), animated iteration by iteration. */
export function ClusterDemo() {
  const { t } = useI18n();
  const x = t.cluster;
  const [k, setK] = useState(5);
  const [seed, setSeed] = useState(3);
  const steps = useMemo(() => kmeans(POINTS, k, { seed }), [k, seed]);
  const reduce = useReducedMotion();
  // Restart the animation whenever the run changes (state adjusted during render).
  const [run, setRun] = useState({ steps, step: 0 });
  if (run.steps !== steps) setRun({ steps, step: 0 });
  const step = reduce ? steps.length - 1 : Math.min(run.step, steps.length - 1);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setRun((r) => (r.step >= r.steps.length - 1 ? r : { ...r, step: r.step + 1 }));
    }, 550);
    return () => clearInterval(timer);
  }, [steps, reduce]);

  const elbow = useMemo(() => K_RANGE.map((kk) => ({ k: kk, inertia: kmeans(POINTS, kk, { seed }).at(-1)!.inertia })), [seed]);
  const cur = steps[step];
  const converged = step === steps.length - 1;
  const sizes = cur.centroids.map((_, c) => cur.labels.filter((l) => l === c).length);

  return (
    <DemoFrame
      title={x.title}
      note={t.common.inBrowser}
      controls={
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 text-xs text-ink-2">
            <span className="t-mono">k = {k}</span>
            <input
              type="range"
              min={2}
              max={6}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="film-range w-24"
              style={{ ["--p" as string]: `${((k - 2) / 4) * 100}%` }}
              aria-label={x.kAria}
            />
          </label>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
          >
            <IconReplay size={14} /> {x.reseed}
          </button>
        </div>
      }
      caption={x.caption}
    >
      <div className="grid md:grid-cols-[1fr_240px]">
        <svg viewBox="0 0 100 70" className="aspect-[10/7] w-full" role="img" aria-label={fmt(x.plotAria, { k })}>
          <defs>
            <pattern id="cl-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0H0V10" fill="none" stroke="rgb(236 235 255 / 0.05)" strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="70" fill="url(#cl-grid)" />
          {POINTS.map((p, i) => {
            const l = cur.labels[i];
            const x = +(4 + p.x * 92).toFixed(2);
            const y = +(3 + p.y * 64).toFixed(2);
            return square(l) ? (
              <rect key={i} x={x - 0.6} y={y - 0.6} width={1.2} height={1.2} fill={color(l)} opacity={0.9} style={{ transition: "fill .45s" }} />
            ) : (
              <circle key={i} cx={x} cy={y} r={0.7} fill={color(l)} opacity={0.9} style={{ transition: "fill .45s" }} />
            );
          })}
          {cur.centroids.map((c, i) => (
            <g key={i} style={{ transform: `translate(${(4 + c.x * 92).toFixed(2)}px, ${(3 + c.y * 64).toFixed(2)}px)`, transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}>
              <circle r={2.4} fill="#04041A" fillOpacity={0.6} stroke="#ECEBFF" strokeWidth={0.3} />
              <text y={0.85} textAnchor="middle" fontSize={2.4} fill="#ECEBFF" className="t-mono">
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
        <div className="flex flex-col border-t border-line md:border-l md:border-t-0">
          <dl className="grid grid-cols-2 gap-px bg-line">
            <div className="bg-night-950 p-4">
              <dt className="t-eyebrow text-[10px]">{x.iteration}</dt>
              <dd className="mt-1 text-2xl font-medium tabular-nums">{step + 1}</dd>
            </div>
            <div className="bg-night-950 p-4">
              <dt className="t-eyebrow text-[10px]">{x.inertia}</dt>
              <dd className="mt-1 text-2xl font-medium tabular-nums">{cur.inertia.toFixed(2)}</dd>
            </div>
          </dl>
          <ul className="flex-1 space-y-2 p-4 text-xs" aria-label={x.sizes}>
            {sizes.map((n, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={`h-2 w-2 ${square(i) ? "rounded-[1px]" : "rounded-full"}`} style={{ background: color(i) }} />
                <span className="t-mono text-ink-3">{fmt(x.segment, { n: i + 1 })}</span>
                <span className="h-1 flex-1 overflow-hidden rounded bg-line">
                  <span className="block h-full rounded transition-[width] duration-500" style={{ width: `${(n / POINTS.length) * 100}%`, background: color(i) }} />
                </span>
                <span className="t-mono w-8 text-right tabular-nums text-ink-2">{n}</span>
              </li>
            ))}
          </ul>
          <Elbow data={elbow} k={k} onPick={setK} />
          <p className="t-mono border-t border-line p-4 text-[11px] uppercase tracking-[0.12em] text-ink-3" role="status">
            {converged ? x.converged : x.optimizing}
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}

/** Model selection: final inertia for each k. The bend ("elbow") suggests the natural number of segments. */
function Elbow({ data, k, onPick }: { data: { k: number; inertia: number }[]; k: number; onPick: (k: number) => void }) {
  const { t } = useI18n();
  const [hover, setHover] = useState<number | null>(null);
  const W = 200;
  const H = 84;
  const max = Math.max(...data.map((d) => d.inertia));
  const x = (i: number) => 12 + (i / (data.length - 1)) * (W - 24);
  const y = (v: number) => 10 + (1 - v / max) * (H - 30);
  const shown = data.find((d) => d.k === (hover ?? k))!;
  return (
    <div className="border-t border-line p-4">
      <div className="flex items-baseline justify-between">
        <p className="t-eyebrow text-[10px]">{t.cluster.elbow}</p>
        <p className="t-mono text-[11px] tabular-nums text-ink-2">
          k={shown.k} · {shown.inertia.toFixed(2)}
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label={`${t.cluster.elbowAria}: ${data.map((d) => `k ${d.k}: ${d.inertia.toFixed(2)}`).join(", ")}`}>
        <path d={`M12 ${H - 20}H${W - 12}`} stroke="rgb(236 235 255 / .1)" />
        <path d={data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(d.inertia).toFixed(1)}`).join("")} fill="none" stroke="#3987E5" strokeWidth={2} strokeLinejoin="round" />
        {data.map((d, i) => (
          <g key={d.k} onMouseEnter={() => setHover(d.k)} onMouseLeave={() => setHover(null)} onClick={() => onPick(d.k)} style={{ cursor: "pointer" }}>
            <rect x={x(i) - 14} y={0} width={28} height={H} fill="transparent" />
            <circle cx={x(i)} cy={y(d.inertia)} r={d.k === k ? 5 : 4} fill={d.k === k ? "#ECEBFF" : "#3987E5"} stroke="#04041A" strokeWidth={2} />
            <text x={x(i)} y={H - 6} textAnchor="middle" fontSize={9} fill={d.k === k ? "#ECEBFF" : "#8B8AB6"} className="t-mono">
              {d.k}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
