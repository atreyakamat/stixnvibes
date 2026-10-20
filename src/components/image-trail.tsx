"use client";

import { useEffect, useRef } from "react";
import { allStickers, stickerSrc } from "@/content/site";

// Leaves a short trail of real stickers behind the cursor (desktop only).
// Inspired by the Image Trail block on fancycomponents.dev.
export function ImageTrail({ threshold = 90, max = 9 }: { threshold?: number; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const area = host?.parentElement;
    if (!host || !area) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    // Warm the cache so the first stickers appear without a flash.
    allStickers.forEach((id) => {
      const img = new Image();
      img.src = stickerSrc(id);
    });

    let last = { x: 0, y: 0 };
    let index = 0;
    let started = false;

    const onMove = (e: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!started) {
        last = { x, y };
        started = true;
        return;
      }
      if (Math.hypot(x - last.x, y - last.y) < threshold) return;
      last = { x, y };

      const img = document.createElement("img");
      img.src = stickerSrc(allStickers[index++ % allStickers.length]);
      img.alt = "";
      img.draggable = false;
      img.className = "sticker-shadow pointer-events-none absolute w-28 select-none";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      const r = Math.random() * 30 - 15;
      host.appendChild(img);
      const anim = img.animate(
        [
          { transform: `translate(-50%,-50%) scale(0.4) rotate(${r - 20}deg)`, opacity: 0 },
          { transform: `translate(-50%,-50%) scale(1) rotate(${r}deg)`, opacity: 1, offset: 0.2 },
          { transform: `translate(-50%,-50%) scale(1) rotate(${r}deg)`, opacity: 1, offset: 0.7 },
          { transform: `translate(-50%,-40%) scale(0.85) rotate(${r + 6}deg)`, opacity: 0 },
        ],
        { duration: 1300, easing: "cubic-bezier(0.16,1,0.3,1)" },
      );
      anim.onfinish = () => img.remove();
      while (host.childElementCount > max) host.firstElementChild?.remove();
    };

    area.addEventListener("pointermove", onMove);
    return () => area.removeEventListener("pointermove", onMove);
  }, [threshold, max]);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />;
}
