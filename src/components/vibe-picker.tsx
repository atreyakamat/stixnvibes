"use client";

import { useState } from "react";
import { site, stickerSrc } from "@/content/site";
import { stickerSize } from "@/content/stickers";
import { vibes } from "@/content/vibes";

export function VibePicker() {
  const [active, setActive] = useState(0);
  const vibe = vibes[active];

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
          {/* Instagram DM links cannot prefill a message, so the label names the vibe instead. */}
          <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-primary">
            Ask about {vibe.name} on Instagram
          </a>
          <a href={site.shop} target="_blank" rel="noopener" className="btn btn-ghost">
            Browse the shop
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-line bg-surface/40">
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-colors duration-700"
            style={{ backgroundColor: vibe.tint }}
          />
          {/* Keyed so each pick replays the CSS drop-in. */}
          <div key={vibe.id} className="absolute inset-0" aria-hidden="true">
            {vibe.stickers.map((s, i) => {
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
                  className="sticker-shadow vibe-drop absolute h-auto"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.w * 0.76}%`,
                    rotate: `${s.r}deg`,
                    ["--r" as string]: `${s.r}deg`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>
        <p className="label mt-3 text-mute">Every sticker shown is a real design. Ask for the set on Instagram.</p>
      </div>
    </div>
  );
}
