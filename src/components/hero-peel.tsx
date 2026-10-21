"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { peelShapes, toPolygon } from "@/lib/peel";
import { stickerSrc } from "@/content/site";

const SHEET = [
  ["sticker-12", -6],
  ["sticker-26", 5],
  ["sticker-19", -3],
  ["sticker-24", 8],
  ["sticker-10", 4],
  ["sticker-21", -7],
  ["sticker-08", 3],
  ["sticker-17", -5],
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A sheet of real stickers sits over the hero scene. Drag the bottom-right
 * corner (or press the button) to peel it back and reveal what is underneath.
 * `children` is the scene; it stays fully usable if the peel never runs.
 */
export function HeroPeel({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const t = useMotionValue(0);
  const [tv, setTv] = useState(0);
  const dragging = useRef(false);
  const reduce = useReducedMotion();
  const peeled = tv > 0.9;

  useMotionValueEvent(t, "change", setTv);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // One small curl on load so people see the corner lift.
  useEffect(() => {
    if (reduce) return;
    const a = animate(t, [0, 0.07, 0], { duration: 1.8, delay: 1.4, ease: "easeInOut" });
    return () => a.stop();
  }, [reduce, t]);

  const to = (target: number) =>
    animate(t, target, reduce ? { duration: 0 } : { duration: 0.8, ease: EASE });

  const fromPointer = (e: PointerEvent<HTMLElement>) => {
    const rect = host.current?.getBoundingClientRect();
    if (!rect) return;
    const c = e.clientX - rect.left + (e.clientY - rect.top);
    t.set(Math.min(Math.max(1 - c / (rect.width + rect.height), 0), 0.98));
  };

  const shapes = size.w ? peelShapes(size.w, size.h, tv) : null;

  return (
    <div ref={host} className="absolute inset-0 overflow-hidden">
      {/* Scene underneath */}
      <div className="absolute inset-0">{children}</div>
      <p className="label absolute bottom-5 left-5 z-[5] text-paper/80">Make it stick. Literally.</p>

      {/* Sticker sheet, clipped to the part that is still stuck down */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[#f1efe4]"
        style={shapes ? { clipPath: toPolygon(shapes.stuck) } : undefined}
      >
        <div className="grid size-full grid-cols-4 grid-rows-2 gap-[2%] p-[4%] pb-[6%]">
          {SHEET.map(([id, rot]) => (
            <div key={id} className="grid place-items-center">
              <img
                src={stickerSrc(id)}
                alt=""
                draggable={false}
                className="sticker-shadow max-h-full w-[88%] object-contain"
                style={{ transform: `rotate(${rot}deg)` }}
              />
            </div>
          ))}
        </div>
        <p className="label absolute bottom-4 left-5 text-ink/60">Peel the sheet ↘</p>
      </div>

      {/* The lifted back of the sheet */}
      {shapes && shapes.flap.length > 2 && tv < 0.97 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{ filter: "drop-shadow(-6px -6px 14px rgb(0 0 0 / 0.45))" }}
        >
          <div
            className="size-full"
            style={{
              clipPath: toPolygon(shapes.flap),
              background: "linear-gradient(135deg, #bdb9a8 0%, #e9e6d9 55%, #f6f4ea 100%)",
            }}
          />
        </div>
      )}

      {/* Handle: drag with a pointer, or press Enter / Space */}
      <button
        type="button"
        aria-pressed={peeled}
        aria-label={peeled ? "Stick the sheet back down" : "Peel back the sticker sheet"}
        onClick={() => {
          if (dragging.current) return;
          to(peeled ? 0 : 1);
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = false;
        }}
        onPointerMove={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
          dragging.current = true;
          fromPointer(e);
        }}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          if (dragging.current) {
            to(t.get() > 0.3 ? 1 : 0);
            // Let the click that follows pointerup see the drag flag first.
            setTimeout(() => (dragging.current = false), 0);
          }
        }}
        className="absolute bottom-0 right-0 z-30 flex size-24 touch-none items-end justify-end p-3 text-xs font-medium"
      >
        <span
          className="pointer-events-none whitespace-nowrap rounded-full bg-ink/85 px-3 py-1.5 text-paper ring-1 ring-paper/25 backdrop-blur"
        >
          {peeled ? "Stick it back" : "Peel"}
        </span>
      </button>
    </div>
  );
}
