/**
 * Single source of truth for brand geometry. Used by the SVG components,
 * the favicon / OG image and the canvas film (via Path2D), so every
 * surface renders the identical mark.
 */

export const MARK = {
  viewBox: 32,
  ring: "M27.82 13.92A12 12 0 1 1 18.08 4.18",
  ringStroke: 3,
  node: { cx: 24.49, cy: 7.51, r: 2.9 },
} as const;

export const WORDMARK = {
  width: 127,
  height: 20,
  stroke: 2.4,
  letters: [
    "M1.2 1.2V18.8H11.6", // L
    "M35.17 8.47A8.8 8.8 0 1 1 28.03 1.33", // O (orbit)
    "M41.2 18.8L48.6 1.2L56 18.8", // A
    "M61.2 18.8V1.2L69.6 13L78 1.2V18.8", // M
    "M84 1.2V18.8", // I
    "M104.92 3.78A8.8 8.8 0 1 0 104.92 16.22", // C
    "M122.3 3.6A5.8 4.4 0 1 0 117 10A5.8 4.4 0 1 1 111.7 16.4", // S
  ],
  node: { cx: 32.72, cy: 3.78, r: 2.15 },
} as const;

/** Sector pictograms on the 24px icon grid (stroke 1.5). */
export const SECTOR_PATHS = {
  health: ["M3 12h4l2-4 3 9 2.5-7 1.5 2h5"],
  city: ["M3 20h18M5 20V9l5-3v14M10 20V4h6v16M16 20v-9h3v9", "M12.5 8h1M12.5 11h1M12.5 14h1"],
  factory: ["M3 20V10l5 3V10l5 3V10l5 3V5h3v15H3Z", "M7 17h2M12 17h2"],
  aero: [
    "M3.61 16.46A9.5 3.8 -28 1 0 20.39 7.54A9.5 3.8 -28 1 0 3.61 16.46Z",
    "M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  ],
} as const;

export const BRAND_COLORS = {
  night: "#04041A",
  ink: "#ECEBFF",
  indigo: "#6C63FF",
  violet: "#9A5CFF",
  magenta: "#E04FF0",
} as const;
