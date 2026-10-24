import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, fontFamily, SAFE } from "./brand";
import { findReel, seedOf } from "./catalog";
import { CtaScene, DesignsScene, FootageScene, ListScene, SlideScene, TitleScene, VersusScene } from "./components/scenes";
import musicWindows from "./music-windows.json";
import type { Scene } from "./reels";
import { reelTimeline, VO_LEAD, voSeconds } from "./timeline";

export type ReelProps = { id: string; music: boolean };

const SceneView: React.FC<{ scene: Scene; frames: number; day: number }> = ({ scene, frames, day }) => {
  switch (scene.kind) {
    case "footage":
      return <FootageScene scene={scene} frames={frames} day={day} />;
    case "title":
      return <TitleScene scene={scene} frames={frames} day={day} />;
    case "list":
      return <ListScene scene={scene} frames={frames} day={day} />;
    case "versus":
      return <VersusScene scene={scene} frames={frames} day={day} />;
    case "designs":
      return <DesignsScene scene={scene} frames={frames} day={day} />;
    case "slide":
      return <SlideScene scene={scene} frames={frames} day={day} />;
    case "cta":
      return <CtaScene scene={scene} frames={frames} day={day} />;
  }
};

/** Day badge and a 30-step progress bar, so the challenge reads at a glance. */
const ChallengeBar: React.FC<{ day: number }> = ({ day }) => (
  <div style={{ position: "absolute", top: SAFE.top - 90, left: SAFE.side, right: SAFE.side, display: "flex", alignItems: "center", gap: 22 }}>
    <div
      style={{
        fontFamily,
        fontWeight: 800,
        fontSize: 34,
        color: C.ink,
        background: C.lemon,
        borderRadius: 14,
        padding: "8px 16px",
        border: `3px solid ${C.ink}`,
        whiteSpace: "nowrap",
      }}
    >
      DAY {String(day).padStart(2, "0")}/30
    </div>
    <div style={{ flex: 1, display: "flex", gap: 5 }}>
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 10,
            borderRadius: 5,
            background: i < day ? C.lemon : "rgba(255,255,255,0.28)",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.35)",
          }}
        />
      ))}
    </div>
  </div>
);

/** Series name and episode for reels outside the challenge. */
const SeriesBadge: React.FC<{ series: string; ep?: number }> = ({ series, ep }) => (
  <div style={{ position: "absolute", top: SAFE.top - 90, left: SAFE.side, display: "flex", gap: 10 }}>
    <div
      style={{
        fontFamily,
        fontWeight: 800,
        fontSize: 32,
        color: C.ink,
        background: C.lemon,
        borderRadius: 14,
        padding: "8px 16px",
        border: `3px solid ${C.ink}`,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      }}
    >
      {series}
      {ep ? ` · ${String(ep).padStart(2, "0")}` : ""}
    </div>
  </div>
);

/** Voiceover as short, timed caption chunks for people watching on mute. */
const Subtitles: React.FC<{ text: string; seconds: number }> = ({ text, seconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += 4) chunks.push(words.slice(i, i + 4).join(" "));
  // Don't leave a single word hanging on its own.
  if (chunks.length > 1 && !chunks[chunks.length - 1].includes(" ")) {
    const last = chunks.pop()!;
    chunks[chunks.length - 1] += ` ${last}`;
  }
  const weights = chunks.map((c) => c.length + 4);
  const total = weights.reduce((a, b) => a + b, 0);
  const t = frame / fps;
  let at = 0;
  let current = chunks.length - 1;
  for (let i = 0; i < chunks.length; i++) {
    at += (weights[i] / total) * seconds;
    if (t < at) {
      current = i;
      break;
    }
  }
  if (t > seconds + 0.3) return null;
  return (
    <div style={{ position: "absolute", left: SAFE.side, right: SAFE.right - 60, bottom: SAFE.bottom + 40, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.15,
          color: C.white,
          background: "rgba(11,11,11,0.78)",
          borderRadius: 18,
          padding: "14px 24px",
          textAlign: "center",
        }}
      >
        {chunks[current]}
      </div>
    </div>
  );
};

export const ReelComposition: React.FC<ReelProps> = ({ id, music }) => {
  const reel = findReel(id);
  const seed = reel.day ?? seedOf(id);
  const { fps, durationInFrames } = useVideoConfig();
  const { starts, frames } = reelTimeline(reel);
  const window = musicWindows[reel.music];
  const musicStart = window.starts[seed % window.starts.length];
  const spoken = (f: number) =>
    reel.scenes.some((s, i) => s.vo && f >= starts[i] && f < starts[i] + (voSeconds(id, i) + VO_LEAD + 0.2) * fps);

  return (
    <AbsoluteFill style={{ background: C.ink }}>
      {reel.scenes.map((scene, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={frames[i]} name={`${i}: ${scene.kind}`}>
          <SceneView
            scene={scene.kind === "cta" && !scene.line ? { ...scene, line: reel.day ? (reel.day < 30 ? `Follow for Day ${reel.day + 1}` : "Your stickers. Your vibe.") : "Follow for more vibes" } : scene}
            frames={frames[i]}
            day={seed}
          />
          {scene.vo ? (
            <Sequence from={Math.round(VO_LEAD * fps)}>
              <Audio src={staticFile(`vo/${id}/s${i}.wav`)} volume={1} />
              {scene.kind !== "list" && scene.kind !== "versus" ? <Subtitles text={scene.vo} seconds={voSeconds(id, i)} /> : null}
            </Sequence>
          ) : null}
        </Sequence>
      ))}
      {reel.day ? <ChallengeBar day={reel.day} /> : reel.series ? <SeriesBadge series={reel.series} ep={reel.ep} /> : null}
      {music ? (
        <Audio
          src={staticFile(`music/${reel.music}.mp3`)}
          startFrom={musicStart * fps}
          volume={(f) => {
            const fade = interpolate(f, [0, 8, durationInFrames - 20, durationInFrames], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return fade * (spoken(f) ? 0.16 : 0.6);
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
