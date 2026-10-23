import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StickerLab } from "@/components/sticker-lab";
import { CtaBand, PageIntro, SectionLabel, Sticker } from "@/components/ui";
import { customServices, process } from "@/content/site";

export const metadata: Metadata = {
  title: "Custom stickers",
  description: "Turn your artwork, logo or idea into custom stickers and sticker packs. Made by Stix N Vibes in Goa.",
  alternates: { canonical: "/custom/" },
};

export default function CustomPage() {
  return (
    <>
      <PageIntro label="Custom" title={<>Make it <span className="text-lemon">yours.</span></>}>
        <p>
          Your drawing, your logo, your friend group&apos;s inside joke. Send it to us and we turn it into
          stickers you can hold.
        </p>
      </PageIntro>

      <section id="try" aria-labelledby="try-title" className="container-x scroll-mt-24">
        <SectionLabel index="01">Try it</SectionLabel>
        <h2 id="try-title" className="display mt-5 mb-10 text-[clamp(2.6rem,6vw,5.5rem)]">
          See your art as a sticker.
        </h2>
        <StickerLab />
      </section>

      <section aria-labelledby="what-title" className="container-x pt-28 md:pt-40">
        <SectionLabel index="02">What we make</SectionLabel>
        <h2 id="what-title" className="sr-only">What we make</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {customServices.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 2) * 90} className="ice rounded-[1.5rem] p-8 md:p-10">
              <span className="label text-lemon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-4xl md:text-5xl">{s.title}</h3>
              <p className="mt-3 max-w-md text-paper/70">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="container-x pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">How it works</SectionLabel>
            <h2 id="how-title" className="display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">
              Four steps. No fuss.
            </h2>
            <div className="relative mt-12 hidden h-72 lg:block">
              <Sticker id="lofi-13" rotate={-8} className="absolute left-0 top-0 w-48" />
              <Sticker id="lofi-10" rotate={10} className="absolute left-40 top-20 w-44" />
            </div>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-7">
            {process.map((step, i) => (
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

      <section aria-labelledby="art-title" className="container-x pt-28 md:pt-40">
        <div className="grid gap-8 rounded-[2rem] border border-line p-8 md:grid-cols-12 md:p-14">
          <div className="md:col-span-5">
            <SectionLabel index="04">Your artwork</SectionLabel>
            <h2 id="art-title" className="display mt-6 text-5xl md:text-6xl">
              Before you send
            </h2>
          </div>
          <ul className="space-y-4 text-lg text-paper/75 md:col-span-7">
            <li>Send the best file you have. A clear photo of a drawing works to start.</li>
            <li>Send only artwork you own, or have permission to use.</li>
            <li>Not sure what you want? Describe the vibe and we suggest options.</li>
            <li>
              Ordering for a brand or an event?{" "}
              <Link href="/brands/" className="text-lemon underline underline-offset-4">
                Use the brand enquiry
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>

      <CtaBand title="Got an idea?" primary={{ href: "/contact/", label: "Send it to us" }} secondary={{ href: "/brands/", label: "For brands" }} />
    </>
  );
}
