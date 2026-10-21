"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";

// Positions are percentages of the laptop lid. Stand-in art until new stickers arrive.
const PLACED = [
  { id: "sticker-12", x: 6, y: 8, w: 22, r: -8 },
  { id: "sticker-26", x: 62, y: 6, w: 17, r: 7 },
  { id: "sticker-19", x: 34, y: 14, w: 24, r: -3 },
  { id: "sticker-24", x: 78, y: 30, w: 15, r: 10 },
  { id: "sticker-10", x: 12, y: 44, w: 21, r: 6 },
  { id: "sticker-21", x: 44, y: 38, w: 20, r: -9 },
  { id: "sticker-08", x: 66, y: 50, w: 22, r: 4 },
  { id: "sticker-17", x: 4, y: 68, w: 19, r: -6 },
  { id: "sticker-06", x: 30, y: 62, w: 15, r: 8 },
  { id: "sticker-15", x: 50, y: 66, w: 23, r: -4 },
  { id: "sticker-29", x: 80, y: 68, w: 15, r: 9 },
  { id: "sticker-03", x: 24, y: 30, w: 15, r: -11 },
  { id: "sticker-23", x: 56, y: 24, w: 15, r: 5 },
  { id: "sticker-32", x: 74, y: 8, w: 18, r: -5 },
] as const;

const START = 0.1;
const STEP = 0.058;

function Placed({
  s,
  i,
  progress,
  still,
}: {
  s: (typeof PLACED)[number];
  i: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const a = START + i * STEP;
  const scale = useTransform(progress, [a, a + 0.045], [2.4, 1]);
  const opacity = useTransform(progress, [a, a + 0.012], [0, 1]);
  const drop = useTransform(progress, [a, a + 0.045], [-80, 0]);
  const spin = useTransform(progress, [a, a + 0.045], [s.r - 30, s.r]);
  const [w, h] = stickerSize[s.id] ?? [1, 1];
  return (
    <motion.img
      src={stickerSrc(s.id)}
      alt=""
      width={w}
      height={h}
      draggable={false}
      className="sticker-shadow absolute h-auto"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.w}%`,
        ...(still ? { rotate: s.r } : { scale, opacity, y: drop, rotate: spin }),
      }}
    />
  );
}

/**
 * A pinned section: as you scroll, stickers slap onto a blank laptop lid.
 * With reduced motion the section is not pinned and the lid is already covered.
 */
export function LaptopScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const count = useTransform(scrollYProgress, (v) =>
    Math.min(PLACED.length, Math.max(0, Math.floor((v - START) / STEP) + 1)),
  );

  return (
    <section
      ref={ref}
      aria-labelledby="cover-title"
      className={reduce ? "py-24" : "relative h-[300vh] overflow-x-clip"}
    >
      <div
        className={
          reduce
            ? "container-x grid items-center gap-12 lg:grid-cols-12"
            : "container-x sticky top-0 grid h-dvh content-center items-center gap-8 lg:grid-cols-12"
        }
      >
        <div className="lg:col-span-5">
          <p className="label text-mute">
            <span className="text-lemon">Scroll</span> · make it yours
          </p>
          <h2 id="cover-title" className="display mt-5 text-[clamp(3rem,9vw,8.5rem)]">
            Cover <span className="text-lemon">it.</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg text-paper/75">
            A blank laptop is a blank page. Every sticker you add says a bit more about you.
          </p>
          {!reduce && (
            <p className="label mt-6 text-mute" aria-hidden="true">
              <motion.span className="text-lemon">{count}</motion.span> / {PLACED.length}
            </p>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto w-full max-w-3xl" aria-hidden="true">
            <div className="relative aspect-[800/520] rounded-[1.4rem] bg-gradient-to-br from-[#262626] to-[#161616] shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-line">
              {PLACED.map((s, i) => (
                <Placed key={s.id} s={s} i={i} progress={scrollYProgress} still={reduce} />
              ))}
            </div>
            <div className="mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-[1.2rem] bg-gradient-to-b from-[#2c2c2c] to-[#1a1a1a]" />
          </div>
        </div>
      </div>
    </section>
  );
}
