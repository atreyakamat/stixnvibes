// Emails every form submission to the inbox through EmailJS, alongside the
// copy Netlify Forms keeps. The three values come from Netlify environment
// variables at build time; with any of them missing, nothing is emailed and
// the forms still post to Netlify.
const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const emailEnabled = Boolean(SERVICE && TEMPLATE && KEY);

const sentAt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

/**
 * Sends one email. `fields` become the lines of the email body, in order;
 * empty values are left out. The template can use {{title}}, {{name}},
 * {{email}} (also the Reply-To), {{time}} and the body as {{message}} or
 * {{details}}, so EmailJS's stock "Contact Us" template works unchanged.
 */
export async function emailSubmission(title: string, fields: Record<string, string>) {
  if (!emailEnabled) throw new Error("EmailJS is not configured");
  const details = Object.entries(fields)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE,
      template_id: TEMPLATE,
      user_id: KEY,
      template_params: {
        title,
        name: fields.Name ?? "",
        email: fields.Email ?? "",
        time: sentAt.format(new Date()),
        message: details,
        details,
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}`);
}

/**
 * Runs the Netlify post and the email together. The person sees success when
 * either one lands, so a hiccup in one service never loses an enquiry.
 */
export async function deliver(netlify: () => Promise<Response>, email: () => Promise<void>) {
  const [saved, mailed] = await Promise.allSettled([
    netlify().then((r) => {
      if (!r.ok) throw new Error(String(r.status));
    }),
    emailEnabled ? email() : Promise.reject(new Error("off")),
  ]);
  if (saved.status === "rejected" && mailed.status === "rejected") throw saved.reason;
}
