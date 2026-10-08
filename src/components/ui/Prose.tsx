import type { Block } from "@/content/blocks";
import { Fragment, type ReactNode } from "react";

const URL_RE = /(https?:\/\/[^\s]+[^\s.,;:)])/g;
const MAIL_RE = /([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,})/gi;

/** Turn bare URLs and e-mail addresses into links; everything else stays text. */
function linkify(text: string): ReactNode {
  const parts = text.split(URL_RE);
  return parts.map((part, i) => {
    if (i % 2 === 1)
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer">
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    const sub = part.split(MAIL_RE);
    return (
      <Fragment key={i}>
        {sub.map((s, j) =>
          j % 2 === 1 ? (
            <a key={j} href={`mailto:${s}`}>
              {s}
            </a>
          ) : (
            s
          ),
        )}
      </Fragment>
    );
  });
}

export function Prose({ blocks, className = "" }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`prose-l ${className}`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{linkify(it)}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className="my-10 border-l border-violet/60 pl-6">
                <blockquote className="t-h3 text-ink">“{b.text}”</blockquote>
                {b.cite && <figcaption className="t-eyebrow mt-3">{b.cite}</figcaption>}
              </figure>
            );
          default:
            return <p key={i}>{linkify(b.text)}</p>;
        }
      })}
    </div>
  );
}
