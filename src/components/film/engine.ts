/**
 * Loamics film: a 44-second motion piece rendered in real time on canvas.
 *
 * Architecture: `render(ctx, t)` is a pure function of time. 360 particles
 * morph between "formations" (chaos → orbit → streams → grid → graph →
 * clock → sectors → orbit); scene copy and decor are layered on top.
 * Purity buys scrubbing, chapters, reduced-motion posters and frame-exact
 * export for free.
 */
import { BRAND_COLORS, MARK, SECTOR_PATHS, WORDMARK } from "@/components/brand/paths";
import { clamp, easeInOutCubic, easeOutExpo, fract, lerp, mulberry32, smoothstep } from "@/lib/math";

export const W = 1920;
export const H = 1080;

type Formation = "chaos" | "prep" | "ring" | "streams" | "grid" | "graph" | "clock" | "sectors" | "end";

export type Scene = {
  id: string;
  chapter: string;
  start: number;
  end: number;
  formation: Formation;
};

export const SCENES: Scene[] = [
  { id: "data", chapter: "Data is multiplying", start: 0, end: 4.5, formation: "chaos" },
  { id: "prep", chapter: "The preparation problem", start: 4.5, end: 9, formation: "prep" },
  { id: "logo", chapter: "Loamics", start: 9, end: 13.5, formation: "ring" },
  { id: "collect", chapter: "01 DataCollect", start: 13.5, end: 19, formation: "streams" },
  { id: "lake", chapter: "02 DataLake", start: 19, end: 24.5, formation: "grid" },
  { id: "algo", chapter: "03 AlgoEngine", start: 24.5, end: 30, formation: "graph" },
  { id: "plug", chapter: "Plug & play", start: 30, end: 34.5, formation: "clock" },
  { id: "sectors", chapter: "Every sector", start: 34.5, end: 38.5, formation: "sectors" },
  { id: "end", chapter: "Book a demo", start: 38.5, end: 44, formation: "end" },
];
export const DURATION = SCENES[SCENES.length - 1].end;

export function sceneIndexAt(t: number) {
  const i = SCENES.findIndex((s) => t < s.end);
  return i === -1 ? SCENES.length - 1 : i;
}

/* ------------------------------------------------------------------ */
/* Particles                                                           */
/* ------------------------------------------------------------------ */

const N = 360;
type RGB = readonly [number, number, number];
const MUTED: RGB = [150, 149, 196];
const INK: RGB = [236, 235, 255];
const INDIGO: RGB = [108, 99, 255];
const MAGENTA: RGB = [224, 79, 240];

const mixRGB = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

type Particle = { i: number; r: number[] };
const PARTICLES: Particle[] = (() => {
  const rand = mulberry32(2020_11_04);
  return Array.from({ length: N }, (_, i) => ({ i, r: Array.from({ length: 8 }, rand) }));
})();

type State = { x: number; y: number; a: number; s: number; c: RGB };
const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

/* Layout anchors (1920×1080 stage) */
const RING_LOGO = { x: 960, y: 410, R: 190 };
const RING_END = { x: 960, y: 380, R: 120 };
const COLLECT = { x: 1260, y: 540 };
const GRID = { x: 880, y: 255, cols: 24, rows: 15, cell: 38 };
const GRAPH_LAYERS = [
  { x: 960, n: 3 },
  { x: 1200, n: 4 },
  { x: 1440, n: 3 },
  { x: 1680, n: 1 },
];
const GRAPH_NODES = GRAPH_LAYERS.flatMap((l, li) =>
  Array.from({ length: l.n }, (_, k) => ({ x: l.x, y: 540 + (k - (l.n - 1) / 2) * 170, layer: li })),
);
const CLOCK = { x: 1340, y: 540, R: 270 };
const SECTOR_CENTERS = [
  { x: 1100, y: 360, key: "health", label: "Healthcare" },
  { x: 1580, y: 360, key: "city", label: "Smart cities" },
  { x: 1100, y: 740, key: "factory", label: "Manufacturing" },
  { x: 1580, y: 740, key: "aero", label: "Aerospace & defense" },
] as const;

function ringState(p: Particle, t: number, ring: { x: number; y: number; R: number }): State {
  const nodeCount = Math.floor(N * 0.12);
  const [r0, , , , , r5, r6] = p.r;
  if (p.i < N - nodeCount) {
    const u = p.i / (N - nodeCount - 1);
    const ang = (-10 + u * 290) * DEG;
    const rr = ring.R + (r5 - 0.5) * ring.R * 0.05 + Math.sin(t * 2 + u * 14) * 1.5;
    return { x: ring.x + Math.cos(ang) * rr, y: ring.y + Math.sin(ang) * rr, a: 0.95, s: 2.2 + r0, c: INK };
  }
  const nr = (ring.R * MARK.node.r) / 12;
  const cx = ring.x + Math.cos(-45 * DEG) * ring.R;
  const cy = ring.y + Math.sin(-45 * DEG) * ring.R;
  const pr = Math.sqrt(r5) * nr * 0.92;
  const pa = r6 * TAU + t * 0.5;
  return { x: cx + Math.cos(pa) * pr, y: cy + Math.sin(pa) * pr, a: 1, s: 2.4, c: mixRGB(INDIGO, MAGENTA, r5) };
}

function formationState(f: Formation, p: Particle, t: number): State {
  const [r0, r1, r2, r3, r4, r5] = p.r;
  switch (f) {
    case "chaos":
    case "prep": {
      const x = r0 * W + Math.sin(t * 0.35 + r2 * TAU) * 50;
      const y = r1 * H + Math.cos(t * 0.3 + r3 * TAU) * 40;
      // In "prep", 80% of the field turns grey: time spent preparing data.
      const prepping = f === "prep" && r4 < 0.8;
      return {
        x,
        y,
        a: f === "prep" ? (prepping ? 0.28 : 0.95) : 0.7,
        s: 1.4 + r4 * 2,
        c: f === "prep" ? (prepping ? MUTED : mixRGB(INDIGO, MAGENTA, r5)) : MUTED,
      };
    }
    case "ring":
      return ringState(p, t, RING_LOGO);
    case "end":
      return ringState(p, t, RING_END);
    case "streams": {
      const k = p.i % 6;
      const yk = 150 + k * 156;
      const u = fract(r0 + t * (0.075 + r1 * 0.04));
      if (u < 0.64) {
        const v = u / 0.64;
        // cubic bezier from the source lane into the collect node
        const x0 = -40, y0 = yk, x1 = 560, y1 = yk, x2 = 900, y2 = COLLECT.y, x3 = COLLECT.x - 46, y3 = COLLECT.y;
        const m = 1 - v;
        const bx = m * m * m * x0 + 3 * m * m * v * x1 + 3 * m * v * v * x2 + v * v * v * x3;
        const by = m * m * m * y0 + 3 * m * m * v * y1 + 3 * m * v * v * y2 + v * v * v * y3;
        const jitter = (r2 - 0.5) * 50 * (1 - v);
        return { x: bx, y: by + jitter, a: 0.35 + v * 0.6, s: 1.6 + r3 * 1.6, c: mixRGB(MUTED, INDIGO, v) };
      }
      const v = (u - 0.64) / 0.36;
      return {
        x: COLLECT.x + 46 + v * (W + 60 - COLLECT.x),
        y: COLLECT.y + ((p.i % 3) - 1) * 9,
        a: 0.95,
        s: 2.2,
        c: mixRGB(INDIGO, MAGENTA, v),
      };
    }
    case "grid": {
      const col = p.i % GRID.cols;
      const row = Math.floor(p.i / GRID.cols);
      return {
        x: GRID.x + col * GRID.cell + GRID.cell / 2,
        y: GRID.y + row * GRID.cell + GRID.cell / 2,
        a: 0.55 + 0.4 * Math.max(0, Math.sin(t * 1.4 - col * 0.35 + row * 0.2)),
        s: 2.2,
        c: mixRGB(INDIGO, MAGENTA, col / GRID.cols),
      };
    }
    case "graph": {
      const node = GRAPH_NODES[p.i % GRAPH_NODES.length];
      const orbit = 12 + r0 * (node.layer === 3 ? 46 : 28);
      const ang = r1 * TAU + t * (0.4 + r2 * 0.8) * (p.i % 2 ? 1 : -1);
      return {
        x: node.x + Math.cos(ang) * orbit,
        y: node.y + Math.sin(ang) * orbit,
        a: 0.85,
        s: 1.8 + r3,
        c: node.layer === 3 ? MAGENTA : mixRGB(INDIGO, MAGENTA, node.layer / 3),
      };
    }
    case "clock": {
      const u = p.i / N;
      const ang = u * TAU - Math.PI / 2;
      const rr = CLOCK.R + (r0 - 0.5) * 8;
      return { x: CLOCK.x + Math.cos(ang) * rr, y: CLOCK.y + Math.sin(ang) * rr, a: 0.45, s: 2, c: INK };
    }
    case "sectors": {
      const c = SECTOR_CENTERS[p.i % 4];
      const k = Math.floor(p.i / 4) / (N / 4);
      const ang = k * TAU + t * 0.22 * (p.i % 2 ? 1 : -1);
      const rr = 92 + (r0 - 0.5) * 6;
      return { x: c.x + Math.cos(ang) * rr, y: c.y + Math.sin(ang) * rr, a: 0.85, s: 1.9, c: mixRGB(INDIGO, MAGENTA, k) };
    }
  }
}

/* ------------------------------------------------------------------ */
/* Drawing helpers                                                     */
/* ------------------------------------------------------------------ */

type Copy = { eyebrow?: string; title: string; sub?: string };

/** Every word the film draws, so the same timeline renders in any language. */
export type FilmStrings = {
  copy: Record<"data" | "prep" | "collect" | "lake" | "algo" | "plug" | "sectors", Copy>;
  tagline: string;
  source: string;
  streamLabels: string[];
  homogeneous: string;
  graph: string[];
  deploying: string;
  running: string;
  sectorLabels: string[];
  cta: string;
};

export type Env = { font: string; mono: string; s: FilmStrings };

const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

let pathCache: { letters: Path2D[]; ring: Path2D; sectors: Record<string, Path2D[]> } | null = null;
function paths() {
  if (!pathCache) {
    pathCache = {
      letters: WORDMARK.letters.map((d) => new Path2D(d)),
      ring: new Path2D(MARK.ring),
      sectors: Object.fromEntries(Object.entries(SECTOR_PATHS).map(([k, v]) => [k, v.map((d) => new Path2D(d))])),
    };
  }
  return pathCache;
}

function drawWordmark(ctx: CanvasRenderingContext2D, cx: number, cy: number, width: number, progress: number, alpha: number) {
  const s = width / WORDMARK.width;
  ctx.save();
  ctx.translate(cx - width / 2, cy - (WORDMARK.height * s) / 2);
  ctx.scale(s, s);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = BRAND_COLORS.ink;
  ctx.lineWidth = WORDMARK.stroke;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([progress * 70, 200]);
  for (const p of paths().letters) ctx.stroke(p);
  ctx.setLineDash([]);
  const g = ctx.createLinearGradient(30, 1, 35, 7);
  g.addColorStop(0, BRAND_COLORS.indigo);
  g.addColorStop(1, BRAND_COLORS.magenta);
  ctx.fillStyle = g;
  ctx.globalAlpha = alpha * smoothstep(0.6, 1, progress);
  ctx.beginPath();
  ctx.arc(WORDMARK.node.cx, WORDMARK.node.cy, WORDMARK.node.r, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Left-column scene copy with a staggered rise-in. */
function drawCopy(ctx: CanvasRenderingContext2D, env: Env, copy: Copy, lt: number, dur: number, align: "left" | "center" = "left") {
  const out = 1 - smoothstep(dur - 0.6, dur, lt);
  const x = align === "left" ? 140 : W / 2;
  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";

  ctx.font = `600 76px ${env.font}`;
  const titleLines = wrap(ctx, copy.title, align === "left" ? 660 : 1300);
  ctx.font = `400 30px ${env.font}`;
  const subLines = copy.sub ? wrap(ctx, copy.sub, align === "left" ? 600 : 1100) : [];
  const blockH = (copy.eyebrow ? 70 : 0) + titleLines.length * 82 + (subLines.length ? 30 + subLines.length * 42 : 0);
  let y = (align === "left" ? 540 : 540) - blockH / 2 + 60;

  const piece = (delay: number) => {
    const k = easeOutExpo(clamp((lt - 0.25 - delay) / 0.9));
    return { a: k * out, dy: (1 - k) * 26 };
  };

  if (copy.eyebrow) {
    const { a, dy } = piece(0);
    ctx.font = `500 22px ${env.mono}`;
    ctx.fillStyle = rgba([139, 138, 182], a);
    ctx.letterSpacing = "4px";
    ctx.fillText(copy.eyebrow.toUpperCase(), x, y + dy - 10);
    ctx.letterSpacing = "0px";
    y += 70;
  }
  ctx.font = `600 76px ${env.font}`;
  ctx.letterSpacing = "-3px";
  titleLines.forEach((line, i) => {
    const { a, dy } = piece(0.1 + i * 0.08);
    ctx.fillStyle = rgba(INK, a);
    ctx.fillText(line, x, y + dy);
    y += 82;
  });
  ctx.letterSpacing = "0px";
  if (subLines.length) {
    y += 22;
    ctx.font = `400 30px ${env.font}`;
    subLines.forEach((line, i) => {
      const { a, dy } = piece(0.3 + i * 0.06);
      ctx.fillStyle = rgba([182, 181, 216], a);
      ctx.fillText(line, x, y + dy);
      y += 42;
    });
  }
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Scene decor                                                         */
/* ------------------------------------------------------------------ */

const FORMATS = ["CSV", "JSON", "ERP", "CRM", "IoT", "XML", "LOG", "SQL", "PDF", "API", "MQTT", "XLSX"];

function decor(ctx: CanvasRenderingContext2D, env: Env, scene: Scene, lt: number, t: number) {
  const dur = scene.end - scene.start;
  const vis = smoothstep(0.6, 1.4, lt) * (1 - smoothstep(dur - 0.5, dur, lt));
  ctx.save();
  switch (scene.formation) {
    case "chaos":
    case "prep": {
      ctx.font = `500 15px ${env.mono}`;
      ctx.textAlign = "left";
      for (let k = 0; k < FORMATS.length; k++) {
        const p = PARTICLES[k * 23];
        const s = formationState("chaos", p, t);
        const a = (scene.formation === "prep" ? 0.18 : 0.55) * smoothstep(0.2, 1.2, lt) * (1 - smoothstep(dur - 0.5, dur, lt));
        ctx.fillStyle = rgba([182, 181, 216], a);
        ctx.fillText(FORMATS[k], s.x + 10, s.y - 8);
      }
      if (scene.formation === "prep") {
        // 80% bar
        const p = easeInOutCubic(clamp((lt - 1.2) / 1.6));
        const bw = 760;
        const bx = W / 2 - bw / 2;
        const by = 700;
        ctx.fillStyle = rgba(INK, 0.08 * vis);
        ctx.fillRect(bx, by, bw, 4);
        const g = ctx.createLinearGradient(bx, 0, bx + bw, 0);
        g.addColorStop(0, BRAND_COLORS.indigo);
        g.addColorStop(1, BRAND_COLORS.magenta);
        ctx.fillStyle = g;
        ctx.globalAlpha = vis;
        ctx.fillRect(bx, by, bw * 0.8 * p, 4);
        ctx.font = `500 22px ${env.mono}`;
        ctx.fillStyle = rgba(INK, 1);
        ctx.textAlign = "left";
        ctx.fillText(`${Math.round(80 * p)}%`, bx + bw * 0.8 * p + 14, by + 9);
        ctx.fillStyle = rgba([139, 138, 182], 1);
        ctx.font = `500 16px ${env.mono}`;
        ctx.fillText(env.s.source, bx, by + 44);
      }
      break;
    }
    case "ring": {
      ctx.globalAlpha = vis;
      drawWordmark(ctx, W / 2, 752, 520, easeInOutCubic(clamp((lt - 1.1) / 1.6)), 1);
      ctx.font = `400 32px ${env.font}`;
      ctx.textAlign = "center";
      ctx.fillStyle = rgba([182, 181, 216], smoothstep(2.2, 3, lt) * (1 - smoothstep(dur - 0.5, dur, lt)));
      ctx.fillText(env.s.tagline, W / 2, 850);
      break;
    }
    case "streams": {
      ctx.globalAlpha = vis;
      const labels = env.s.streamLabels;
      ctx.font = `500 16px ${env.mono}`;
      ctx.textAlign = "left";
      labels.forEach((l, k) => {
        ctx.fillStyle = rgba([139, 138, 182], 0.9);
        ctx.fillText(l, 820, 150 + k * 156 + (COLLECT.y - (150 + k * 156)) * 0.62 - 14);
      });
      ctx.beginPath();
      ctx.arc(COLLECT.x, COLLECT.y, 46, 0, TAU);
      ctx.fillStyle = BRAND_COLORS.night;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = rgba(INK, 0.9);
      ctx.stroke();
      const pulse = fract(t * 0.8);
      ctx.beginPath();
      ctx.arc(COLLECT.x, COLLECT.y, 46 + pulse * 60, 0, TAU);
      ctx.strokeStyle = rgba([154, 92, 255], (1 - pulse) * 0.6);
      ctx.stroke();
      ctx.font = `500 18px ${env.mono}`;
      ctx.textAlign = "center";
      ctx.fillStyle = rgba(INK, 1);
      ctx.fillText("01", COLLECT.x, COLLECT.y + 6);
      ctx.fillStyle = rgba([139, 138, 182], 1);
      ctx.fillText(env.s.homogeneous, COLLECT.x + 330, COLLECT.y - 40);
      break;
    }
    case "grid": {
      ctx.globalAlpha = vis;
      ctx.strokeStyle = rgba(INK, 0.06);
      ctx.lineWidth = 1;
      for (let c = 0; c <= GRID.cols; c++) {
        ctx.beginPath();
        ctx.moveTo(GRID.x + c * GRID.cell, GRID.y);
        ctx.lineTo(GRID.x + c * GRID.cell, GRID.y + GRID.rows * GRID.cell);
        ctx.stroke();
      }
      for (let r = 0; r <= GRID.rows; r++) {
        ctx.beginPath();
        ctx.moveTo(GRID.x, GRID.y + r * GRID.cell);
        ctx.lineTo(GRID.x + GRID.cols * GRID.cell, GRID.y + r * GRID.cell);
        ctx.stroke();
      }
      // key/value lookups hopping across the catalog
      const KEYS = ["src:iot", "fmt:json", "ts:live", "owner:org", "tag:health", "geo:eu"];
      for (let k = 0; k < 3; k++) {
        const step = Math.floor(t * 1.2 + k * 0.33);
        const h = mulberry32(step * 7 + k)();
        const cell = Math.floor(h * GRID.cols * GRID.rows);
        const cx = GRID.x + (cell % GRID.cols) * GRID.cell;
        const cy = GRID.y + Math.floor(cell / GRID.cols) * GRID.cell;
        const local = fract(t * 1.2 + k * 0.33);
        const a = Math.sin(local * Math.PI);
        ctx.strokeStyle = rgba(MAGENTA, a);
        ctx.lineWidth = 2;
        ctx.strokeRect(cx + 2, cy + 2, GRID.cell - 4, GRID.cell - 4);
        ctx.font = `500 15px ${env.mono}`;
        ctx.textAlign = "left";
        ctx.fillStyle = rgba(INK, a);
        ctx.fillText(KEYS[(step + k) % KEYS.length], cx + GRID.cell + 8, cy + 24);
      }
      break;
    }
    case "graph": {
      ctx.globalAlpha = vis;
      ctx.lineWidth = 1;
      const edges: [number, number][] = [];
      GRAPH_NODES.forEach((a, ai) =>
        GRAPH_NODES.forEach((b, bi) => {
          if (b.layer === a.layer + 1) edges.push([ai, bi]);
        }),
      );
      for (const [ai, bi] of edges) {
        const a = GRAPH_NODES[ai];
        const b = GRAPH_NODES[bi];
        ctx.strokeStyle = rgba(INK, 0.09);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        const u = fract(t * 0.7 + (ai * 7 + bi * 13) * 0.071);
        ctx.fillStyle = rgba(INK, Math.sin(u * Math.PI));
        ctx.beginPath();
        ctx.arc(lerp(a.x, b.x, u), lerp(a.y, b.y, u), 3, 0, TAU);
        ctx.fill();
      }
      ctx.font = `500 16px ${env.mono}`;
      ctx.textAlign = "center";
      ctx.fillStyle = rgba([139, 138, 182], 1);
      env.s.graph.forEach((l, i) => ctx.fillText(l, GRAPH_LAYERS[i].x, 940));
      break;
    }
    case "clock": {
      ctx.globalAlpha = vis;
      const p = easeInOutCubic(clamp((lt - 0.9) / 2.2));
      for (let h = 0; h < 12; h++) {
        const a = (h / 12) * TAU - Math.PI / 2;
        ctx.strokeStyle = rgba(INK, h <= 2 ? 0.8 : 0.2);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(CLOCK.x + Math.cos(a) * (CLOCK.R + 26), CLOCK.y + Math.sin(a) * (CLOCK.R + 26));
        ctx.lineTo(CLOCK.x + Math.cos(a) * (CLOCK.R + 40), CLOCK.y + Math.sin(a) * (CLOCK.R + 40));
        ctx.stroke();
      }
      const g = ctx.createLinearGradient(CLOCK.x, CLOCK.y - CLOCK.R, CLOCK.x + CLOCK.R, CLOCK.y);
      g.addColorStop(0, BRAND_COLORS.indigo);
      g.addColorStop(1, BRAND_COLORS.magenta);
      ctx.strokeStyle = g;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(CLOCK.x, CLOCK.y, CLOCK.R, -Math.PI / 2, -Math.PI / 2 + (TAU / 12) * 2 * p + 0.0001);
      ctx.stroke();
      const minutes = Math.round(120 * p);
      const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
      const mm = String(minutes % 60).padStart(2, "0");
      ctx.textAlign = "center";
      ctx.fillStyle = rgba(INK, 1);
      ctx.font = `500 120px ${env.mono}`;
      ctx.fillText(`${hh}:${mm}`, CLOCK.x, CLOCK.y + 40);
      ctx.font = `500 20px ${env.mono}`;
      ctx.fillStyle = rgba([139, 138, 182], 1);
      ctx.fillText(p >= 1 ? env.s.running : env.s.deploying, CLOCK.x, CLOCK.y + 100);
      break;
    }
    case "sectors": {
      ctx.globalAlpha = vis;
      SECTOR_CENTERS.forEach((c, ci) => {
        ctx.save();
        ctx.translate(c.x - 36, c.y - 36);
        ctx.scale(3, 3);
        ctx.strokeStyle = BRAND_COLORS.ink;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (const p of paths().sectors[c.key]) ctx.stroke(p);
        ctx.restore();
        ctx.font = `500 26px ${env.font}`;
        ctx.textAlign = "center";
        ctx.fillStyle = rgba(INK, 1);
        ctx.fillText(env.s.sectorLabels[ci] ?? c.label, c.x, c.y + 150);
      });
      break;
    }
    case "end": {
      ctx.globalAlpha = smoothstep(0.6, 1.2, lt);
      drawWordmark(ctx, W / 2, 620, 560, easeInOutCubic(clamp((lt - 0.5) / 1.6)), 1);
      const a = smoothstep(1.8, 2.6, lt);
      ctx.globalAlpha = a;
      ctx.textAlign = "center";
      ctx.font = `400 32px ${env.font}`;
      ctx.fillStyle = rgba([182, 181, 216], 1);
      ctx.fillText(env.s.tagline, W / 2, 710);
      // CTA pill
      const pw = 420;
      const ph = 72;
      const px = W / 2 - pw / 2;
      const py = 800;
      ctx.fillStyle = rgba(INK, 1);
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, ph / 2);
      ctx.fill();
      ctx.fillStyle = BRAND_COLORS.night;
      ctx.font = `500 28px ${env.font}`;
      ctx.fillText(env.s.cta, W / 2, py + 46);
      ctx.font = `500 20px ${env.mono}`;
      ctx.fillStyle = rgba([139, 138, 182], 1);
      ctx.fillText("LOAMICS.COM", W / 2, py + 140);
      break;
    }
  }
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Frame                                                               */
/* ------------------------------------------------------------------ */

export function render(ctx: CanvasRenderingContext2D, tRaw: number, env: Env) {
  const t = clamp(tRaw, 0, DURATION);
  const si = sceneIndexAt(t);
  const scene = SCENES[si];
  const prev = SCENES[Math.max(0, si - 1)];
  const lt = t - scene.start;
  const dur = scene.end - scene.start;

  // Background + scene glow
  ctx.fillStyle = BRAND_COLORS.night;
  ctx.fillRect(0, 0, W, H);
  const centered = ["data", "prep", "logo", "end"].includes(scene.id);
  const gx = centered ? W / 2 : 1300;
  const glow = ctx.createRadialGradient(gx, 520, 0, gx, 520, 900);
  glow.addColorStop(0, "rgba(108,99,255,0.16)");
  glow.addColorStop(1, "rgba(4,4,26,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Particles: morph previous formation → current with per-particle stagger
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const p of PARTICLES) {
    const target = formationState(scene.formation, p, t);
    let s = target;
    if (si > 0) {
      const stagger = p.r[7] * 0.55;
      const k = easeInOutCubic(clamp((lt - stagger) / 1.25));
      if (k < 1) {
        const from = formationState(prev.formation, p, t);
        s = {
          x: lerp(from.x, target.x, k),
          y: lerp(from.y, target.y, k),
          a: lerp(from.a, target.a, k),
          s: lerp(from.s, target.s, k),
          c: mixRGB(from.c, target.c, k),
        };
      }
    } else {
      s = { ...target, a: target.a * smoothstep(0, 1.2, t) };
    }
    // Particles fade behind the copy column in left-aligned scenes
    const fade = centered ? 1 : 0.25 + 0.75 * smoothstep(420, 820, s.x);
    ctx.fillStyle = rgba(s.c, s.a * fade);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.s, 0, TAU);
    ctx.fill();
  }
  ctx.restore();

  decor(ctx, env, scene, lt, t);

  const copy = (env.s.copy as Record<string, Copy>)[scene.id];
  if (copy) drawCopy(ctx, env, copy, lt, dur, centered ? "center" : "left");

  // Persistent brand watermark once the logo has been revealed
  if (si >= 3 && si < SCENES.length - 1) {
    ctx.save();
    ctx.globalAlpha = 0.55;
    drawWordmark(ctx, 140 + 70, 96, 140, 1, 1);
    ctx.restore();
  }
}
