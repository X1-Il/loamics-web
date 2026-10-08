"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Live media-query match. Server snapshot is `false` so SSR and hydration agree. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** A browser-only, non-changing value (feature detection, platform…), hydration-safe. */
export function useClientValue<T>(get: () => T, serverValue: T) {
  return useSyncExternalStore(noop, get, () => serverValue);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}
