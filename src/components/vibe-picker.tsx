"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { site, stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";
import { vibes } from "@/content/vibes";

export function VibePicker() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const vibe = vibes[active];
  const message = encodeURIComponent(
    `Hi Stix N Vibes! I like the ${vibe.name} vibe. Can you tell me what you have in it?`,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div role="radiogroup" aria-label="Pick a vibe" className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {vibes.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={i === active}
              onClick={() => setActive(i)}
              className={`display text-left text-[clamp(2rem,5vw,4.5rem)] transition-colors ${
                i === active ? "text-lemon" : "text-paper/35 hover:text-paper/80"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
        <p className="mt-6 max-w-sm text-lg text-paper/75" aria-live="polite">
          {vibe.line}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`${site.contact.whatsapp}?text=${message}`}
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            Ask about {vibe.name}
          </a>
          <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-ghost">
            DM on Instagram
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-line bg-surface/40">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{ backgroundColor: vibe.tint }}
            transition={{ duration: reduce ? 0 : 0.6 }}
          />
          <AnimatePresence>
            <motion.div key={vibe.id} className="absolute inset-0" aria-hidden="true">
              {vibe.stickers.map((s, i) => {
                const [w, h] = stickerSize[s.id] ?? [1, 1];
                return (
                  <motion.img
                    key={s.id}
                    src={stickerSrc(s.id)}
                    alt=""
                    width={w}
                    height={h}
                    draggable={false}
                    className="sticker-shadow absolute h-auto"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w * 0.76}%` }}
                    initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: s.r - 40, y: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: s.r, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: reduce ? 0 : 0.2 } }}
                    transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="label mt-3 text-mute">Collections in the works. Artwork shown is a preview.</p>
      </div>
    </div>
  );
}
