"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { LoopVideo } from "./loop-video";
import { StickerBoard } from "./sticker-board";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[40rem] items-end overflow-hidden pb-10 pt-28 md:min-h-[100svh] md:pb-14"
    >
      {/* Real footage from a stall. Wide crop on desktop, the vertical clip on phones. */}
      <div className="absolute inset-0 -z-10">
        <LoopVideo
          src="/media/stall/hero-wide.mp4"
          av1="/media/stall/hero-wide.av1.mp4"
          poster="/media/stall/hero-wide.webp"
          alt="Students crowding around a Stix N Vibes sticker stall at a college in Goa"
          className="hidden size-full md:block"
        />
        <LoopVideo
          src="/media/stall/hero-tall.mp4"
          av1="/media/stall/hero-tall.av1.mp4"
          poster="/media/stall/hero-tall.webp"
          alt="Students crowding around a Stix N Vibes sticker stall at a college in Goa"
          className="size-full md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_30%,rgb(7_7_7/0.6))]" />
      </div>

      <div className="container-x relative w-full">
        <p className="label fade-up glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-paper/90" style={{ ["--d" as string]: "100ms" }}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lemon opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-lemon" />
          </span>
          Student-led sticker stall · Goa
        </p>

        <h1 id="hero-title" className="display mt-6 text-[clamp(3.6rem,13vw,13.5rem)]">
          <span className="rise-line">
            <span style={{ ["--d" as string]: "150ms" }}>Your stickers.</span>
          </span>
          <span className="rise-line">
            <span style={{ ["--d" as string]: "280ms" }}>
              Your <span className="text-lemon">vibe.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <div className="fade-up max-w-md" style={{ ["--d" as string]: "450ms" }}>
            <p className="text-lg leading-relaxed text-paper/85">
              Waterproof stickers, peel-to-paste posters, Framez and cards. Cut live at our stalls,
              dispatched the next day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#products" className="btn btn-primary">
                See what we make
                <span aria-hidden="true">↓</span>
              </Link>
              <a href={site.shop} target="_blank" rel="noopener" className="btn btn-ghost glass">
                Shop
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
          <p className="label fade-up hidden items-center gap-3 text-paper/70 md:flex" style={{ ["--d" as string]: "700ms" }}>
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full ring-1 ring-paper/30">
              ✋
            </span>
            <span>
              Peel one off.
              <br />
              Stick it anywhere.
            </span>
          </p>
        </div>
      </div>

      <StickerBoard hero={ref} />
    </section>
  );
}
