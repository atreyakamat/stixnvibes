import React from "react";
import { Composition, Folder } from "remotion";
import { FPS, H, W } from "./brand";
import { CATALOG } from "./catalog";
import { PostComposition, POST_FORMATS, POST_STYLES } from "./posts/Post";
import { ReelComposition } from "./Reel";
import { reelTimeline } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="challenge">
      {CATALOG.filter((r) => r.day).map((reel) => (
        <Composition
          key={reel.id}
          id={reel.id}
          component={ReelComposition}
          fps={FPS}
          width={W}
          height={H}
          durationInFrames={reelTimeline(reel).total}
          defaultProps={{ id: reel.id, music: true }}
        />
      ))}
    </Folder>
    <Folder name="series">
      {CATALOG.filter((r) => !r.day).map((reel) => (
        <Composition
          key={reel.id}
          id={reel.id}
          component={ReelComposition}
          fps={FPS}
          width={W}
          height={H}
          durationInFrames={reelTimeline(reel).total}
          defaultProps={{ id: reel.id, music: true }}
        />
      ))}
    </Folder>
    <Folder name="posts">
      {POST_STYLES.flatMap((style) =>
        Object.entries(POST_FORMATS).map(([format, size]) => (
          <Composition
            key={`${style}-${format}`}
            id={`post-${style}-${format}`}
            component={PostComposition}
            fps={FPS}
            width={size.width}
            height={size.height}
            durationInFrames={format === "story" ? 6 * FPS : 1}
            defaultProps={{ style, format: format as keyof typeof POST_FORMATS, event: "next" }}
          />
        )),
      )}
    </Folder>
  </>
);
