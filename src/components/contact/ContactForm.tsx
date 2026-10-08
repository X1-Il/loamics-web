"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_FIELDS, validateContact, type ContactErrors, type ContactField, type ContactInput } from "@/lib/contact";
import { IconArrowRight, IconCheck } from "@/components/brand/icons";
import { site } from "@/content/site";
import { useI18n } from "@/i18n/client";
import { fmt, href } from "@/i18n/config";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "peer h-14 w-full rounded-xl border bg-night-900/60 px-4 pt-4 text-[15px] text-ink outline-none transition-colors placeholder:text-transparent focus:border-violet focus:bg-night-900";

export function ContactForm() {
  const { locale, t } = useI18n();
  const f = t.form;
  const [errors, setErrors] = useState<ContactErrors>({});

  // Error codes (shared with the API) become sentences in the reader's language.
  const message = (field: ContactField | "consent"): string | undefined => {
    const code = errors[field];
    if (!code) return undefined;
    if (field === "consent") return f.errors.consent;
    if (code === "invalid") return field === "email" ? f.errors.email : f.errors.phone;
    if (field === "comment" && code === "required") return f.errors.comment;
    return fmt(code === "too_long" ? f.errors.tooLong : f.errors.required, { field: f.fields[field] });
  };
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const read = (form: HTMLFormElement): ContactInput => {
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "");
    return {
      lastName: v("lastName"),
      firstName: v("firstName"),
      company: v("company"),
      jobTitle: v("jobTitle"),
      phone: v("phone"),
      email: v("email"),
      comment: v("comment"),
      consent: fd.get("consent") === "on",
      website: v("website"),
    };
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const data = read(e.currentTarget);
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus("sent");
      else {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (touched) setErrors(validateContact(read(e.currentTarget)));
  };

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-start p-8 md:p-12" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-night-950">
          <IconCheck size={22} />
        </span>
        <h2 className="t-h2 mt-8">{f.thanks}</h2>
        <p className="t-lead mt-4 max-w-md">{f.thanksText}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} className="card p-6 md:p-10" aria-describedby="form-intro">
      <p id="form-intro" className="t-eyebrow">
        {f.required}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CONTACT_FIELDS.map((field) => (
          <div key={field.name} className="relative">
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.max}
              placeholder={f.fields[field.name]}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-err` : undefined}
              className={`${inputCls} ${errors[field.name] ? "border-magenta/70" : "border-line"}`}
            />
            <label
              htmlFor={field.name}
              className="pointer-events-none absolute left-4 top-2 text-[11px] text-ink-3 transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-[11px]"
            >
              {f.fields[field.name]}
            </label>
            {errors[field.name] && (
              <p id={`${field.name}-err`} className="mt-1.5 text-xs text-magenta">
                {message(field.name)}
              </p>
            )}
          </div>
        ))}
        <div className="relative sm:col-span-2">
          <textarea
            id="comment"
            name="comment"
            rows={5}
            maxLength={4000}
            placeholder={f.fields.comment}
            aria-invalid={!!errors.comment}
            aria-describedby={errors.comment ? "comment-err" : undefined}
            className={`${inputCls} h-auto resize-y pt-7 ${errors.comment ? "border-magenta/70" : "border-line"}`}
          />
          <label
            htmlFor="comment"
            className="pointer-events-none absolute left-4 top-2 text-[11px] text-ink-3 transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-[11px]"
          >
            {f.fields.comment}
          </label>
          {errors.comment && (
            <p id="comment-err" className="mt-1.5 text-xs text-magenta">
              {message("comment")}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">{f.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-2">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-err" : undefined}
          className="check mt-0.5"
        />
        <span>
          {f.consentBefore}{" "}
          <Link href={href(locale, "privacy")} className="text-ink underline decoration-violet underline-offset-4">
            {f.consentLink}
          </Link>{" "}
          {f.consentAfter}
        </span>
      </label>
      {errors.consent && (
        <p id="consent-err" className="ml-8 mt-1.5 text-xs text-magenta">
          {message("consent")}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? f.sending : f.submit}
          <IconArrowRight size={16} className="btn-arrow" />
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-magenta">
            {f.failed}{" "}
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
