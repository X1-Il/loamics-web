export type Block =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

/**
 * Tiny authoring format for long-form copy:
 *   "## Heading"  -> h2
 *   "### Heading" -> h3
 *   "- item"      -> list item (consecutive items are grouped)
 *   "> quote | cite"
 *   anything else -> paragraph
 * Blocks are separated by blank lines; list items by single newlines.
 */
export function md(source: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of source.trim().split(/\n\s*\n/)) {
    const lines = chunk.trim().split("\n").map((l) => l.trim());
    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
      continue;
    }
    const text = lines.join(" ");
    if (text.startsWith("### ")) blocks.push({ type: "h3", text: text.slice(4) });
    else if (text.startsWith("## ")) {
      const t = text.slice(3);
      blocks.push({ type: "h2", text: t, id: slugify(t) });
    } else if (text.startsWith("> ")) {
      const [q, cite] = text.slice(2).split(" | ");
      blocks.push({ type: "quote", text: q, cite });
    } else blocks.push({ type: "p", text });
  }
  return blocks;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function headings(blocks: Block[]) {
  return blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
}
