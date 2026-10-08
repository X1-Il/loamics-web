import { useId } from "react";
import { BRAND_COLORS, MARK, WORDMARK } from "./paths";

/**
 * Loamics identity.
 *
 * The "O" of LOAMICS becomes the symbol: an open orbit (the data cycle)
 * with a single node docking into the gap (the data point that completes
 * the loop). Everything is drawn on a monoline grid (stroke 2.4 on a
 * 20-unit cap height, round joins), so no font is needed to render it.
 */

type MarkProps = {
  size?: number;
  className?: string;
  title?: string;
  /** Flat currentColor node instead of the signal gradient. */
  mono?: boolean;
};

function Gradient({ id, x1, y1, x2, y2 }: { id: string; x1: number; y1: number; x2: number; y2: number }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
      <stop stopColor={BRAND_COLORS.indigo} />
      <stop offset="1" stopColor={BRAND_COLORS.magenta} />
    </linearGradient>
  );
}

export function LogoMark({ size = 32, className, title = "Loamics", mono = false }: MarkProps) {
  const id = `lm-${useId().replace(/:/g, "")}`;
  const { cx, cy, r } = MARK.node;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label={title} className={className}>
      <defs>
        <Gradient id={id} x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
      </defs>
      <path d={MARK.ring} stroke="currentColor" strokeWidth={MARK.ringStroke} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r} fill={mono ? "currentColor" : `url(#${id})`} />
    </svg>
  );
}

export function Logo({ height = 20, className, title = "Loamics", mono = false }: Omit<MarkProps, "size"> & { height?: number }) {
  const id = `lw-${useId().replace(/:/g, "")}`;
  const { cx, cy, r } = WORDMARK.node;
  return (
    <svg
      width={(height * WORDMARK.width) / WORDMARK.height}
      height={height}
      viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <Gradient id={id} x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
      </defs>
      <g stroke="currentColor" strokeWidth={WORDMARK.stroke} strokeLinecap="round" strokeLinejoin="round">
        {WORDMARK.letters.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r} fill={mono ? "currentColor" : `url(#${id})`} />
    </svg>
  );
}
