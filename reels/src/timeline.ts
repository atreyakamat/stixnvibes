import { FPS } from "./brand";
import type { Reel, Scene } from "./reels";
import voJson from "./vo.json";

const vo = voJson as Record<string, number>;

/** Seconds of voiceover for a scene, or 0 when it has none. */
export const voSeconds = (day: number, index: number) => vo[`${day}-${index}`] ?? 0;

/** Voiceover starts this long after its scene starts. */
export const VO_LEAD = 0.1;

const defaultMin = (scene: Scene) => (scene.kind === "cta" ? 2 : 1.8);

/** Reels must run at least this long; the end card absorbs the difference. */
const MIN_SECONDS = 10;

const baseFrames = (reel: Reel, index: number) => {
  const scene = reel.scenes[index];
  const spoken = scene.vo ? voSeconds(reel.day, index) + VO_LEAD + 0.2 : 0;
  return Math.ceil(Math.max(scene.min ?? defaultMin(scene), spoken) * FPS);
};

export const reelTimeline = (reel: Reel) => {
  const frames = reel.scenes.map((_, i) => baseFrames(reel, i));
  const short = MIN_SECONDS * FPS - frames.reduce((a, b) => a + b, 0);
  if (short > 0) frames[frames.length - 1] += short;
  const starts = frames.map((_, i) => frames.slice(0, i).reduce((a, b) => a + b, 0));
  return { frames, starts, total: starts[starts.length - 1] + frames[frames.length - 1] };
};
