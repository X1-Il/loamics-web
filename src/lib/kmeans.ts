import { gaussian, mulberry32 } from "./math";

export type Point = { x: number; y: number };

export type KMeansStep = {
  centroids: Point[];
  labels: number[];
  inertia: number;
};

const d2 = (a: Point, b: Point) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

/** k-means++ seeding: spreads initial centroids proportionally to D(x)^2. */
export function seedCentroids(points: Point[], k: number, seed = 1): Point[] {
  if (points.length === 0 || k <= 0) return [];
  const rand = mulberry32(seed);
  const centroids: Point[] = [points[Math.floor(rand() * points.length)]];
  while (centroids.length < Math.min(k, points.length)) {
    const dist = points.map((p) => Math.min(...centroids.map((c) => d2(p, c))));
    const total = dist.reduce((s, v) => s + v, 0);
    if (total === 0) break;
    let r = rand() * total;
    let idx = 0;
    while (idx < dist.length - 1 && r > dist[idx]) r -= dist[idx++];
    centroids.push(points[idx]);
  }
  return centroids.map((c) => ({ ...c }));
}

export function assign(points: Point[], centroids: Point[]): { labels: number[]; inertia: number } {
  let inertia = 0;
  const labels = points.map((p) => {
    let best = 0;
    let bestD = Infinity;
    centroids.forEach((c, i) => {
      const d = d2(p, c);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    inertia += bestD;
    return best;
  });
  return { labels, inertia };
}

export function update(points: Point[], labels: number[], prev: Point[]): Point[] {
  const sums = prev.map(() => ({ x: 0, y: 0, n: 0 }));
  points.forEach((p, i) => {
    const s = sums[labels[i]];
    s.x += p.x;
    s.y += p.y;
    s.n += 1;
  });
  // An empty cluster keeps its previous centroid.
  return sums.map((s, i) => (s.n ? { x: s.x / s.n, y: s.y / s.n } : prev[i]));
}

/** Lloyd's algorithm, returning every iteration so the UI can animate convergence. */
export function kmeans(points: Point[], k: number, { seed = 1, maxIter = 50, tol = 1e-6 } = {}): KMeansStep[] {
  let centroids = seedCentroids(points, k, seed);
  const steps: KMeansStep[] = [];
  for (let it = 0; it < maxIter; it++) {
    const { labels, inertia } = assign(points, centroids);
    steps.push({ centroids, labels, inertia });
    const next = update(points, labels, centroids);
    const shift = next.reduce((s, c, i) => s + d2(c, centroids[i]), 0);
    centroids = next;
    if (shift < tol) break;
  }
  return steps;
}

/** Deterministic synthetic dataset: gaussian blobs in the unit square. */
export function blobs(n: number, centers: Point[], spread = 0.06, seed = 7): Point[] {
  const rand = mulberry32(seed);
  // Quantized to 1e-4: Math.log/cos may differ in the last ulp between JS engines,
  // and server-rendered coordinates must match the browser's exactly.
  const q = (v: number) => Math.round(Math.min(0.98, Math.max(0.02, v)) * 1e4) / 1e4;
  return Array.from({ length: n }, (_, i) => {
    const c = centers[i % centers.length];
    return { x: q(c.x + gaussian(rand) * spread), y: q(c.y + gaussian(rand) * spread) };
  });
}
