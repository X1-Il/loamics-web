import { describe, expect, it } from "vitest";
import { assign, blobs, kmeans, seedCentroids } from "../kmeans";

const centers = [
  { x: 0.2, y: 0.2 },
  { x: 0.8, y: 0.2 },
  { x: 0.5, y: 0.8 },
];

describe("kmeans", () => {
  it("is deterministic for a given seed", () => {
    const pts = blobs(120, centers, 0.04, 3);
    expect(kmeans(pts, 3, { seed: 5 })).toEqual(kmeans(pts, 3, { seed: 5 }));
  });

  it("recovers well-separated blobs", () => {
    const pts = blobs(300, centers, 0.03, 11);
    const last = kmeans(pts, 3, { seed: 2 }).at(-1)!;
    for (const c of centers) {
      const nearest = Math.min(...last.centroids.map((k) => Math.hypot(k.x - c.x, k.y - c.y)));
      expect(nearest).toBeLessThan(0.03);
    }
  });

  it("never increases inertia between iterations", () => {
    const pts = blobs(200, centers, 0.12, 9);
    const steps = kmeans(pts, 4, { seed: 1 });
    for (let i = 1; i < steps.length; i++) expect(steps[i].inertia).toBeLessThanOrEqual(steps[i - 1].inertia + 1e-12);
  });

  it("handles k larger than the number of points", () => {
    const pts = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    expect(seedCentroids(pts, 5).length).toBe(2);
    expect(assign(pts, seedCentroids(pts, 5)).inertia).toBe(0);
  });
});
