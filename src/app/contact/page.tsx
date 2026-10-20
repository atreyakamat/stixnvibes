import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageIntro } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Message Stix N Vibes about custom stickers, brand orders, events and collabs.",
  alternates: { canonical: "/contact/" },
};

const channels = [
  { label: "Instagram", value: site.contact.instagramHandle, href: site.contact.instagram, external: true },
  { label: "WhatsApp", value: "Message us", href: site.contact.whatsapp, external: true },
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, external: false },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro label="Contact" title={<>Say <span className="text-lemon">hi.</span></>}>
        <p>Custom stickers, brand orders, events or collabs. Send a message and we reply.</p>
      </PageIntro>

      <section aria-label="Contact options" className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <ul className="space-y-3 lg:col-span-4">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex items-center justify-between rounded-[1.25rem] border border-line p-6 transition-colors hover:border-lemon"
                >
                  <span>
                    <span className="label block text-mute">{c.label}</span>
                    <span className="mt-1 block text-xl font-medium group-hover:text-lemon">{c.value}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
