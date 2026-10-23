"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";

const TYPES = [
  "Custom stickers",
  "Brand or bulk order",
  "Event or pop-up",
  "Sponsorship",
  "Stall invite",
  "Campus crew",
  "Collab",
  "Something else",
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type State = "idle" | "sending" | "sent" | "failed";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Enter your name.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email like name@example.com.";
  if (String(data.get("message") ?? "").trim().length < 10)
    errors.message = "Tell us a little more, at least 10 characters.";
  return errors;
}

/**
 * Posts to Netlify Forms (registered by public/__forms.html). The success
 * message only shows after Netlify accepts the submission.
 */
// The brand and stall variants add two detail fields. They reuse the
// `quantity` and `timeline` names so Netlify keeps one form.
const DETAILS = {
  brand: {
    type: "Brand or bulk order",
    org: "Brand or organisation",
    quantity: { label: "Rough quantity and size", placeholder: "e.g. 500 stickers, about 5 cm" },
    timeline: { label: "When do you need them?", placeholder: "e.g. before 15 December" },
  },
  stall: {
    type: "Stall invite",
    org: "Event, college or club",
    quantity: { label: "Expected crowd", placeholder: "e.g. 800 students over two days" },
    timeline: { label: "Event date and place", placeholder: "e.g. Sunday 14 December, Mapusa" },
  },
} as const;

export function EnquiryForm({ variant = "general" }: { variant?: "general" | "brand" | "stall" }) {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  const extra = variant === "general" ? null : DETAILS[variant];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    data.set("page", window.location.pathname);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="ice rounded-[1.5rem] p-8 md:p-10">
        <p className="display text-5xl text-lemon">Got it.</p>
        <p className="mt-4 max-w-md text-lg text-paper/80">
          Your message reached us. We reply by email or WhatsApp.
        </p>
        <button type="button" className="btn btn-ghost mt-8" onClick={() => setState("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  });
  const error = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${uid}-${name}-error`} className="mt-2 text-sm text-[#ff9a80]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form name="enquiry" method="POST" onSubmit={onSubmit} noValidate className="grid gap-5">
      <input type="hidden" name="form-name" value="enquiry" />
      <p className="hidden">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset>
        <legend className="mb-3 text-sm text-paper/80">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                defaultChecked={extra ? t === extra.type : i === 0}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full px-4 py-2 text-sm ring-1 ring-paper/20 transition-colors peer-checked:bg-lemon peer-checked:text-ink peer-checked:ring-lemon peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lemon">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm text-paper/80">
            Your name
          </label>
          <input {...field("name")} type="text" autoComplete="name" className="field" />
          {error("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm text-paper/80">
            Email
          </label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" className="field" />
          {error("email")}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-2 block text-sm text-paper/80">
            WhatsApp number <span className="text-mute">(optional)</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="mb-2 block text-sm text-paper/80">
            {extra?.org ?? "Brand or organisation"} <span className="text-mute">(optional)</span>
          </label>
          <input id={`${uid}-company`} name="company" type="text" autoComplete="organization" className="field" />
        </div>
        {extra && (
          <>
            <div>
              <label htmlFor={`${uid}-quantity`} className="mb-2 block text-sm text-paper/80">
                {extra.quantity.label} <span className="text-mute">(optional)</span>
              </label>
              <input id={`${uid}-quantity`} name="quantity" type="text" placeholder={extra.quantity.placeholder} className="field" />
            </div>
            <div>
              <label htmlFor={`${uid}-timeline`} className="mb-2 block text-sm text-paper/80">
                {extra.timeline.label} <span className="text-mute">(optional)</span>
              </label>
              <input id={`${uid}-timeline`} name="timeline" type="text" placeholder={extra.timeline.placeholder} className="field" />
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-2 block text-sm text-paper/80">
          Tell us about it
        </label>
        <textarea
          {...field("message")}
          rows={5}
          placeholder="What is it for? Add a link to your artwork if you have one."
          className="field resize-y"
        />
        {error("message")}
      </div>

      <p className="text-sm text-mute">
        Only share artwork you own or have permission to use. We use your details only to reply to you.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "failed" && (
          <p role="alert" className="text-sm text-[#ff9a80]">
            That did not send. Try again, or message us on{" "}
            <a className="underline" href={site.contact.whatsapp}>
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
