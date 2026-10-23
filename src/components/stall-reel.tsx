"use client";

import { useEffect, useRef, useState } from "react";
import { site, stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { LoopVideo } from "./loop-video";

// Stickers slap onto the reel as you scroll, in this order, and stay stuck.
// `at` is scroll progress through the section; x/y place the sticker's centre
// relative to the phone frame.
const STICKERS = [
  { at: 0.12, kind: "art", id: "lofi-14", x: -6, y: 14, w: 34, r: -12 },
  { at: 0.22, kind: "text", text: "Cut live", x: 104, y: 22, r: 8 },
  { at: 0.32, kind: "art", id: "lofi-05", x: 108, y: 58, w: 30, r: 10 },
  { at: 0.42, kind: "text", text: "Cash or UPI", x: 2, y: 50, r: -7 },
  { at: 0.52, kind: "art", id: "lofi-16", x: -6, y: 86, w: 32, r: 6 },
  { at: 0.62, kind: "text", text: "Next-day dispatch", x: 96, y: 90, r: -5 },
] as const;

const LINES = ["Pull up", "to the", "stall."];

/**
 * The stall reel, pinned while you scroll past it. The phone frame grows to
 * full size, the headline lights up line by line and stickers slap onto the
 * frame. Reduced motion gets the finished state with no pinning.
 */
export function StallReel() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stuck, setStuck] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const el = section.current;
    const fr = frame.current;
    if (reduce || !el || !fr) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      const grow = Math.min(p / 0.3, 1);
      fr.style.setProperty("--grow", String(grow));
      // Once a sticker is stuck it stays stuck, even when scrolling back up.
      const n = STICKERS.filter((s) => p >= s.at).length;
      setStuck((c) => Math.max(c, n));
      setLine(Math.min(LINES.length, Math.floor(p / 0.12) + 1));
    };

    const onScroll = () => (raf ||= requestAnimationFrame(update));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const shown = reduce ? STICKERS.length : stuck;
  const lit = reduce ? LINES.length : line;

  return (
    <section
      ref={section}
      aria-labelledby="reel-title"
      className={reduce ? "py-28 md:py-40" : "relative h-[240vh] md:h-[260vh]"}
    >
      <div
        className={
          reduce
            ? "container-x"
            : "container-x sticky top-0 flex h-dvh items-center overflow-x-clip pt-20 pb-6 md:pt-24 md:pb-10"
        }
      >
        <div className="grid w-full items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="label flex items-center gap-3 text-mute">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
              </span>
              Live at every stall
            </p>
            <h2 id="reel-title" className="display mt-4 text-[clamp(2.6rem,11vw,12rem)] md:mt-6">
              {LINES.map((l, i) => (
                <span
                  key={l}
                  className={`transition-colors duration-500 md:block ${
                    i < lit ? (i === LINES.length - 1 ? "text-lemon" : "text-paper") : "text-paper/15"
                  }`}
                >
                  {l}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-6 hidden max-w-md text-lg leading-relaxed text-paper/75 md:block">
              Tables full of designs, a crowd that won&apos;t leave and a Cricut cutting stickers
              while you wait. Pay by cash or UPI and walk away with your vibe.
            </p>
            <div className="mt-8 hidden flex-wrap gap-3 md:flex">
              <a href={site.contact.instagram} target="_blank" rel="noopener" className="btn btn-primary">
                Follow {site.contact.instagramHandle}
                <span aria-hidden="true">↗</span>
              </a>
              <a href="#find-us" className="btn btn-ghost">
                Find the next stall
              </a>
            </div>
          </div>

          <div className="flex justify-center md:col-span-6">
            <div
              ref={frame}
              className="reel-frame relative aspect-[9/16] h-[min(58dvh,32rem)] md:h-[min(76dvh,48rem)]"
            >
              <div className="glass size-full overflow-hidden rounded-[2.25rem] p-2 md:rounded-[2.75rem] md:p-2.5">
                <LoopVideo
                  src="/media/stall/reel.mp4"
                  av1="/media/stall/reel.av1.mp4"
                  poster="/media/stall/reel.webp"
                  alt="A Stix N Vibes stall at a college event in Goa, packed with students picking stickers and posters"
                  className="size-full rounded-[1.8rem] bg-surface md:rounded-[2.25rem]"
                />
              </div>

              {STICKERS.map((s, i) => {
                const style = {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  ["--r" as string]: `${s.r}deg`,
                };
                const state = i < shown ? { "data-stuck": "" } : {};
                if (s.kind === "text") {
                  return (
                    <span
                      key={s.text}
                      aria-hidden="true"
                      className="slap text-sticker display absolute whitespace-nowrap text-[clamp(1rem,2.4vw,1.75rem)]"
                      style={style}
                      {...state}
                    >
                      {s.text}
                    </span>
                  );
                }
                const [w, h] = stickerSize[s.id] ?? [1, 1];
                return (
                  <img
                    key={s.id}
                    src={stickerSrc(s.id)}
                    alt=""
                    width={w}
                    height={h}
                    loading="lazy"
                    draggable={false}
                    className="slap sticker-shadow absolute h-auto"
                    style={{ ...style, width: `${s.w}%` }}
                    {...state}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:hidden">
            <a href={site.contact.instagram} target="_blank" rel="noopener" className="btn btn-primary">
              Follow {site.contact.instagramHandle}
            </a>
            <a href="#find-us" className="btn btn-ghost">
              Next stall
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
