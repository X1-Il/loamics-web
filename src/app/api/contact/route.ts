import { validateContact, type ContactInput } from "@/lib/contact";

// Best-effort, per-instance sliding window: 5 submissions / 10 min / IP.
// Behind a multi-instance deployment, swap for a shared store (Redis, KV).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string, now = Date.now()) {
  if (hits.size > 10_000) hits.clear(); // bound memory
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

/**
 * Contact endpoint.
 * - Validates with the same schema as the client.
 * - Honeypot field `website` silently drops bots; per-IP rate limit.
 * - Forwards to CONTACT_WEBHOOK_URL (CRM, Slack, e-mail relay...) when set.
 *   Without it, the request is rejected in production rather than pretending
 *   a message was delivered.
 */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429, headers: { "retry-after": "600" } });
  }

  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const payload = {
    lastName: body.lastName!.trim(),
    firstName: body.firstName!.trim(),
    company: body.company!.trim(),
    jobTitle: body.jobTitle!.trim(),
    phone: body.phone!.trim(),
    email: body.email!.trim(),
    comment: body.comment!.trim(),
    consent: true,
    receivedAt: new Date().toISOString(),
    source: "loamics.com/contact",
  };

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, error: "Contact delivery is not configured" }, { status: 503 });
  }
  console.info("[contact] dev submission (set CONTACT_WEBHOOK_URL to deliver):", payload.email);
  return Response.json({ ok: true, dev: true });
}
