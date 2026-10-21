import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageIntro, SectionLabel, Sticker } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Our story",
  description: "Stix N Vibes is a student-led sticker and print brand from Goa that sells at pop-ups and events.",
  alternates: { canonical: "/about/" },
};

const beliefs = [
  { title: "Stickers should say something", body: "Every design should mean something to the person who picks it." },
  { title: "Made to be used", body: "Laptops, bottles, helmets, notebooks. Stickers belong on things." },
  { title: "Face to face first", body: "We meet most of our people at pop-ups. That keeps us honest about what works." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro label="Our story" title={<>From Goa, <span className="text-lemon">for everywhere.</span></>}>
        <p>
          {site.name} is a student-led startup started by Atreya Kamat and Kritik Sawant. We design
          stickers, print them and sell them face to face at pop-ups and events around Goa.
        </p>
      </PageIntro>

      <section aria-labelledby="why-title" className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="01">Why we started</SectionLabel>
            <h2 id="why-title" className="display mt-6 text-[clamp(2.6rem,6vw,5.5rem)]">
              Your stuff should look like you.
            </h2>
            <Reveal className="mt-6 space-y-4 text-lg text-paper/75">
              <p>
                We wanted stickers, so we made some. Then it turned into a business. The things you
                carry every day can show what you love, what makes you laugh and who your people are.
              </p>
              <p>
                Today we make waterproof sticker packs and custom stickers, plus A4 and A3
                peel-to-paste posters and Framez. Art cards and music cards too. We dispatch the next day.
              </p>
            </Reveal>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md lg:col-span-5 lg:col-start-8">
            <Sticker id="sticker-02" rotate={-8} className="absolute left-0 top-[4%] w-[48%]" />
            <Sticker id="sticker-22" rotate={8} className="absolute right-0 top-[18%] w-[48%]" />
            <Sticker id="sticker-31" rotate={-4} className="absolute bottom-0 left-[20%] w-[54%]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="believe-title" className="container-x pt-28 md:pt-40">
        <SectionLabel index="02">What we believe</SectionLabel>
        <h2 id="believe-title" className="sr-only">What we believe</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {beliefs.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 90} className="rounded-[1.5rem] border border-line p-8">
              <span className="display text-6xl text-lemon">{i + 1}</span>
              <h3 className="mt-6 text-2xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-paper/70">{b.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="find-title" className="container-x pt-28 md:pt-40">
        <div className="ice rounded-[2rem] p-8 md:p-14">
          <SectionLabel index="03">Find us</SectionLabel>
          <h2 id="find-title" className="display mt-6 text-5xl md:text-7xl">
            Catch us at a pop-up.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">
            We set up stalls at college events, markets and pop-ups in Goa. Follow{" "}
            <a href={site.contact.instagram} className="text-lemon underline underline-offset-4" target="_blank" rel="noopener">
              {site.contact.instagramHandle}
            </a>{" "}
            to see where we are next.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
