"use client";

import { useMemo, useState } from "react";
import { STAGES, runPipeline, type Stage } from "@/lib/dataquality";
import { DemoFrame } from "./DemoFrame";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/config";
import { IconClose } from "@/components/brand/icons";


function Cell({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return <td className={`px-3 py-2 ${dim ? "text-ink-3" : "text-ink-2"}`}>{children}</td>;
}

/** Real pipeline (src/lib/dataquality.ts) applied step by step to a messy sensor feed. */
export function DataPrep() {
  const { t } = useI18n();
  const x = t.prep;
  const [stage, setStage] = useState<Stage>("collect");
  const data = useMemo(() => runPipeline(stage), [stage]);
  const idx = STAGES.findIndex((s) => s.key === stage);

  return (
    <DemoFrame
      title={x.title}
      note={t.common.inBrowser}
      caption={x.stages[stage].description}
    >
      <ol className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4" aria-label={x.stagesAria}>
        {STAGES.map((s, i) => (
          <li key={s.key} className="bg-night-950">
            <button
              type="button"
              onClick={() => setStage(s.key)}
              aria-pressed={stage === s.key}
              className={`relative flex w-full items-center gap-3 px-4 py-4 text-left text-sm transition-colors ${
                stage === s.key ? "bg-night-900 text-ink" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              <span
                className={`t-mono grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] ${
                  i <= idx ? "border-violet text-ink" : "border-line-2"
                }`}
              >
                {i + 1}
              </span>
              {x.stages[s.key].label}
              {stage === s.key && <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-[image:var(--signal)]" />}
            </button>
          </li>
        ))}
      </ol>

      <div className="t-mono min-h-[360px] overflow-x-auto p-4 text-xs md:p-5">
        {stage === "collect" && (
          <ol className="space-y-1.5">
            {data.raw.map((l, i) => (
              <li key={i} className="whitespace-nowrap text-ink-2">
                <span className="mr-4 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {l}
              </li>
            ))}
          </ol>
        )}
        {stage !== "collect" && (
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[10px] uppercase tracking-[0.12em] text-ink-3">
                <th className="px-3 py-2 font-normal">{x.columns.ts}</th>
                <th className="px-3 py-2 font-normal">{x.columns.source}</th>
                <th className="px-3 py-2 font-normal">{x.columns.value}</th>
                <th className="px-3 py-2 font-normal">{x.columns.unit}</th>
                <th className="px-3 py-2 font-normal">{stage === "standardize" ? "" : x.columns.check}</th>
              </tr>
            </thead>
            <tbody>
              {(stage === "structure" ? data.structured : stage === "clean" ? data.flagged : data.clean).map((r, i) => (
                <tr
                  key={i}
                  className={`border-b border-line/60 transition-colors ${stage === "clean" && r.issue ? "bg-magenta/[0.06]" : ""}`}
                >
                  <Cell dim>{r.ts}</Cell>
                  <Cell>{r.source}</Cell>
                  <Cell>{r.value === null ? <span className="text-magenta">null</span> : r.value}</Cell>
                  <Cell>{r.unit ?? <span className="text-magenta">n/a</span>}</Cell>
                  <Cell>
                    {stage === "clean" &&
                      (r.issue ? (
                        <span className="inline-flex items-center gap-1.5 text-magenta"><IconClose size={12} />{x.issues[r.issue]}</span>
                      ) : (
                        <span className="text-ink-3">{x.ok}</span>
                      ))}
                    {stage === "standardize" && <span className="text-violet">°C</span>}
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="mt-5 text-ink-3">
          {stage === "collect" && fmt(x.summary.collect, { n: data.raw.length })}
          {stage === "structure" && fmt(x.summary.structure, { n: data.structured.length })}
          {stage === "clean" && fmt(x.summary.clean, { n: data.flagged.filter((r) => r.issue).length })}
          {stage === "standardize" && fmt(x.summary.standardize, { n: data.clean.length })}
        </p>
      </div>
    </DemoFrame>
  );
}
