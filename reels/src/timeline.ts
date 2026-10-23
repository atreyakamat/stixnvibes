import { FPS } from "./brand";
import type { Reel, Scene } from "./reels";
import voJson from "./vo.json";

const vo = voJson as Record<string, number>;

/** Seconds of voiceover for a scene, or 0 when it has none. */
export const voSeconds = (day: number, index: number) => vo[`${day}-${index}`] ?? 0;

/** Voiceover starts this long after its scene starts. */
export const VO_LEAD = 0.2;

const defaultMin = (scene: Scene) => (scene.kind === "cta" ? 2.4 : 2.5);

export const sceneFrames = (reel: Reel, index: number) => {
  const scene = reel.scenes[index];
  const spoken = scene.vo ? voSeconds(reel.day, index) + VO_LEAD + 0.35 : 0;
  return Math.ceil(Math.max(scene.min ?? defaultMin(scene), spoken) * FPS);
};

export const sceneStarts = (reel: Reel) => {
  const starts: number[] = [];
  let at = 0;
  reel.scenes.forEach((_, i) => {
    starts.push(at);
    at += sceneFrames(reel, i);
  });
  return { starts, total: at };
};
