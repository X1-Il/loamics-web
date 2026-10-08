import { BRAND_COLORS, MARK, WORDMARK } from "@/components/brand/paths";

/** Standalone SVG files built from the same geometry as the React logo. */

const gradient = (id: string, x1: number, y1: number, x2: number, y2: number) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse"><stop stop-color="${BRAND_COLORS.indigo}"/><stop offset="1" stop-color="${BRAND_COLORS.magenta}"/></linearGradient>`;

export function markSvg({ fg = BRAND_COLORS.ink, bg }: { fg?: string; bg?: string } = {}) {
  const { cx, cy, r } = MARK.node;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32" fill="none">${
    bg ? `<rect width="32" height="32" rx="7" fill="${bg}"/>` : ""
  }<defs>${gradient("n", cx - r, cy - r, cx + r, cy + r)}</defs><path d="${MARK.ring}" stroke="${fg}" stroke-width="${MARK.ringStroke}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#n)"/></svg>`;
}

export function logoSvg({ fg = BRAND_COLORS.ink, pad = 0 }: { fg?: string; pad?: number } = {}) {
  const { cx, cy, r } = WORDMARK.node;
  const w = WORDMARK.width + pad * 2;
  const h = WORDMARK.height + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w * 8}" height="${h * 8}" viewBox="${-pad} ${-pad} ${w} ${h}" fill="none"><defs>${gradient(
    "n",
    cx - r,
    cy - r,
    cx + r,
    cy + r,
  )}</defs><g stroke="${fg}" stroke-width="${WORDMARK.stroke}" stroke-linecap="round" stroke-linejoin="round">${WORDMARK.letters
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#n)"/></svg>`;
}

export const svgResponse = (svg: string) =>
  new Response(svg, {
    headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=31536000, immutable" },
  });
