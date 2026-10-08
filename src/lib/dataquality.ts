/**
 * A tiny, real data-preparation pipeline mirroring the four areas of work
 * described on the AlgoEngine page: collect, structure, eliminate erroneous
 * or irrelevant data, standardize.
 */

export const RAW_FEED = [
  "2024-03-01T08:00Z|line-A|temp=21.4C|ok",
  "2024-03-01T08:00Z|line-B|temp=70.5F|ok",
  "2024-03-01T08:01Z|line-A|temp=21.6C|ok",
  "2024-03-01T08:01Z|line-A|temp=21.6C|ok",
  "2024-03-01T08:01Z|line-C|temp=|ok",
  "2024-03-01T08:02Z|line-B|temp=294.9K|ok",
  "2024-03-01T08:02Z|line-C|temp=-999C|sensor_fault",
  "2024-03-01T08:03Z|line-A|temp=21.9C|ok",
  "2024-03-01T08:03Z|line-C|temp=72.1F|ok",
];

export type Row = {
  ts: string;
  source: string;
  value: number | null;
  unit: "C" | "F" | "K" | null;
  status: string;
  issue?: "duplicate" | "missing" | "out_of_range" | "fault";
};

export type Stage = "collect" | "structure" | "clean" | "standardize";
export const STAGES: { key: Stage; label: string; description: string }[] = [
  { key: "collect", label: "Collect", description: "Collecting data from different sources (ETL/ELT)." },
  { key: "structure", label: "Structure", description: "Structuring the data." },
  { key: "clean", label: "Eliminate", description: "Identify and eliminate erroneous or irrelevant data." },
  { key: "standardize", label: "Standardize", description: "Standardize the data so that it can be processed." },
];

export function parse(line: string): Row {
  const [ts, source, reading, status] = line.split("|");
  const m = /^temp=(-?\d+(?:\.\d+)?)?([CFK])?$/.exec(reading ?? "");
  const value = m?.[1] !== undefined ? Number(m[1]) : null;
  const unit = (m?.[2] as Row["unit"]) ?? null;
  return { ts, source, value, unit, status };
}

export function toCelsius(value: number, unit: Row["unit"]): number {
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

/** Flags issues without dropping rows, so the UI can show what gets removed. */
export function flag(rows: Row[]): Row[] {
  const seen = new Set<string>();
  return rows.map((r) => {
    const key = `${r.ts}|${r.source}|${r.value}|${r.unit}`;
    let issue: Row["issue"];
    if (r.status !== "ok") issue = "fault";
    else if (r.value === null) issue = "missing";
    else if (seen.has(key)) issue = "duplicate";
    else {
      const c = toCelsius(r.value, r.unit);
      if (c < -50 || c > 150) issue = "out_of_range";
    }
    seen.add(key);
    return issue ? { ...r, issue } : r;
  });
}

export function standardize(rows: Row[]): Row[] {
  return rows
    .filter((r) => !r.issue)
    .map((r) => ({ ...r, value: Math.round(toCelsius(r.value as number, r.unit) * 10) / 10, unit: "C" as const }));
}

export function runPipeline(stage: Stage) {
  const structured = RAW_FEED.map(parse);
  const flagged = flag(structured);
  return {
    raw: RAW_FEED,
    structured,
    flagged,
    clean: standardize(flagged),
    stage,
  };
}
