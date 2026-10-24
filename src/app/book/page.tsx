import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProofWall } from "@/components/proof-wall";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionLabel, Sticker } from "@/components/ui";
import { bestStall, pitchPdf, stallBring, stallNeeds } from "@/content/book";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a sticker stall for your fest",
  description:
    "Invite Stix N Vibes to your college fest, market or pop-up in Goa. Live sticker cutting, tables of designs and a student-led story.",
  alternates: { canonical: "/book/" },
};

export default function BookPage() {
  return (
    <>
      <PageIntro label="Book a stall" title={<>Bring the stall to <span className="text-lemon">your fest.</span></>}>
        <p>
          We&apos;re a student-led sticker brand from Goa. We set up at college fests, markets and
          pop-ups, cut stickers live and bring a crowd with us. Here&apos;s what we bring and what we need.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#invite" className="btn btn-primary">
            Invite us
          </a>
          <a href={pitchPdf} download className="btn btn-ghost">
            Download the pitch (PDF)
          </a>
        </div>
      </PageIntro>

      <section aria-labelledby="bring-title" className="container-x">
        <SectionLabel index="01">What we bring</SectionLabel>
        <h2 id="bring-title" className="sr-only">What we bring</h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stallBring.map((b, i) => (
            <li key={b.title} className="bg-ink p-8">
              <span className="label text-lemon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-4xl">{b.title}</h3>
              <p className="mt-3 text-paper/70">{b.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 overflow-x-clip md:mt-16">
          <ProofWall />
        </div>
      </section>

      <section aria-labelledby="drop-title" className="container-x pt-28 md:pt-40">
        <div className="relative overflow-hidden rounded-[2rem] bg-lemon px-6 py-14 text-ink md:px-14 md:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="label flex items-center gap-3 text-ink/70">
              <span>02</span>
              <span className="h-px w-8 bg-ink/30" aria-hidden="true" />
              Fest-only drop
            </p>
            <h2 id="drop-title" className="display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">
              A drop made for your fest.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-ink/75">
              We design 3 to 5 stickers just for your event: your fest name, your campus, your inside
              jokes. They&apos;re sold only at your stall, so people grab them and post them. Ask us
              about it when you invite us.
            </p>
          </div>
          <Sticker id="lofi-11" rotate={-10} className="absolute -bottom-8 right-40 hidden w-44 lg:block" />
          <Sticker id="lofi-03" rotate={8} className="absolute right-6 top-10 hidden w-48 lg:block" />
        </div>
      </section>

      <section aria-labelledby="proof-title" className="container-x pt-28 md:pt-40">
        <SectionLabel index="03">Proof</SectionLabel>
        <Reveal>
          <h2 id="proof-title" className="display mt-6 max-w-[16ch] text-[clamp(2.8rem,7vw,6.5rem)]">
            Our best stall so far: <span className="text-lemon">{bestStall}.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-6 max-w-lg text-lg text-paper/75">
          The clips above are real, from our own stalls. Every stall goes on Instagram, so you can see
          the crowd before you book us.
        </Reveal>
        <Reveal className="mt-8">
          <a href={site.contact.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
            See our stalls on Instagram <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </section>

      <section id="invite" aria-labelledby="invite-title" className="container-x scroll-mt-24 pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="04">Invite us</SectionLabel>
            <h2 id="invite-title" className="display mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              Tell us about your event.
            </h2>
            <Reveal className="mt-8">
              <p className="text-paper/75">What we need from you:</p>
              <ul className="mt-4 space-y-3">
                {stallNeeds.map((n) => (
                  <li key={n} className="flex gap-3 text-paper/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lemon" aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-paper/75">
                Sending this to your committee? The one-page pitch has everything above.
              </p>
              <a href={pitchPdf} download className="btn btn-ghost mt-4">
                Download the pitch (PDF)
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm variant="stall" />
          </div>
        </div>
      </section>

      <section aria-labelledby="crew-title" className="container-x pt-28 md:pt-40">
        <div className="ice grid gap-8 rounded-[2rem] p-8 md:grid-cols-12 md:p-14">
          <div className="md:col-span-7">
            <SectionLabel index="05">Campus crew</SectionLabel>
            <h2 id="crew-title" className="display mt-6 text-5xl md:text-7xl">
              Study in Goa? Bring us to your college.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-paper/75">
              Tell us when your college has a fest and help us get a stall there. Every stall you help
              us land gets you free stickers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-primary">
                DM us to join
              </a>
              <a href="#invite" className="btn btn-ghost">
                Or pick &ldquo;Campus crew&rdquo; in the form
              </a>
            </div>
          </div>
          <div className="relative hidden aspect-square md:col-span-4 md:col-start-9 md:block">
            <Sticker id="lofi-06" rotate={-8} className="absolute left-0 top-0 w-[62%]" />
            <Sticker id="lofi-10" rotate={10} className="absolute bottom-0 right-0 w-[58%]" />
          </div>
        </div>
      </section>
    </>
  );
}
