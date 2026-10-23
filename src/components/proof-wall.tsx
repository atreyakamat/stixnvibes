import { LoopVideo } from "./loop-video";

const CLIPS = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/media/stall/clip-${n}.mp4`,
  av1: `/media/stall/clip-${n}.av1.mp4`,
  poster: `/media/stall/clip-${n}.webp`,
}));

// Column offsets give the wall a hand-pinned rhythm instead of a grid.
const OFFSET = ["md:mt-16", "", "md:mt-28", "md:mt-8", "md:mt-20", ""];
const TILT = [-2, 1.5, -1, 2, -1.5, 1];

/** Real clips from our stalls. Each one plays only while it is on screen. */
export function ProofWall() {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
      {CLIPS.map((c, i) => (
        <li
          key={c.src}
          className={`${OFFSET[i]} ${i > 3 ? "hidden md:block" : ""}`}
          style={{ rotate: `${TILT[i]}deg` }}
        >
          <LoopVideo
            src={c.src}
            av1={c.av1}
            poster={c.poster}
            alt="Students crowding a Stix N Vibes stall, picking stickers and posters"
            className="aspect-[9/16] rounded-[1.25rem] ring-1 ring-paper/10"
          />
        </li>
      ))}
    </ul>
  );
}
