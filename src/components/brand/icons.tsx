import type { SVGProps } from "react";
import { SECTOR_PATHS } from "./paths";

/**
 * Loamics icon set. 24px grid, 1.5 stroke, round caps, drawn to match the
 * monoline wordmark. Decorative by default (aria-hidden); pass `aria-label`
 * and `role="img"` when an icon carries meaning on its own.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" />
  </Base>
);

export const IconPause = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth={2.2} />
  </Base>
);

export const IconReplay = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
    <path d="M4.5 4.5v3.5H8" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Base>
);

export const IconDownload = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Base>
);

export const IconSound = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </Base>
);

export const IconMute = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </Base>
);

export const IconExpand = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

/* ---------- Product modules ---------- */

/** 01 Data Collect: heterogeneous streams converge into one ingest point. */
export const IconCollect = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 5c5 0 6 7 11 7M3 12h11M3 19c5 0 6-7 11-7" />
    <circle cx="18" cy="12" r="3" />
  </Base>
);

/** 02 Data Catalog: key/value index over elastic storage. */
export const IconCatalog = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
    <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
    <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
  </Base>
);

/** 03 Data Prepare: algorithms connected as a graph. */
export const IconPrepare = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M6.6 7.2 10.4 10.8M6.6 16.8l3.8-3.6M13.6 10.8l3.8-3.6M13.6 13.2l3.8 3.6" />
  </Base>
);

/* ---------- Sectors (geometry shared with the film) ---------- */

const sector = (key: keyof typeof SECTOR_PATHS) =>
  function SectorIcon(p: IconProps) {
    return (
      <Base {...p}>
        {SECTOR_PATHS[key].map((d) => (
          <path key={d} d={d} />
        ))}
      </Base>
    );
  };

export const IconHealth = sector("health");
export const IconCity = sector("city");
export const IconFactory = sector("factory");
export const IconAerospace = sector("aero");

/* ---------- Values ---------- */

export const IconBolt = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 3 5 13.5h6L10.5 21 19 10h-6L13 3Z" />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const IconCloud = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.1 9.1 4.75 4.75 0 0 0 7 18.5Z" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IconInfinity = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4Zm0 0c2 2.7 3.6 4 5.5 4a4 4 0 0 0 0-8c-1.9 0-3.5 1.3-5.5 4Z" />
  </Base>
);

export const IconSpark = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </Base>
);

export const IconLayers = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" />
  </Base>
);

export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 5.5a3.5 3.5 0 0 1 0 6.5M18 14.5c1.8.9 3 2.9 3 5.5" />
  </Base>
);

/* ---------- Contact / social ---------- */

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.7 4.3-2.1 1.4a10.5 10.5 0 0 0 6.2 6.2l1.4-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const IconLinkedIn = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5v6M8 7.6v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6v3.5" />
  </Base>
);

export const IconX = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 4.5h4l11 15h-4l-11-15ZM19 4.5l-5.8 6.4M10.8 13.1 5 19.5" />
  </Base>
);
