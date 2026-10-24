import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Self-hosted (SIL OFL) so renders work offline and behind proxies.
export const fontFamily = "Bricolage Grotesque";
loadFont({
  family: fontFamily,
  url: staticFile("fonts/bricolage-grotesque-latin.woff2"),
  weight: "200 800",
  format: "woff2",
});

export const C = {
  ink: "#0B0B0B",
  ink2: "#161616",
  lemon: "#D7FF3F",
  paper: "#F5F3EE",
  ice: "#9BE7FF",
  white: "#FFFFFF",
} as const;

export const FPS = 30;
export const W = 1080;
export const H = 1920;

/** Instagram covers the top bar and the caption/buttons area. Keep text inside. */
export const SAFE = { top: 230, bottom: 420, side: 70, right: 170 } as const;

export const DESIGN_COUNT = 17;
export const design = (n: number) =>
  `designs/lofi-${String(((n - 1) % DESIGN_COUNT) + 1).padStart(2, "0")}.webp`;

export const HANDLE = "@stixnvibes";
export const SHOP = "shop.stixnvibes.com";
