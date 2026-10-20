import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionLabel } from "@/components/ui";
import { brandBrief, brandUseCases } from "@/content/site";

export const metadata: Metadata = {
  title: "Stickers for brands",
  description: "Branded and bulk stickers for packaging, events, cafés, creators and college fests. Send Stix N Vibes a brief.",
  alternates: { canonical: "/brands/" },
};

export default function BrandsPage() {
  return (
    <>
      <PageIntro label="For brands" title={<>Put your name <span className="text-lemon">on it.</span></>}>
        <p>
          Stickers for packaging, merch tables, events and campaigns. Send us a short brief. We reply
          with options and a quote for your project.
        </p>
      </PageIntro>

      <section aria-labelledby="uses-title" className="container-x">
        <SectionLabel index="01">Where stickers work</SectionLabel>
        <h2 id="uses-title" className="sr-only">Where stickers work</h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {brandUseCases.map((u, i) => (
            <li key={u.title} className="group bg-ink p-8 transition-colors hover:bg-surface md:p-10">
              <span className="label text-mute group-hover:text-lemon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-4xl">{u.title}</h3>
              <p className="mt-3 text-paper/70">{u.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="enquiry-title" className="container-x pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="02">Send a brief</SectionLabel>
            <h2 id="enquiry-title" className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              Tell us what you need.
            </h2>
            <Reveal className="mt-8">
              <p className="text-paper/75">It helps if you include:</p>
              <ul className="mt-4 space-y-3">
                {brandBrief.map((b) => (
                  <li key={b} className="flex gap-3 text-paper/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lemon" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-paper/75">
                After you send it, we read your brief and reply with questions, options and a quote.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm variant="brand" />
          </div>
        </div>
      </section>
    </>
  );
}
