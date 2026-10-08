"use client";

import { useEffect, useRef } from "react";
import { IconClose, IconPlay } from "@/components/brand/icons";
import { site } from "@/content/site";
import { useI18n } from "@/i18n/client";

/** "Watch video" button + native <dialog> player with sound and controls. */
export function WatchVideoButton({ label }: { label: string }) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const d = dialogRef.current;
    const onClose = () => videoRef.current?.pause();
    d?.addEventListener("close", onClose);
    return () => d?.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button type="button" onClick={open} className="btn btn-ghost group">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-night-950 transition-transform duration-500 group-hover:scale-110">
          <IconPlay size={12} />
        </span>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={t.video.title}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(1100px,calc(100vw-32px))] overflow-visible bg-transparent p-0 backdrop:bg-night-950/90 backdrop:backdrop-blur-md"
      >
        <button
          type="button"
          onClick={close}
          aria-label={t.video.close}
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink hover:bg-white/10"
        >
          <IconClose size={18} />
        </button>
        <video
          ref={videoRef}
          src={site.video}
          controls
          playsInline
          preload="none"
          className="aspect-video w-full rounded-2xl border border-line bg-black"
        />
      </dialog>
    </>
  );
}
