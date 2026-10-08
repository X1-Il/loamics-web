import { describe, expect, it } from "vitest";
import { RAW_FEED, flag, parse, standardize, toCelsius } from "../dataquality";

describe("data preparation pipeline", () => {
  it("parses readings with and without values", () => {
    expect(parse("t|line-A|temp=21.4C|ok")).toMatchObject({ value: 21.4, unit: "C" });
    expect(parse("t|line-C|temp=|ok")).toMatchObject({ value: null, unit: null });
  });

  it("converts units to celsius", () => {
    expect(toCelsius(212, "F")).toBeCloseTo(100);
    expect(toCelsius(273.15, "K")).toBeCloseTo(0);
  });

  it("flags duplicates, missing values and faults", () => {
    const issues = flag(RAW_FEED.map(parse)).map((r) => r.issue).filter(Boolean);
    expect(issues).toEqual(["duplicate", "missing", "fault"]);
  });

  it("outputs a homogeneous celsius dataset", () => {
    const clean = standardize(flag(RAW_FEED.map(parse)));
    expect(clean).toHaveLength(6);
    expect(clean.every((r) => r.unit === "C" && r.value! > 15 && r.value! < 30)).toBe(true);
  });
});
