import { ImageResponse } from "next/og";
import { BRAND_COLORS, MARK } from "@/components/brand/paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND_COLORS.night }}>
        <svg width={120} height={120} viewBox="0 0 32 32" fill="none">
          <path d={MARK.ring} stroke={BRAND_COLORS.ink} strokeWidth={MARK.ringStroke} strokeLinecap="round" />
          <circle cx={MARK.node.cx} cy={MARK.node.cy} r={MARK.node.r} fill={BRAND_COLORS.magenta} />
        </svg>
      </div>
    ),
    size,
  );
}
