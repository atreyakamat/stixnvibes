import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, DESIGN_COUNT, fontFamily, HANDLE, SAFE, SHOP } from "../brand";
import { CLIPS, type Scene } from "../reels";
import { CutFlash, Design, DotGrid, FloatingDesigns, Marked, slap, Tag, usePop } from "./primitives";

type Props<K extends Scene["kind"]> = {
  scene: Extract<Scene, { kind: K }>;
  frames: number;
  day: number;
};

const textBase: React.CSSProperties = {
  fontFamily,
  fontWeight: 800,
  color: C.white,
  letterSpacing: "-0.03em",
  lineHeight: 0.98,
};

// ---------------------------------------------------------------- footage

const ClipVideo: React.FC<{ name: keyof typeof CLIPS; frames: number }> = ({ name, frames }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const [file, from, to] = CLIPS[name];
  // Slow the clip down rather than freeze when the slot is longer than the clip.
  const rate = Math.min(1, Math.max(0.35, (to - from) / (frames / fps)));
  return (
    <AbsoluteFill style={{ scale: String(interpolate(frame, [0, frames], [1.1, 1.0])) }}>
      <OffthreadVideo
        src={staticFile(`footage/${file}.mp4`)}
        startFrom={Math.round(from * fps)}
        playbackRate={rate}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

export const FootageScene: React.FC<Props<"footage">> = ({ scene, frames }) => {
  const slot = Math.ceil(frames / scene.clips.length);
  const words = scene.text?.split(" ") ?? [];
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      {scene.clips.map((clip, i) => (
        <Sequence key={i} from={i * slot} durationInFrames={slot}>
          <ClipVideo name={clip} frames={slot} />
          <CutFlash />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {scene.tag ? (
        <div style={{ position: "absolute", top: SAFE.top + 150, left: SAFE.side }}>
          <Tag delay={3} tilt={-5}>
            {scene.tag}
          </Tag>
        </div>
      ) : null}
      {words.length ? (
        <div
          style={{
            ...textBase,
            position: "absolute",
            left: SAFE.side,
            right: SAFE.right,
            bottom: SAFE.bottom + 250,
            fontSize: words.join(" ").length > 22 ? 96 : 118,
            textShadow: "0 6px 30px rgba(0,0,0,0.55)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0 0.24em",
          }}
        >
          {words.map((w, i) => {
            const p = spring({ frame: frame - 4 - i * 3, fps: 30, config: { damping: 11, stiffness: 200 } });
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: Math.min(1, p * 2),
                  translate: `0 ${interpolate(p, [0, 1], [60, 0])}px`,
                  color: i === words.length - 1 ? C.lemon : C.white,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- title

export const TitleScene: React.FC<Props<"title">> = ({ scene, day }) => {
  const lemon = scene.bg === "lemon";
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: lemon ? C.lemon : C.ink, overflow: "hidden" }}>
      <DotGrid color={lemon ? "rgba(0,0,0,0.08)" : undefined} />
      {scene.designs !== false ? <FloatingDesigns seed={day} /> : null}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: `0 ${SAFE.side}px` }}>
        {scene.lines.map((line, i) => {
          const p = spring({ frame: frame - i * 5, fps: 30, config: { damping: 10, stiffness: 190, mass: 0.8 } });
          const long = line.replace(/\*/g, "").length;
          return (
            <div
              key={i}
              style={{
                ...textBase,
                color: lemon ? C.ink : C.white,
                fontSize: long > 11 ? 120 : long > 7 ? 150 : 176,
                textAlign: "center",
                margin: "0.06em 0",
                opacity: Math.min(1, p * 3),
                scale: String(interpolate(p, [0, 1], [1.7, 1])),
                rotate: `${interpolate(p, [0, 1], [i % 2 ? 8 : -8, i % 2 ? 1 : -1.5])}deg`,
              }}
            >
              <Marked text={line} dark={lemon} />
            </div>
          );
        })}
      </AbsoluteFill>
      <CutFlash />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- list

export const ListScene: React.FC<Props<"list">> = ({ scene, frames }) => {
  const n = scene.items.length;
  const first = 10;
  const gap = Math.max(8, Math.floor((frames - first - 24) / n));
  const p = usePop(0);
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      {scene.clip ? (
        <AbsoluteFill style={{ opacity: 0.35, filter: "blur(6px) saturate(0.8)" }}>
          <ClipVideo name={scene.clip} frames={frames} />
        </AbsoluteFill>
      ) : (
        <DotGrid />
      )}
      <AbsoluteFill style={{ padding: `${SAFE.top + 110}px ${SAFE.right - 40}px 0 ${SAFE.side}px` }}>
        <div style={{ ...textBase, fontSize: 100, color: C.lemon, marginBottom: 46, ...slap(p, -2) }}>{scene.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: n > 5 ? 20 : 30 }}>
          {scene.items.map((item, i) => (
            <ListItem key={i} index={i} text={item} numbered={scene.numbered} delay={first + i * gap} compact={n > 5} />
          ))}
        </div>
      </AbsoluteFill>
      <CutFlash />
    </AbsoluteFill>
  );
};

const ListItem: React.FC<{ index: number; text: string; numbered?: boolean; delay: number; compact: boolean }> = ({
  index,
  text,
  numbered,
  delay,
  compact,
}) => {
  const p = usePop(delay, 11);
  const tilt = index % 2 ? 1.2 : -1.2;
  return (
    <div
      style={{
        ...slap(p, tilt),
        transformOrigin: "left center",
        display: "flex",
        alignItems: "center",
        gap: 26,
        background: C.paper,
        borderRadius: 30,
        padding: compact ? "20px 30px" : "30px 36px",
        boxShadow: `0 0 0 8px ${C.white}, 0 18px 36px rgba(0,0,0,0.45)`,
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          width: compact ? 74 : 92,
          height: compact ? 74 : 92,
          borderRadius: 999,
          background: C.lemon,
          border: `5px solid ${C.ink}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontWeight: 800,
          fontSize: compact ? 42 : 52,
          color: C.ink,
        }}
      >
        {numbered ? index + 1 : "✓"}
      </div>
      <div style={{ ...textBase, color: C.ink, fontSize: compact ? 54 : text.length > 26 ? 56 : 66, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
        {text}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- versus

const VersusArt: React.FC<{ art: Props<"versus">["scene"]["art"]; side: 0 | 1; day: number }> = ({ art, side, day }) => {
  const frame = useCurrentFrame();
  const n = (day % DESIGN_COUNT) + 1;
  if (art === "cut") {
    return side === 0 ? (
      <div style={{ position: "relative" }}>
        <Design n={n} width={330} style={{ rotate: `${Math.sin(frame / 20) * 3}deg` }} />
      </div>
    ) : (
      <div
        style={{
          background: C.white,
          borderRadius: 22,
          padding: 30,
          outline: `5px dashed ${C.ink}`,
          outlineOffset: -16,
          boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
        }}
      >
        <Design n={n} width={270} style={{ filter: "none" }} />
      </div>
    );
  }
  if (art === "paper") {
    const wet = interpolate(frame % 60, [0, 30, 60], [0, 1, 0]);
    return side === 0 ? (
      <Design n={n} width={300} style={{ filter: `grayscale(0.7) sepia(0.4) blur(${wet * 2}px)`, rotate: "-6deg", opacity: 0.85 }} />
    ) : (
      <div style={{ position: "relative" }}>
        <Design n={n} width={300} style={{ rotate: "4deg" }} />
        <div style={{ position: "absolute", right: -10, top: -20, fontSize: 90 }}>💧</div>
      </div>
    );
  }
  if (art === "size") {
    const w = side === 0 ? 210 : 300;
    return (
      <div
        style={{
          width: w,
          height: w * 1.414,
          background: C.paper,
          border: `6px solid ${C.ink}`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
        }}
      >
        <Design n={n} width={w * 0.9} style={{ filter: "none" }} />
      </div>
    );
  }
  return null;
};

export const VersusScene: React.FC<Props<"versus">> = ({ scene, frames, day }) => {
  const a = usePop(4);
  const b = usePop(Math.min(40, Math.floor(frames * 0.35)));
  const vs = usePop(Math.min(40, Math.floor(frames * 0.35)) - 6, 8);
  const card = (side: 0 | 1, [label, sub]: [string, string], p: number) => (
    <div
      style={{
        ...slap(p, side ? 1.5 : -1.5),
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 36,
        flexDirection: side ? "row-reverse" : "row",
        background: side ? C.lemon : C.paper,
        borderRadius: 40,
        padding: "34px 40px",
        boxShadow: `0 0 0 8px ${C.white}, 0 22px 44px rgba(0,0,0,0.5)`,
      }}
    >
      {scene.art ? (
        <div style={{ flex: "0 0 auto", width: 340, display: "flex", justifyContent: "center" }}>
          <VersusArt art={scene.art} side={side} day={day} />
        </div>
      ) : null}
      <div style={{ flex: 1 }}>
        <div style={{ ...textBase, color: C.ink, fontSize: 104 }}>{label}</div>
        <div style={{ fontFamily, fontWeight: 600, color: C.ink, fontSize: 44, lineHeight: 1.15, marginTop: 14 }}>{sub}</div>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <DotGrid />
      <AbsoluteFill style={{ padding: `${SAFE.top + 70}px ${SAFE.side}px ${SAFE.bottom - 60}px`, gap: 50 }}>
        <div style={{ ...textBase, fontSize: 84, color: C.lemon, textAlign: "center" }}>{scene.title}</div>
        {card(0, scene.left, a)}
        <div style={{ height: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 999,
              background: C.ink,
              border: `8px solid ${C.lemon}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...textBase,
              fontSize: 64,
              color: C.lemon,
              opacity: Math.min(1, vs * 2),
              scale: String(interpolate(vs, [0, 1], [0.2, 1])),
            }}
          >
            VS
          </div>
        </div>
        {card(1, scene.right, b)}
      </AbsoluteFill>
      <CutFlash />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- designs

const allDesigns = Array.from({ length: DESIGN_COUNT }, (_, i) => i + 1);

export const DesignsScene: React.FC<Props<"designs">> = ({ scene, frames }) => {
  const frame = useCurrentFrame();
  const ids = scene.ids ?? allDesigns;
  const layout = scene.layout ?? "grid";
  let body: React.ReactNode = null;

  if (layout === "grid" && ids.length === 3) {
    // A fanned hand of three, like stickers spread on a table.
    body = (
      <div style={{ position: "relative", width: 1000, height: 900 }}>
        {ids.map((n, i) => {
          const p = spring({ frame: frame - 6 - i * 6, fps: 30, config: { damping: 11 } });
          const [x, y, r] = [[20, 60, -10], [520, 160, 9], [230, 470, -3]][i];
          return (
            <div key={n} style={{ position: "absolute", left: x, top: y, ...slap(p, r) }}>
              <Design n={n} width={450} />
            </div>
          );
        })}
      </div>
    );
  } else if (layout === "grid") {
    const cols = ids.length > 4 ? 2 : 1;
    const width = cols === 2 ? 400 : ids.length === 3 ? 360 : 420;
    body = (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: ids.length === 3 ? "18px 40px" : "40px 60px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {ids.map((n, i) => {
          const p = spring({ frame: frame - 6 - i * 6, fps: 30, config: { damping: 11 } });
          return (
            <div key={n} style={{ position: "relative", ...slap(p, i % 2 ? 3 : -3) }}>
              <Design n={n} width={width} />
              {scene.numbered ? (
                <div style={{ position: "absolute", left: -18, top: -18 }}>
                  <Tag size={46} tilt={-8}>{i + 1}</Tag>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  } else if (layout === "rain") {
    body = ids.map((n, i) => {
      const x = ((i * 0.618) % 1) * 860 - 80;
      const speed = 9 + (i % 4) * 2.2;
      const y = -420 + (frame + i * 22) * speed - (i % 3) * 300;
      return (
        <Design
          key={n}
          n={n}
          width={250 + (i % 3) * 60}
          style={{ position: "absolute", left: x, top: y, rotate: `${(frame + i * 30) * (i % 2 ? 0.6 : -0.6)}deg` }}
        />
      );
    });
  } else {
    // flash: one design at a time, punching in on every cut
    const per = Math.max(6, Math.floor(frames / ids.length));
    const idx = Math.min(ids.length - 1, Math.floor(frame / per));
    const local = frame - idx * per;
    const p = spring({ frame: local, fps: 30, config: { damping: 9, stiffness: 260 } });
    body = (
      <div style={{ ...slap(p, idx % 2 ? 4 : -4) }}>
        <Design n={ids[idx]} width={820} />
      </div>
    );
  }

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <DotGrid />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 120, paddingBottom: layout === "grid" ? 300 : 0 }}>
        {body}
      </AbsoluteFill>
      {scene.text ? (
        <div style={{ position: "absolute", left: SAFE.side, right: SAFE.side, top: SAFE.top + 40, textAlign: "center" }}>
          <Tag size={64} delay={2} tilt={-2}>
            {scene.text}
          </Tag>
        </div>
      ) : null}
      {layout === "flash" ? <FlashCuts frames={frames} count={ids.length} /> : <CutFlash />}
    </AbsoluteFill>
  );
};

const FlashCuts: React.FC<{ frames: number; count: number }> = ({ frames, count }) => {
  const per = Math.max(6, Math.floor(frames / count));
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Sequence key={i} from={i * per} durationInFrames={per}>
          <CutFlash />
        </Sequence>
      ))}
    </>
  );
};

// ---------------------------------------------------------------- laptop

const LAPTOP_SPOTS = [
  [70, 60, 300, -10],
  [470, 40, 250, 8],
  [560, 300, 280, -6],
  [120, 360, 260, 12],
  [330, 200, 230, -3],
  [20, 560, 230, 6],
  [430, 570, 250, -12],
  [700, 520, 200, 9],
] as const;

export const LaptopScene: React.FC<Props<"laptop">> = ({ scene, frames }) => {
  const frame = useCurrentFrame();
  const ids = scene.ids.slice(0, LAPTOP_SPOTS.length);
  const start = 14;
  const gap = Math.max(6, Math.floor((frames - start - 40) / ids.length));
  const done = start + gap * ids.length;
  const beforeAfter = interpolate(frame, [done, done + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <DotGrid />
      <div style={{ position: "absolute", left: 60, right: 60, top: 560 }}>
        <div
          style={{
            position: "relative",
            height: 820,
            borderRadius: 46,
            background: "linear-gradient(160deg, #3a3a3e, #1f1f22)",
            border: "6px solid #4b4b50",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {ids.map((n, i) => {
            const [x, y, w, r] = LAPTOP_SPOTS[i];
            const p = spring({ frame: frame - start - i * gap, fps: 30, config: { damping: 10, stiffness: 220 } });
            return (
              <Design
                key={n}
                n={n}
                width={w}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  opacity: p > 0.01 ? 1 : 0,
                  scale: String(interpolate(p, [0, 1], [1.9, 1])),
                  rotate: `${interpolate(p, [0, 1], [r * 3, r])}deg`,
                }}
              />
            );
          })}
        </div>
        <div style={{ height: 40, margin: "0 -40px", background: "linear-gradient(#55555a, #2c2c30)", borderRadius: "0 0 40px 40px" }} />
      </div>
      <div style={{ position: "absolute", top: SAFE.top + 60, left: 0, right: 0, textAlign: "center" }}>
        <Tag size={72} tilt={-3}>
          {beforeAfter > 0.5 ? "After" : scene.text ?? "Before"}
        </Tag>
      </div>
      <CutFlash />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- cta

export const CtaScene: React.FC<Props<"cta">> = ({ scene, day }) => {
  const frame = useCurrentFrame();
  const p = usePop(0, 10);
  const line = scene.line ?? (day < 30 ? `Follow for Day ${day + 1}` : "Your stickers. Your vibe.");
  return (
    <AbsoluteFill style={{ background: C.lemon, overflow: "hidden" }}>
      <DotGrid color="rgba(0,0,0,0.08)" />
      <FloatingDesigns seed={day + 5} opacity={1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: `0 ${SAFE.side}px` }}>
        <div
          style={{
            ...textBase,
            color: C.ink,
            fontSize: 170,
            textAlign: "center",
            lineHeight: 0.86,
            ...slap(p, -3),
          }}
        >
          STIX N<br />VIBES
        </div>
        <div style={{ ...slap(usePop(8), 2) }}>
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 62,
              color: C.lemon,
              background: C.ink,
              borderRadius: 26,
              padding: "22px 34px",
              textAlign: "center",
            }}
          >
            {line}
          </div>
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 48,
            color: C.ink,
            textAlign: "center",
            opacity: interpolate(frame, [14, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }),
          }}
        >
          {HANDLE} · {SHOP}
        </div>
      </AbsoluteFill>
      <CutFlash />
    </AbsoluteFill>
  );
};
