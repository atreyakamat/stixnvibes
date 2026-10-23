import Link from "next/link";
import { Hero } from "@/components/hero";
import { FindUs } from "@/components/find-us";
import { StallReel } from "@/components/stall-reel";
import { InstagramLatest } from "@/components/instagram-latest";
import { ProofWall } from "@/components/proof-wall";
import { Reveal } from "@/components/reveal";
import { StickerMarquee } from "@/components/sticker-marquee";
import { StickerGravity } from "@/components/sticker-gravity";
import { VibePicker } from "@/components/vibe-picker";
import { CtaBand, FaqList, ProductGrid, SectionLabel, Sticker } from "@/components/ui";
import { brandUseCases, customServices, process, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <StickerMarquee />

      {/* 01 Statement + physics pile */}
      <section aria-labelledby="statement" className="pt-28 md:pt-44">
        <div className="container-x">
          <SectionLabel index="01">Why stickers</SectionLabel>
          <Reveal>
            <h2 id="statement" className="display mt-6 max-w-[14ch] text-[clamp(2.8rem,8.5vw,8rem)]">
              Stickers should <span className="mark text-ink">say</span> something.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:col-start-8">
              <p className="text-lg leading-relaxed text-paper/75">
                A sticker is a tiny flag. It says what you like, what you laugh at and who your people
                are. We make the ones worth putting on your laptop, your bottle and your helmet.
              </p>
              <p className="label mt-6 text-mute motion-reduce:hidden">
                <span className="hidden pointer-fine:inline">Grab a sticker. Throw it.</span>
                <span className="pointer-fine:hidden">Tap a sticker.</span>
              </p>
            </Reveal>
          </div>
        </div>
        <div className="container-x mt-4">
          <div className="rounded-[2rem] border border-line bg-surface/30">
            <StickerGravity />
          </div>
        </div>
      </section>

      <StallReel />

      {/* 02 Products */}
      <section id="products" aria-labelledby="products-title" className="scroll-mt-24 pt-28 md:pt-40">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel index="02">What we make</SectionLabel>
              <Reveal>
                <h2 id="products-title" className="display mt-6 text-[clamp(2.8rem,8vw,7.5rem)]">
                  One vibe.
                  <br />
                  Many surfaces.
                </h2>
              </Reveal>
            </div>
            <Reveal className="max-w-sm text-paper/70">
              Stickers are where we started. Now there are peel-to-paste posters, Framez, art cards
              and music cards too.
            </Reveal>
          </div>
          <div className="mt-12">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Proof: real stall clips */}
      <section aria-labelledby="proof-title" className="overflow-x-clip pt-28 md:pt-40">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="proof-title" className="display text-[clamp(2.8rem,8vw,7.5rem)]">
              Goa queues
              <br />
              for <span className="text-lemon">this.</span>
            </h2>
            <Reveal className="max-w-sm text-paper/70">
              College fests, weekend stalls, every one of them packed. Real clips, no actors.
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <ProofWall />
          </div>
        </div>
      </section>

      {/* 03 Pick your vibe */}
      <section id="vibes" aria-labelledby="vibes-title" className="scroll-mt-24 pt-28 md:pt-40">
        <div className="container-x">
          <SectionLabel index="03">Pick your vibe</SectionLabel>
          <Reveal>
            <h2 id="vibes-title" className="display mt-6 mb-12 text-[clamp(2.8rem,8vw,7.5rem)]">
              What&apos;s your <span className="text-lemon">mood?</span>
            </h2>
          </Reveal>
          <VibePicker />
        </div>
      </section>

      {/* 03 Custom */}
      <section aria-labelledby="custom-title" className="pt-20 md:pt-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="04">Custom</SectionLabel>
            <Reveal>
              <h2 id="custom-title" className="display mt-6 text-[clamp(2.8rem,8vw,7.5rem)]">
                Turn your idea into a <span className="text-lemon">sticker.</span>
              </h2>
            </Reveal>
            <Reveal className="mt-6 max-w-md text-lg text-paper/75">
              Bring a drawing, a logo, a meme or just a feeling. We help you make it real.
            </Reveal>
            <Reveal className="mt-8">
              <Link href="/custom/#try" className="btn btn-primary">
                Try it on your artwork
              </Link>
            </Reveal>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:col-span-6">
            {customServices.map((s, i) => (
              <li key={s.title} className="bg-ink p-6 md:p-8">
                <span className="label text-lemon">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-paper/65">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-x mt-20">
          <ol className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90}>
                <span className="display text-6xl text-lemon">{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-paper/65">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 For brands: the one lemon moment */}
      <section aria-labelledby="brands-title" className="pt-28 md:pt-40">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-lemon px-6 py-14 text-ink md:px-14 md:py-20">
            <div className="relative z-10 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="label flex items-center gap-3 text-ink/70">
                  <span>05</span>
                  <span className="h-px w-8 bg-ink/30" aria-hidden="true" />
                  For brands
                </p>
                <h2 id="brands-title" className="display mt-6 text-[clamp(2.8rem,7.5vw,7rem)]">
                  Custom stickers for your next drop.
                </h2>
                <p className="mt-6 max-w-lg text-lg text-ink/75">
                  Packaging, events, cafés, bands and college fests. Tell us what you need and we
                  reply with options for your project.
                </p>
                <Link
                  href="/brands/"
                  className="btn mt-8 bg-ink text-paper hover:bg-surface focus-visible:outline-ink"
                >
                  Start a brand enquiry
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <ul className="flex flex-wrap content-start gap-2 lg:col-span-5 lg:pt-16">
                {brandUseCases.map((u) => (
                  <li key={u.title} className="rounded-full border border-ink/25 px-4 py-2 font-medium">
                    {u.title}
                  </li>
                ))}
              </ul>
            </div>
            <Sticker id="lofi-15" rotate={-8} className="absolute -bottom-10 right-6 hidden w-56 lg:block" />
          </div>
        </div>
      </section>

      {/* 06 Find us */}
      <section id="find-us" aria-labelledby="find-title" className="scroll-mt-24 pt-28 md:pt-40">
        <div className="container-x">
          <SectionLabel index="06">Find us</SectionLabel>
          <Reveal>
            <h2 id="find-title" className="display mt-6 mb-12 text-[clamp(2.8rem,8vw,7.5rem)]">
              Catch us in <span className="text-lemon">Goa.</span>
            </h2>
          </Reveal>
          <FindUs />
          <InstagramLatest />
        </div>
      </section>

      {/* 07 About */}
      <section aria-labelledby="about-title" className="pt-28 md:pt-40">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="relative order-2 aspect-square max-w-md lg:order-1 lg:col-span-5">
            <Sticker id="lofi-09" rotate={-6} className="absolute left-[4%] top-[6%] w-[52%]" />
            <Sticker id="lofi-01" rotate={9} className="absolute right-[2%] top-[22%] w-[46%]" />
            <Sticker id="lofi-05" rotate={-12} className="absolute bottom-[2%] left-[24%] w-[44%]" />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionLabel index="07">Who we are</SectionLabel>
            <Reveal>
              <h2 id="about-title" className="display mt-6 text-[clamp(2.8rem,8vw,7.5rem)]">
                {site.origin}
              </h2>
            </Reveal>
            <Reveal className="mt-6 max-w-lg space-y-4 text-lg text-paper/75">
              <p>
                Stix N Vibes is a student-led startup started by Atreya Kamat and Kritik Sawant. We
                wanted stickers, so we built a business out of it. We sell face to face at pop-ups
                around Goa and cut stickers live at the stall.
              </p>
              <p>We think the things you carry every day should look like you.</p>
            </Reveal>
            <Reveal className="mt-8">
              <Link href="/about/" className="btn btn-ghost">
                Read our story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 FAQ */}
      <section aria-labelledby="faq-title" className="pt-28 md:pt-40">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="08">Questions</SectionLabel>
            <h2 id="faq-title" className="display mt-6 text-6xl md:text-7xl">
              Good to know
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
