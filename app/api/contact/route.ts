import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API.
 *
 * To actually send emails, set ONE of these in `.env.local`:
 *
 *   Option A — Resend (recommended, https://resend.com)
 *     RESEND_API_KEY=re_xxx
 *     CONTACT_TO_EMAIL=lg2916286821@gmail.com   ← your real inbox
 *     CONTACT_FROM_EMAIL=hello@yourdomain.com   ← must be a verified domain
 *
 *   Option B — Web3Forms (no signup, https://web3forms.com)
 *     WEB3FORMS_KEY=xxxxxxxx                    ← get from web3forms.com
 *
 * Without either env var set, the route runs in DEMO MODE — it accepts
 * the message and returns ok, but nothing is sent. Lets you ship the
 * site immediately and wire real email later.
 */

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ ok: false, error: "message_too_long" }, { status: 400 });
  }

  const subject = `[lee.lin/portfolio] message from ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}\n\n---\nSent from your portfolio contact form.`;

  // Option A: Resend
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: process.env.CONTACT_TO_EMAIL,
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!r.ok) {
        const detail = await r.text();
        console.error("[contact] resend failed", r.status, detail);
        return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error("[contact] resend threw", e);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  }

  // Option B: Web3Forms
  if (process.env.WEB3FORMS_KEY) {
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          subject,
          from_name: "Portfolio Contact",
          name,
          email,
          message,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) {
        console.error("[contact] web3forms failed", r.status, j);
        return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error("[contact] web3forms threw", e);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  }

  // DEMO mode — log to server console, return ok.
  console.log("[contact] demo mode — would send:", { name, email, subject });
  return NextResponse.json({ ok: true, demo: true });
}
