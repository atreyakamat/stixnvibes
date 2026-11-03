import type { Metadata } from "next";
import { BulkEstimator } from "@/components/bulk-estimator";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { CtaBand, FaqList, PageIntro, SectionLabel, Sticker } from "@/components/ui";
import { brandBrief, bulkFaqs, bulkSteps, bulkTerms, bulkTiers, bulkUses, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Bulk logo stickers",
  description:
    "Custom logo stickers for Goa brands, from ₹5 each. Waterproof vinyl, any cut shape, free proof, ready in 2–3 days.",
  alternates: { canonical: "/bulk/" },
};

export default function BulkPage() {
  return (
    <>
      <PageIntro label="Bulk orders" title={<>Your logo, <span className="text-lemon">everywhere.</span></>}>
        <p>
          Waterproof logo stickers for packaging, counters, events and merch. From {`₹${bulkTiers.at(-1)!.each}`} a
          sticker, with a free proof before we cut anything. Made in Goa.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#estimate" className="btn btn-primary">
            Check your price
          </a>
          <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-ghost">
            DM us on Instagram
          </a>
        </div>
      </PageIntro>

      <section aria-labelledby="sample-title" className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-lemon/40 bg-surface p-8 md:p-14">
          <Sticker id="lofi-10" rotate={12} className="absolute -right-6 -top-6 hidden w-40 md:block" />
          <p className="label text-lemon">Got a sample from us?</p>
          <h2 id="sample-title" className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">
            Those stickers were made for you. Want more?
          </h2>
          <p className="mt-5 max-w-2xl text-paper/75">
            Stick one on a laptop, a bottle, a box. See how it holds up. When you are ready, DM us the word
            <span className="font-semibold text-paper"> SAMPLE</span> and we will send your proof and a quote the same
            day.
          </p>
          <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-primary mt-8">
            DM &ldquo;SAMPLE&rdquo;
          </a>
        </Reveal>
      </section>

      <section id="estimate" aria-labelledby="price-title" className="container-x scroll-mt-28 pt-28 md:pt-40">
        <SectionLabel index="01">Prices</SectionLabel>
        <div className="mt-6 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="price-title" className="display text-[clamp(2.8rem,6vw,5.5rem)]">
              The more you stick, <span className="text-lemon">the less you pay.</span>
            </h2>
            <table className="mt-10 w-full overflow-hidden rounded-[1.5rem] border border-line text-left">
              <caption className="sr-only">Price per sticker by quantity, up to about 5 cm</caption>
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="label p-5 font-normal text-mute">Quantity</th>
                  <th scope="col" className="label p-5 text-right font-normal text-mute">Per sticker</th>
                </tr>
              </thead>
              <tbody>
                {bulkTiers.map((t) => (
                  <tr key={t.qty} className="border-t border-line">
                    <td className="display p-5 text-3xl">{t.qty}</td>
                    <td className="display p-5 text-right text-3xl text-lemon">₹{t.each}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-7">
            <BulkEstimator />
            <ul className="mt-8 space-y-3">
              {bulkTerms.map((t) => (
                <li key={t} className="flex gap-3 text-paper/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lemon" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="uses-title" className="container-x pt-28 md:pt-40">
        <SectionLabel index="02">Where they work</SectionLabel>
        <h2 id="uses-title" className="sr-only">Where logo stickers work</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {bulkUses.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 2) * 90} className="ice rounded-[1.5rem] p-8 md:p-10">
              <span className="label text-lemon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-4xl md:text-5xl">{u.title}</h3>
              <p className="mt-3 max-w-md text-paper/70">{u.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="container-x pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">How it works</SectionLabel>
            <h2 id="how-title" className="display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">
              Logo to sticker in a week.
            </h2>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-7">
            {bulkSteps.map((step, i) => (
              <Reveal as="li" key={step.title} className="grid grid-cols-[4rem_1fr] gap-4 py-8 md:grid-cols-[6rem_1fr]">
                <span className="display text-6xl text-lemon md:text-7xl">{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-paper/70">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="brief" aria-labelledby="brief-title" className="container-x scroll-mt-28 pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="04">Send a brief</SectionLabel>
            <h2 id="brief-title" className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              Get your free proof.
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
                Rather chat? DM{" "}
                <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="text-lemon underline">
                  {site.contact.instagramHandle}
                </a>{" "}
                on Instagram.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm variant="brand" />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="container-x pt-28 md:pt-40">
        <SectionLabel index="05">Questions</SectionLabel>
        <h2 id="faq-title" className="display mt-6 mb-10 text-[clamp(2.8rem,6vw,5.5rem)]">
          Good to know.
        </h2>
        <FaqList items={bulkFaqs} />
      </section>

      <CtaBand
        title="Stick your name on Goa."
        primary={{ href: "#brief", label: "Get a free proof" }}
        secondary={{ href: "/brands/", label: "More for brands" }}
      />
    </>
  );
}
