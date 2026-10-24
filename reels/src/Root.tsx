import React from "react";
import { Composition } from "remotion";
import { FPS, H, W } from "./brand";
import { REELS } from "./reels";
import { ReelComposition } from "./Reel";
import { reelTimeline } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    {REELS.map((reel) => (
      <Composition
        key={reel.day}
        id={`day-${String(reel.day).padStart(2, "0")}`}
        component={ReelComposition}
        fps={FPS}
        width={W}
        height={H}
        durationInFrames={reelTimeline(reel).total}
        defaultProps={{ day: reel.day, music: true }}
      />
    ))}
  </>
);
