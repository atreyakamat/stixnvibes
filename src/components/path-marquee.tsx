"use client";

import { useEffect, useId, useRef } from "react";

// Text that runs along a curved path. Inspired by "Marquee Along SVG Path" on
// fancycomponents.dev. Static when reduced motion is on.
export function PathMarquee({ items, speed = 60 }: { items: readonly string[]; speed?: number }) {
  const id = useId().replace(/:/g, "");
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTSpanElement>(null);

  useEffect(() => {
    const tp = textPathRef.current;
    const one = measureRef.current;
    if (!tp || !one) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let offset = 0;
    let last = performance.now();
    let visible = true;
    const length = one.getComputedTextLength();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(tp.ownerSVGElement!);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (visible && !document.hidden) {
        offset = (offset - speed * dt) % length;
        tp.setAttribute("startOffset", String(offset));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed]);

  const run = items.map((v) => `${v}  ✦  `).join("");

  return (
    <svg viewBox="0 0 1440 320" className="block h-auto w-full" aria-hidden="true">
      <path
        id={id}
        d="M-40 220 C 200 60, 420 60, 640 170 S 1080 300, 1480 110"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1"
      />
      <text className="display fill-paper" style={{ fontSize: 76 }}>
        <textPath ref={textPathRef} href={`#${id}`} startOffset="0">
          <tspan ref={measureRef}>{run}</tspan>
          <tspan className="fill-lemon">{run}</tspan>
          <tspan>{run}</tspan>
        </textPath>
      </text>
    </svg>
  );
}
