import type { ReactNode } from "react";
import { headings, type Block } from "@/content/blocks";
import { Prose } from "@/components/ui/Prose";
import { Toc } from "./Toc";

/** Long-form layout: sticky table of contents + readable measure. */
export function Article({ blocks, children, label }: { blocks: Block[]; children?: ReactNode; label: string }) {
  const toc = headings(blocks).map((h) => ({ id: h.id!, text: h.text }));
  return (
    <section className="hairline-t pb-24 pt-8 md:pb-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          {toc.length > 1 && <Toc items={toc} label={label} />}
        </aside>
        <div className="max-w-[720px] lg:col-span-8 lg:col-start-5">
          <Prose blocks={blocks} />
          {children}
        </div>
      </div>
    </section>
  );
}
