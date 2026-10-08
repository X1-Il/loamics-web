import { LogoMark } from "@/components/brand/Logo";

/** How P4DP data moves: practices → medical software → Loamics processing → Health Data Hub → research & care. */
type FlowLabels = {
  practices: string;
  practicesSub: string;
  vendorsSub: string;
  loamicsSub: string;
  hubSub: string;
  research: string;
  researchSub: string;
  consortium: string;
};

export function P4dpFlow({ members, vendors, labels: l }: { members: string[]; vendors: string[]; labels: FlowLabels }) {
  const steps = [
    { k: l.practices, v: l.practicesSub },
    { k: vendors.join(" · "), v: l.vendorsSub },
    { k: "Loamics", v: l.loamicsSub, brand: true },
    { k: "Health Data Hub", v: l.hubSub, accent: true },
    { k: l.research, v: l.researchSub },
  ];
  return (
    <figure className="card p-6 md:p-8" data-reveal>
      <ol className="relative space-y-3">
        <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-indigo via-violet to-magenta" />
        {steps.map((s) => (
          <li key={s.k} className="relative flex items-center gap-4">
            <span
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-night-900 ${
                s.brand ? "border-violet text-ink" : "border-line-2"
              }`}
            >
              {s.brand ? <LogoMark size={20} /> : <span className={`h-2 w-2 rounded-full ${s.accent ? "bg-magenta" : "bg-ink-3"}`} />}
            </span>
            <span className={`flex-1 rounded-xl border px-4 py-3 ${s.brand ? "border-violet/50 bg-violet/10" : "border-line bg-night-950"}`}>
              <span className="block text-sm font-medium">{s.k}</span>
              <span className="block text-xs text-ink-3">{s.v}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 border-t border-line pt-5">
        <p className="t-eyebrow">{l.consortium}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {members.map((m) => (
            <li key={m} className="rounded-full border border-line px-3 py-1 text-xs text-ink-2">
              {m}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
