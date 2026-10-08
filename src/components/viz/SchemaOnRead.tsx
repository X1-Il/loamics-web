"use client";

import { useState } from "react";
import { DemoFrame, Segmented } from "./DemoFrame";
import { useI18n } from "@/i18n/client";

type Mode = "write" | "read";

const RECORDS = [
  { fmt: "JSON", raw: '{"patient":"P-118","bp":"128/82","ts":"08:02"}', fits: false, id: "obj-7f3a", tags: ["src:ehr", "domain:health"] },
  { fmt: "CSV", raw: "line-B,72.1,F,2024-03-01T08:03", fits: true, id: "obj-91c2", tags: ["src:plant", "unit:F"] },
  { fmt: "IoT", raw: "0x1F 0xA2 0x07 0x3C  (binary frame)", fits: false, id: "obj-0b8e", tags: ["src:sensor", "proto:mqtt"] },
  { fmt: "Text", raw: "", fits: false, id: "obj-c44d", tags: ["src:crm", "lang:en"] },
  { fmt: "CSV", raw: "line-A,21.9,C,2024-03-01T08:03", fits: true, id: "obj-2e19", tags: ["src:plant", "unit:C"] },
];

/** Schema-on-write rejects what does not fit the predefined table; schema-on-read keeps everything native. */
export function SchemaOnRead() {
  const { t } = useI18n();
  const x = t.schema;
  const [mode, setMode] = useState<Mode>("read");
  const stored = mode === "read" ? RECORDS.length : RECORDS.filter((r) => r.fits).length;

  return (
    <DemoFrame
      title={x.title}
      note={t.common.concept}
      controls={
        <Segmented
          label={x.strategy}
          value={mode}
          onChange={setMode}
          options={[
            { value: "write", label: x.warehouse },
            { value: "read", label: x.lake },
          ]}
        />
      }
      caption={
        mode === "write"
          ? x.writeCaption
          : x.readCaption
      }
    >
      <div className="grid gap-px bg-line md:grid-cols-[1.2fr_auto_1fr]">
        <ul className="space-y-2 bg-night-950 p-5 md:p-6" aria-label={x.incoming}>
          {RECORDS.map((r, i) => {
            const rejected = mode === "write" && !r.fits;
            return (
              <li
                key={i}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500 ${
                  rejected ? "border-magenta/30 bg-magenta/[0.04] opacity-60" : "border-line bg-night-900"
                }`}
              >
                <span className="t-mono w-11 shrink-0 text-[11px] text-ink-3">{r.fmt}</span>
                <span className="min-w-0">
                  <code className={`t-mono block truncate text-xs ${rejected ? "text-ink-3 line-through" : "text-ink-2"}`}>{r.raw || x.textRecord}</code>
                  {mode === "read" && (
                    <span className="mt-1.5 flex flex-wrap gap-1" aria-label={x.metadata}>
                      {[r.id, ...r.tags].map((t) => (
                        <span key={t} className="t-mono rounded border border-violet/30 bg-violet/10 px-1.5 text-[10px] text-ink-2">
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <span className={`t-mono ml-auto shrink-0 text-[10px] uppercase tracking-wider ${rejected ? "text-magenta" : "text-ink-3"}`}>
                  {rejected ? x.mismatch : x.stored}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="hidden w-16 items-center justify-center bg-night-950 md:flex" aria-hidden>
          <svg width="32" height="120" viewBox="0 0 32 120" fill="none">
            <path d="M16 0v120" stroke="rgb(236 235 255 / .14)" />
            <path d="M16 0v120" stroke="#9A5CFF" strokeDasharray="2 10" className="flow-line" />
          </svg>
        </div>

        <div className="flex flex-col justify-between bg-night-950 p-5 md:p-6">
          <div>
            <p className="t-eyebrow">{mode === "write" ? x.predefined : x.native}</p>
            <p className="mt-6 text-6xl font-medium tracking-[-0.05em]">
              {stored}
              <span className="text-2xl text-ink-3">/{RECORDS.length}</span>
            </p>
            <p className="mt-2 text-sm text-ink-3">{x.available}</p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="t-eyebrow">{x.preparation}</dt>
              <dd className="mt-1 text-ink-2">{mode === "write" ? x.beforeStorage : x.whenUsed}</dd>
            </div>
            <div>
              <dt className="t-eyebrow">{x.schemaChange}</dt>
              <dd className="mt-1 text-ink-2">{mode === "write" ? x.costly : x.adapts}</dd>
            </div>
          </dl>
        </div>
      </div>
    </DemoFrame>
  );
}
