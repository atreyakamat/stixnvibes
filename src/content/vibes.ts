// Collection concepts from the brand brief. Not live collections yet, and the
// sticker choices are stand-ins until the new artwork arrives.
export type Vibe = {
  id: string;
  name: string;
  line: string;
  // Low-opacity tint behind the stage. Lemon stays the only brand accent.
  tint: string;
  stickers: { id: string; x: number; y: number; r: number; w: number }[];
};

export const vibes: Vibe[] = [
  {
    id: "late-night",
    name: "Late Night",
    line: "For coders, students and dreamers who do not sleep.",
    tint: "rgb(88 110 190 / 0.16)",
    stickers: [
      { id: "lofi-08", x: 8, y: 14, r: -6, w: 34 },
      { id: "lofi-09", x: 50, y: 6, r: 8, w: 32 },
      { id: "lofi-16", x: 20, y: 50, r: -10, w: 36 },
      { id: "lofi-17", x: 62, y: 46, r: 6, w: 28 },
      { id: "lofi-11", x: 40, y: 74, r: -4, w: 30 },
    ],
  },
  {
    id: "street-mode",
    name: "Street Mode",
    line: "Loud, fast and made for helmets and skate decks.",
    tint: "rgb(200 140 60 / 0.14)",
    stickers: [
      { id: "lofi-14", x: 6, y: 10, r: -8, w: 40 },
      { id: "lofi-04", x: 52, y: 12, r: 7, w: 34 },
      { id: "lofi-13", x: 14, y: 52, r: 5, w: 30 },
      { id: "lofi-03", x: 54, y: 52, r: -6, w: 38 },
      { id: "lofi-07", x: 34, y: 76, r: 9, w: 28 },
    ],
  },
  {
    id: "soft-aesthetic",
    name: "Soft Aesthetic",
    line: "Quiet colours for notebooks, desks and cosy corners.",
    tint: "rgb(210 150 170 / 0.13)",
    stickers: [
      { id: "lofi-06", x: 10, y: 10, r: -5, w: 30 },
      { id: "lofi-15", x: 52, y: 8, r: 6, w: 34 },
      { id: "lofi-05", x: 24, y: 48, r: -7, w: 34 },
      { id: "lofi-10", x: 62, y: 50, r: 4, w: 26 },
      { id: "lofi-02", x: 38, y: 76, r: -3, w: 28 },
    ],
  },
  {
    id: "chaos-club",
    name: "Chaos Club",
    line: "For people whose laptops have no free space left.",
    tint: "rgb(215 255 63 / 0.1)",
    stickers: [
      { id: "lofi-14", x: 4, y: 8, r: -12, w: 36 },
      { id: "lofi-10", x: 46, y: 4, r: 10, w: 30 },
      { id: "lofi-13", x: 70, y: 30, r: -6, w: 24 },
      { id: "lofi-06", x: 18, y: 44, r: 8, w: 34 },
      { id: "lofi-16", x: 52, y: 56, r: -9, w: 30 },
    ],
  },
  {
    id: "goa-chill",
    name: "Goa Chill",
    line: "Sun, sea and slow living.",
    tint: "rgb(60 170 170 / 0.13)",
    stickers: [
      { id: "lofi-04", x: 8, y: 12, r: -4, w: 36 },
      { id: "lofi-01", x: 54, y: 10, r: 6, w: 32 },
      { id: "lofi-12", x: 14, y: 52, r: 5, w: 38 },
      { id: "lofi-02", x: 58, y: 54, r: -7, w: 28 },
      { id: "lofi-03", x: 36, y: 76, r: 4, w: 30 },
    ],
  },
];
