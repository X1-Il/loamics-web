"use client";

import { useEffect, useRef, useState } from "react";
import { useClientValue, useReducedMotion } from "@/lib/hooks";

/**
 * Ambient hero video. Respects reduced-motion and data-saver preferences,
 * pauses when off-screen, and fades in only once frames are available.
 */
export function BackgroundVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const saveData = useClientValue(
    () => !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    true,
  );
  // Server renders no <video>; the client mounts it only when motion and data are welcome.
  const hydrated = useClientValue(() => true, false);
  const enabled = hydrated && !reduce && !saveData;

  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20 bg-night-950">
      {enabled && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onCanPlay={() => setReady(true)}
          className={`h-full w-full object-cover transition-opacity duration-[1800ms] ${ready ? "opacity-90" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
