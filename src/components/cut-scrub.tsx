"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const FRAMES = 72;
const frameSrc = (i: number) => `/media/cut/f-${String(i + 1).padStart(3, "0")}.webp`;

const STEPS = [
  { at: 0, title: "Print", body: "Your design goes down on waterproof paper vinyl." },
  { at: 0.3, title: "Cut", body: "The Cricut traces every edge. Die cut, kiss cut, any shape." },
  { at: 0.6, title: "Peel", body: "We weed the sheet by hand, right at the stall." },
  { at: 0.85, title: "Stick", body: "It's yours. Laptop, bottle, helmet, wall." },
];

/**
 * Scroll drives a real clip of our Cricut cutting stickers, drawn frame by
 * frame on a canvas. Frames load only when the section gets close.
 */
export function CutScrub() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = section.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = -1;

    const draw = (index: number) => {
      // Fall back to the nearest frame that has already arrived.
      for (let d = 0; d < FRAMES; d++) {
        for (const i of [index - d, index + d]) {
          const img = images.current[i];
          if (img?.complete && img.naturalWidth) {
            if (cv.width !== img.naturalWidth) {
              cv.width = img.naturalWidth;
              cv.height = img.naturalHeight;
            }
            ctx.drawImage(img, 0, 0);
            return;
          }
        }
      }
    };

    const load = () => {
      if (images.current.length) return;
      images.current = Array.from({ length: FRAMES }, (_, i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(i);
        if (i === 0 || i === 40) img.onload = () => draw(reduce ? 40 : 0);
        return img;
      });
    };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      const index = Math.round(p * (FRAMES - 1));
      if (index !== last) {
        last = index;
        draw(index);
      }
      let s = 0;
      STEPS.forEach((st, i) => p >= st.at && (s = i));
      setStep(s);
    };

    const io = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "100% 0px" });
    io.observe(el);
    if (reduce) {
      load();
      return () => io.disconnect();
    }
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section
      ref={section}
      aria-labelledby="cut-title"
      className={reduce ? "py-28" : "relative h-[280vh] overflow-x-clip"}
    >
      <div className={reduce ? "container-x" : "container-x sticky top-0 flex h-dvh items-center"}>
        <div className="grid w-full items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <p className="label flex items-center gap-3 text-mute">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
              </span>
              Live at every stall
            </p>
            <h2 id="cut-title" className="display mt-5 text-[clamp(2.8rem,8vw,7.5rem)]">
              We cut it <span className="text-lemon">live.</span>
            </h2>
            <ol className="mt-6 grid gap-0 md:mt-8">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={`grid grid-cols-[3rem_1fr] items-baseline gap-2 border-t border-line py-2 md:py-3 transition-opacity duration-500 ${
                    reduce || i === step ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <span className="label text-lemon">0{i + 1}</span>
                  <span>
                    <span className="block text-xl font-semibold md:text-2xl">{s.title}</span>
                    <span className={`${reduce || i === step ? "block" : "hidden md:block"} text-paper/65`}>{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="glass relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-[1.75rem] p-2 md:max-w-sm">
              <canvas
                ref={canvas}
                role="img"
                aria-label="Our Cricut cutting a sheet of lotus and trishul stickers"
                className="size-full rounded-[1.35rem] bg-surface object-cover"
              />
              <span className="label absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 text-paper backdrop-blur">
                Real footage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
