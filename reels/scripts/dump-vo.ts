// Prints every voiceover line as JSON for scripts/tts.py.
import { REELS } from "../src/reels.ts";

const lines = REELS.flatMap((reel) =>
  reel.scenes.flatMap((scene, i) =>
    scene.vo ? [{ day: reel.day, scene: i, text: scene.vo }] : [],
  ),
);
console.log(JSON.stringify(lines));
