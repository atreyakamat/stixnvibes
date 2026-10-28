import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionLabel } from "@/components/ui";
import { brandBrief, brandUseCases, bulkTerms, bulkTiers, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Stickers for brands",
  description: "Bulk and logo stickers for college clubs, fests, brands and events in Goa. From ₹5 a sticker, any cut shape, free proof.",
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

      <section id="pricing" aria-labelledby="pricing-title" className="container-x scroll-mt-28 pt-28 md:pt-40">
        <SectionLabel index="02">Bulk prices</SectionLabel>
        <div className="mt-6 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="pricing-title" className="display text-[clamp(2.8rem,6vw,5.5rem)]">
              The more you stick, <span className="text-lemon">the less you pay.</span>
            </h2>
            <p className="mt-6 text-paper/75">
              Custom stickers with your logo or art. Waterproof vinyl, any cut shape, up to about 5 cm.
            </p>
          </div>
          <div className="lg:col-span-7">
            <table className="w-full overflow-hidden rounded-[1.5rem] border border-line text-left">
              <caption className="sr-only">Price per sticker by quantity</caption>
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="label p-5 font-normal text-mute md:p-6">Quantity</th>
                  <th scope="col" className="label p-5 text-right font-normal text-mute md:p-6">Per sticker</th>
                </tr>
              </thead>
              <tbody>
                {bulkTiers.map((t) => (
                  <tr key={t.qty} className="border-t border-line">
                    <td className="display p-5 text-3xl md:p-6 md:text-4xl">{t.qty}</td>
                    <td className="display p-5 text-right text-3xl text-lemon md:p-6 md:text-4xl">₹{t.each}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-8 space-y-3">
              {bulkTerms.map((t) => (
                <li key={t} className="flex gap-3 text-paper/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lemon" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/bulk/" className="btn btn-primary">
                See bulk orders
              </Link>
              <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-ghost">
                DM us on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="enquiry-title" className="container-x pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">Send a brief</SectionLabel>
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
