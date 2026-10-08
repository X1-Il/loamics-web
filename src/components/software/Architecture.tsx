import Link from "next/link";
import { IconCatalog, IconCloud, IconCollect, IconPrepare, IconShield } from "@/components/brand/icons";
import { href, type Locale } from "@/i18n/config";
import { getUi } from "@/i18n/server";

const MODULES = [
  { icon: IconCollect, name: "DataCollect", route: "dataCollect" as const },
  { icon: IconCatalog, name: "DataLake", route: "datalake" as const },
  { icon: IconPrepare, name: "AlgoEngine", route: "algoengine" as const },
];

function Rail({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-night-950 p-4">
      <p className="t-eyebrow">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
        {items.map((s) => (
          <li key={s} className="t-mono rounded-full border border-line px-3 py-1.5 text-xs text-ink-2">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reference architecture: the suite running inside the customer's own cloud instance. */
export function Architecture({ locale }: { locale: Locale }) {
  const a = getUi(locale).architecture;
  const modules = MODULES.map((m, i) => ({ ...m, ...a.modules[i], href: href(locale, m.route) }));
  return (
    <figure className="card overflow-hidden p-4 md:p-6" data-reveal>
      <div className="grid items-stretch gap-4 lg:grid-cols-[180px_1fr_180px]">
        <Rail title={a.sources} items={a.sourceItems} />

        <div className="relative rounded-2xl border border-dashed border-line-2 p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="t-eyebrow flex items-center gap-2">
              <IconCloud size={16} /> {a.cloud}
            </p>
            <p className="t-mono hidden text-[11px] text-ink-3 sm:block">Microsoft Azure</p>
          </div>
          <ol className="mt-5 grid gap-3 md:grid-cols-3">
            {modules.map((m, i) => (
              <li key={m.name} className="relative">
                <Link href={m.href} className="group flex h-full flex-col rounded-xl border border-line bg-night-900 p-4 transition-colors hover:border-violet/60">
                  <span className="flex items-center justify-between">
                    <m.icon size={22} />
                    <span className="t-mono text-[11px] text-ink-3">0{i + 1}</span>
                  </span>
                  <span className="mt-6 text-base font-medium tracking-tight">{m.name}</span>
                  <span className="text-xs text-ink-3">{m.role}</span>
                  <span className="mt-4 text-xs leading-relaxed text-ink-2">{m.detail}</span>
                </Link>
                {i < modules.length - 1 && (
                  <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-px w-3 bg-violet md:block" />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line bg-night-950 px-4 py-3 text-xs text-ink-2">
            <span className="flex items-center gap-2 text-ink">
              <IconShield size={16} /> {a.governance}
            </span>
            {a.governanceItems.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
        </div>

        <Rail title={a.consumers} items={a.consumerItems} />
      </div>
      <figcaption className="mt-4 text-sm text-ink-3">
        {a.caption}
      </figcaption>
    </figure>
  );
}
