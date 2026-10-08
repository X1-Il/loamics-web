/**
 * Contact form schema, shared by the client (instant feedback) and the
 * route handler (source of truth). Dependency-free and language-neutral:
 * it returns error codes, the interface turns them into words.
 */

export const CONTACT_FIELDS = [
  { name: "lastName", type: "text", autoComplete: "family-name", max: 80 },
  { name: "firstName", type: "text", autoComplete: "given-name", max: 80 },
  { name: "company", type: "text", autoComplete: "organization", max: 120 },
  { name: "jobTitle", type: "text", autoComplete: "organization-title", max: 120 },
  { name: "phone", type: "tel", autoComplete: "tel", max: 30 },
  { name: "email", type: "email", autoComplete: "email", max: 160 },
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number]["name"] | "comment";
export type ContactInput = Record<ContactField, string> & { consent: boolean; website?: string };
export type ContactErrorCode = "required" | "too_long" | "invalid";
export type ContactErrors = Partial<Record<ContactField | "consent", ContactErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{6,30}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const e: ContactErrors = {};
  for (const f of CONTACT_FIELDS) {
    const v = (input[f.name] ?? "").trim();
    if (!v) e[f.name] = "required";
    else if (v.length > f.max) e[f.name] = "too_long";
  }
  const email = (input.email ?? "").trim();
  if (email && !EMAIL_RE.test(email)) e.email = "invalid";
  const phone = (input.phone ?? "").trim();
  if (phone && !PHONE_RE.test(phone)) e.phone = "invalid";
  const comment = (input.comment ?? "").trim();
  if (!comment) e.comment = "required";
  else if (comment.length > 4000) e.comment = "too_long";
  if (!input.consent) e.consent = "required";
  return e;
}
