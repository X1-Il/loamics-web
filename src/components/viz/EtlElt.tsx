"use client";

import { useState } from "react";
import { DemoFrame, Segmented } from "./DemoFrame";
import { useI18n } from "@/i18n/client";

type Mode = "etl" | "elt";


/**
 * The T block physically moves: before the warehouse (ETL) or inside the
 * target (ELT). Layout is a 3-slot track; positions are animated with transforms.
 */
export function EtlElt() {
  const { t } = useI18n();
  const e = t.etl;
  const STEP = { E: e.extract, T: e.transform, L: e.load };
  const [mode, setMode] = useState<Mode>("elt");
  const order = mode === "etl" ? (["E", "T", "L"] as const) : (["E", "L", "T"] as const);

  return (
    <DemoFrame
      title={e.title}
      note={t.common.concept}
      controls={
        <Segmented
          label={e.process}
          value={mode}
          onChange={setMode}
          options={[
            { value: "etl", label: "ETL" },
            { value: "elt", label: "ELT" },
          ]}
        />
      }
      caption={
        mode === "etl"
          ? e.etlCaption
          : e.eltCaption
      }
    >
      <div className="relative px-5 py-12 md:px-10">
        <div className="relative grid grid-cols-3 gap-3 md:gap-6">
          {/* sources */}
          {(["E", "T", "L"] as const).map((k) => {
            const slot = order.indexOf(k);
            return (
              <div
                key={k}
                className="col-start-1 row-start-1 transition-transform duration-700 [transition-timing-function:var(--ease-out)]"
                style={{ transform: `translateX(calc(${slot * 100}% + ${slot} * var(--gap)))`, ["--gap" as string]: "clamp(12px, 2vw, 24px)" }}
              >
                <div
                  className={`rounded-2xl border p-4 md:p-6 ${
                    k === "T" ? "border-violet/60 bg-violet/10" : "border-line-2 bg-night-900"
                  }`}
                >
                  <span className="t-mono text-xs text-ink-3">{k}</span>
                  <p className="mt-6 text-base font-medium tracking-tight md:text-xl">{STEP[k]}</p>
                  <p className="mt-1 text-xs text-ink-3">
                    {k === "E" && e.remote}
                    {k === "L" && (mode === "etl" ? e.prepared : e.raw)}
                    {k === "T" && (mode === "etl" ? e.staging : e.inTarget)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* flow line */}
        <div aria-hidden className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-indigo via-violet to-magenta" />
          <span className="t-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            {order.map((k) => k).join(" → ")}
          </span>
        </div>
      </div>
    </DemoFrame>
  );
}
