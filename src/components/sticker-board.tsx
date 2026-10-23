"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";

// Start spots as a share of the hero box. `w` is the width in rem.
const START = [
  { id: "lofi-14", x: 0.72, y: 0.16, r: 9, w: 9.5, m: [0.3, 0.12] },
  { id: "lofi-06", x: 0.88, y: 0.42, r: -8, w: 6.5, m: [0.56, 0.11] },
  { id: "lofi-16", x: 0.6, y: 0.5, r: -6, w: 8 },
  { id: "lofi-10", x: 0.82, y: 0.7, r: 7, w: 8.5, m: [0.75, 0.17] },
  { id: "lofi-09", x: 0.46, y: 0.12, r: -4, w: 8 },
  { id: "lofi-05", x: 0.3, y: 0.12, r: 5, w: 8, m: [0.04, 0.15] },
] as const;

type Spot = { id: string; x: number; y: number; r: number; w: number; moved: boolean };

/**
 * Real stickers sit on the hero. Grab one, it peels up; let go, it sticks
 * wherever you dropped it on the page and stays there while you scroll.
 * Pure pointer events and transforms, no physics engine.
 */
export function StickerBoard({ hero }: { hero: RefObject<HTMLElement | null> }) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [stuck, setStuck] = useState(0);
  const z = useRef(1);

  // Place stickers relative to the hero, and keep unmoved ones in place on resize.
  useEffect(() => {
    const place = () => {
      const el = hero.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const small = window.innerWidth < 768;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      setSpots((prev) => {
        const list = START.filter((s) => !small || "m" in s);
        return list.map((s) => {
          const old = prev.find((p) => p.id === s.id);
          const w = (small ? s.w * 0.62 : s.w) * rem;
          if (old?.moved) {
            return { ...old, w, x: Math.min(old.x, window.innerWidth - w) };
          }
          return {
            id: s.id,
            r: s.r,
            w,
            x: Math.min(rect.left + rect.width * (small && "m" in s ? s.m[0] : s.x), window.innerWidth - w - 8),
            y: top + rect.height * (small && "m" in s ? s.m[1] : s.y),
            moved: false,
          };
        });
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [hero]);

  // Spots only exist after mount, so `document` is safe to use here.
  if (!spots.length) return null;

  return createPortal(
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-40 h-0">
      {spots.map((s) => (
        <Peelable
          key={s.id}
          spot={s}
          lift={() => ++z.current}
          onStick={(x, y) => {
            setSpots((all) => all.map((p) => (p.id === s.id ? { ...p, x, y, moved: true } : p)));
            setStuck((n) => n + 1);
          }}
        />
      ))}
      {stuck > 0 && (
        <p
          key={stuck}
          className="label toast fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-lemon px-4 py-2 text-ink"
        >
          {stuck === 1 ? "Stuck. Literally." : `${stuck} stuck. Keep going.`}
        </p>
      )}
    </div>,
    document.body,
  );
}

function Peelable({
  spot,
  lift,
  onStick,
}: {
  spot: Spot;
  lift: () => number;
  onStick: (x: number, y: number) => void;
}) {
  const el = useRef<HTMLImageElement>(null);
  const drag = useRef<{ dx: number; dy: number; x: number; y: number; moved: boolean } | null>(null);
  const [w, h] = stickerSize[spot.id] ?? [1, 1];

  const setPos = (x: number, y: number, extra = "") => {
    if (el.current) el.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${spot.r}deg) ${extra}`;
  };

  return (
    <img
      ref={el}
      src={stickerSrc(spot.id)}
      alt=""
      width={w}
      height={h}
      draggable={false}
      className="peelable pointer-events-auto absolute left-0 top-0 h-auto cursor-grab touch-none select-none"
      style={{
        width: spot.w,
        transform: `translate3d(${spot.x}px, ${spot.y}px, 0) rotate(${spot.r}deg)`,
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.style.zIndex = String(lift());
        e.currentTarget.dataset.state = "peel";
        drag.current = {
          dx: e.pageX - spot.x,
          dy: e.pageY - spot.y,
          x: spot.x,
          y: spot.y,
          moved: false,
        };
        setPos(spot.x, spot.y, "scale(1.12) rotate(4deg)");
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const max = window.innerWidth - spot.w;
        d.x = Math.max(0, Math.min(e.pageX - d.dx, max));
        d.y = Math.max(0, e.pageY - d.dy);
        d.moved = true;
        setPos(d.x, d.y, "scale(1.12) rotate(4deg)");
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
        e.currentTarget.dataset.state = "stick";
        if (!d) return;
        setPos(d.x, d.y);
        if (d.moved) onStick(d.x, d.y);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setPos(spot.x, spot.y);
        if (el.current) el.current.dataset.state = "";
      }}
    />
  );
}
