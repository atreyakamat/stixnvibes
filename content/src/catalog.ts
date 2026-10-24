import { REELS, type Reel } from "./reels.ts";
import { SERIES_REELS } from "./series.ts";

export type CatalogReel = Reel & { id: string };

/** Composition id: day-01..day-30 for the challenge, r001..r100 for the series reels. */
export const reelId = (reel: Reel, index: number) =>
  reel.day ? `day-${String(reel.day).padStart(2, "0")}` : `r${String(index + 1).padStart(3, "0")}`;

export const CATALOG: CatalogReel[] = [
  ...REELS.map((r, i) => ({ ...r, id: reelId(r, i) })),
  ...SERIES_REELS.map((r, i) => ({ ...r, id: reelId(r, i) })),
];

export const findReel = (id: string) => {
  const reel = CATALOG.find((r) => r.id === id);
  if (!reel) throw new Error(`Unknown reel ${id}`);
  return reel;
};

/** A stable number per reel, used to vary decorations and music offsets. */
export const seedOf = (id: string) => [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
