"use client";

import { useId, useState } from "react";
import { bulkTiers, site } from "@/content/site";

const MIN = bulkTiers[0].min;
const MAX = 3000;
const BIG_EXTRA = 3;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Live price check for the bulk page. Mirrors bulkTiers and the "+₹3 above
// 5 cm" rule in bulkTerms, so change those and this follows.
export function BulkEstimator() {
  const id = useId();
  const [qty, setQty] = useState(300);
  const [big, setBig] = useState(false);

  const tier = [...bulkTiers].reverse().find((t) => qty >= t.min) ?? bulkTiers[0];
  const each = tier.each + (big ? BIG_EXTRA : 0);
  const total = each * qty;
  const next = bulkTiers.find((t) => t.min > qty);

  return (
    <div className="ice rounded-[1.5rem] p-6 md:p-10">
      <label htmlFor={`${id}-qty`} className="label text-mute">
        How many stickers?
      </label>
      <div className="mt-4 flex items-end justify-between gap-4">
        <output htmlFor={`${id}-qty`} className="display text-6xl md:text-7xl">
          {qty.toLocaleString("en-IN")}
        </output>
        <input
          type="number"
          inputMode="numeric"
          min={MIN}
          max={MAX}
          step={50}
          value={qty}
          onChange={(e) => setQty(Math.max(MIN, Math.min(MAX, Number(e.target.value) || MIN)))}
          aria-label="Quantity"
          className="w-28 rounded-full border border-line bg-transparent px-4 py-2 text-right text-paper"
        />
      </div>
      <input
        id={`${id}-qty`}
        type="range"
        min={MIN}
        max={MAX}
        step={50}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="mt-6 w-full accent-lemon"
      />

      <label className="mt-6 flex cursor-pointer items-center gap-3 text-paper/85">
        <input type="checkbox" checked={big} onChange={(e) => setBig(e.target.checked)} className="size-5 accent-lemon" />
        Bigger than 5 cm
      </label>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] border border-line bg-line">
        <div className="bg-ink p-5">
          <dt className="label text-mute">Per sticker</dt>
          <dd className="display mt-2 text-4xl text-lemon">{inr(each)}</dd>
        </div>
        <div className="bg-ink p-5">
          <dt className="label text-mute">Estimate</dt>
          <dd className="display mt-2 text-4xl">{inr(total)}</dd>
        </div>
      </dl>

      <p className="mt-5 min-h-6 text-sm text-paper/70" aria-live="polite">
        {next
          ? `Order ${(next.min - qty).toLocaleString("en-IN")} more and it drops to ${inr(next.each + (big ? BIG_EXTRA : 0))} each.`
          : "You are on our best price."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-primary">
          DM us this quote
        </a>
        <a href="#brief" className="btn btn-ghost">
          Send a brief
        </a>
      </div>
      <p className="mt-4 text-xs text-mute">Estimate only. Final price comes with your free proof.</p>
    </div>
  );
}
