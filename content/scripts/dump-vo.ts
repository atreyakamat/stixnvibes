// Prints every voiceover line as JSON for scripts/tts.py.
// Pass reel ids to limit the output, e.g. `dump-vo.ts r001 r002`.
import { CATALOG } from "../src/catalog.ts";
declare const process: { argv: string[] };

const only = new Set(process.argv.slice(2));
const lines = CATALOG.filter((reel) => only.size === 0 || only.has(reel.id)).flatMap((reel) =>
  reel.scenes.flatMap((scene, i) => (scene.vo ? [{ id: reel.id, scene: i, text: scene.vo }] : [])),
);
console.log(JSON.stringify(lines));
