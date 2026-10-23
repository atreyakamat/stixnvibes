// Collections built from the current sticker designs in public/lofi. Each
// stage shows only stickers that belong to that collection.
export type Vibe = {
  id: string;
  name: string;
  line: string;
  // Low-opacity tint behind the stage. Lemon stays the only brand accent.
  tint: string;
  stickers: { id: string; x: number; y: number; r: number; w: number }[];
};

const LAYOUT = [
  { x: 6, y: 10, r: -6, w: 36 },
  { x: 52, y: 6, r: 7, w: 34 },
  { x: 16, y: 50, r: -9, w: 34 },
  { x: 58, y: 46, r: 5, w: 32 },
  { x: 36, y: 74, r: -3, w: 28 },
];

const stage = (ids: string[]) => ids.map((id, i) => ({ id, ...LAYOUT[i] }));

export const vibes: Vibe[] = [
  {
    id: "late-night",
    name: "Late Night",
    line: "Moonlit rooftops, glowing shopfronts and desks that never sleep.",
    tint: "rgb(88 110 190 / 0.18)",
    stickers: stage(["lofi-08", "lofi-09", "lofi-17", "lofi-11", "lofi-16"]),
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    line: "Sunsets, coast roads and cabins you want to move into.",
    tint: "rgb(230 140 60 / 0.16)",
    stickers: stage(["lofi-03", "lofi-04", "lofi-01", "lofi-02", "lofi-07"]),
  },
  {
    id: "soft-paws",
    name: "Soft Paws",
    line: "Sleepy cats, happy dogs and one cat in a bubble tea.",
    tint: "rgb(210 150 170 / 0.15)",
    stickers: stage(["lofi-05", "lofi-15", "lofi-06", "lofi-10", "lofi-12"]),
  },
  {
    id: "off-the-wall",
    name: "Off the Wall",
    line: "A skating skeleton, an astronaut on the moon. Weird in a good way.",
    tint: "rgb(215 255 63 / 0.1)",
    stickers: stage(["lofi-14", "lofi-13", "lofi-16", "lofi-02", "lofi-06"]),
  },
];
