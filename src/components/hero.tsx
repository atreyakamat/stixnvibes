"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { stickerSrc } from "@/content/site";
import { HeroPeel } from "./hero-peel";
import { HeroVideo } from "./hero-video";
import { ImageTrail } from "./image-trail";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const frameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const stickerA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const stickerB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -260]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden pt-24 md:pt-32">
      <ImageTrail />

      <div className="container-x relative">
        <p className="label fade-up flex items-center gap-3 text-mute" style={{ ["--d" as string]: "100ms" }}>
          <span className="inline-block size-2 rounded-full bg-lemon" aria-hidden="true" />
          Student-led sticker studio · Goa
        </p>

        <h1 id="hero-title" className="display mt-6 text-[clamp(3.6rem,14.5vw,15rem)]">
          <span className="rise-line">
            <span style={{ ["--d" as string]: "150ms" }}>Your stickers.</span>
          </span>
          <span className="rise-line">
            <span style={{ ["--d" as string]: "280ms" }}>
              Your <span className="text-lemon">vibe.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <motion.div
            style={{ scale: frameScale, y: frameY }}
            className="ice fade-up relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/9] lg:col-span-8"
          >
            <HeroPeel>
              <HeroVideo />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </HeroPeel>
          </motion.div>

          <div className="fade-up lg:col-span-4 lg:pb-4" style={{ ["--d" as string]: "450ms" }}>
            <p className="max-w-md text-lg leading-relaxed text-paper/80">
              Waterproof stickers, peel-to-paste posters and Framez for people who want their stuff to
              look like them. Made in Goa, dispatched in 2 days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#products" className="btn btn-primary">
                See what we make
                <span aria-hidden="true">↓</span>
              </Link>
              <Link href="/custom/" className="btn btn-ghost">
                Make it custom
              </Link>
              <a href="https://shop.stixnvibes.com" target="_blank" rel="noopener" className="btn btn-ghost">
                Shop
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Real sticker art layered over the frame edge for depth. */}
      <motion.img
        src={stickerSrc("sticker-09")}
        alt=""
        aria-hidden="true"
        width={418}
        height={382}
        style={{ y: stickerA, ["--r" as string]: "8deg", ["--d" as string]: "700ms" }}
        className="sticker-shadow drop-in pointer-events-none absolute right-[4%] top-[38%] z-10 hidden w-[clamp(7rem,11vw,11rem)] rotate-[8deg] lg:block"
      />
      <motion.img
        src={stickerSrc("sticker-30")}
        alt=""
        aria-hidden="true"
        width={288}
        height={367}
        style={{ y: stickerB, ["--r" as string]: "-10deg", ["--d" as string]: "850ms" }}
        className="sticker-shadow drop-in pointer-events-none absolute bottom-[2%] right-[4%] z-10 w-[clamp(5.5rem,10vw,9.5rem)] -rotate-[10deg] lg:bottom-[6%] lg:left-[1%] lg:right-auto"
      />
    </section>
  );
}
