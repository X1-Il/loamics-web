import { ImageResponse } from "next/og";
import { BRAND_COLORS, MARK, WORDMARK } from "@/components/brand/paths";

export const ogSize = { width: 1200, height: 630 };

/** Shared social card, one per language. */
export function renderOgImage(lead: string, accent: string) {
  const n = WORDMARK.node;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(circle at 78% 30%, rgba(108,99,255,0.35), ${BRAND_COLORS.night} 60%)`,
          color: BRAND_COLORS.ink,
        }}
      >
        <svg width={381} height={60} viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`} fill="none">
          <g stroke={BRAND_COLORS.ink} strokeWidth={WORDMARK.stroke} strokeLinecap="round" strokeLinejoin="round">
            {WORDMARK.letters.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={BRAND_COLORS.magenta} />
        </svg>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -3, fontWeight: 600 }}>
            <span>{lead}</span>
            <span style={{ color: BRAND_COLORS.violet }}>{accent}</span>
          </div>
          <svg width={180} height={180} viewBox="0 0 32 32" fill="none">
            <path d={MARK.ring} stroke={BRAND_COLORS.ink} strokeWidth={MARK.ringStroke} strokeLinecap="round" />
            <circle cx={MARK.node.cx} cy={MARK.node.cy} r={MARK.node.r} fill={BRAND_COLORS.magenta} />
          </svg>
        </div>
      </div>
    ),
    ogSize,
  );
}
