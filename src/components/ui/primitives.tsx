import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { IconArrowRight, IconArrowUpRight } from "@/components/brand/icons";

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="t-eyebrow flex items-center gap-3">
      {index && <span className="text-ink">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-line-2" />}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={`${align === "center" ? "mx-auto text-center [&_p.t-eyebrow]:justify-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div data-reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="t-h2 mt-5 text-balance" data-reveal style={delay(80)}>
        {title}
      </h2>
      {lead && (
        <p className="t-lead mt-6 text-pretty" data-reveal style={delay(160)}>
          {lead}
        </p>
      )}
    </header>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className = "" }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const Arrow = external ? IconArrowUpRight : IconArrowRight;
  const inner = (
    <>
      {children}
      <Arrow size={16} className="btn-arrow" />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-medium text-ink">
      <span className="link-underline">{children}</span>
      <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Stagger helper for `data-reveal` elements. */
export function delay(ms: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${ms}ms` };
}
