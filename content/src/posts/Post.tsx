// "We're coming to…" stall announcements. One event, six looks, two sizes.
// Edit src/posts/events.json, then render with scripts/posts.sh.
import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, design, fontFamily, HANDLE, SAFE } from "../brand";
import events from "./events.json";

export const POST_FORMATS = {
  feed: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
} as const;

export const POST_STYLES = ["lemon-slam", "ink-ticket", "map-pin", "sticker-sheet", "polaroid-crowd", "countdown"] as const;

export type PostStyle = (typeof POST_STYLES)[number];
export type PostFormat = keyof typeof POST_FORMATS;
export type EventInfo = (typeof events)["next"];
export type PostProps = { style: PostStyle; format: PostFormat; event: keyof typeof events };

type StyleProps = { e: EventInfo; story: boolean };

// ---------------------------------------------------------------- motion

/** Spring in from `delay` frames. Feed posts are stills, so they render fully settled. */
const useIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (durationInFrames <= 1) return 1;
  return spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 170, mass: 0.7 } });
};

/** Big, tilted, then settles: the sticker slap. */
const Slap: React.FC<{ delay?: number; tilt?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  tilt = -3,
  children,
  style,
}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        opacity: Math.min(1, p * 3),
        scale: String(interpolate(p, [0, 1], [1.5, 1])),
        rotate: `${interpolate(p, [0, 1], [tilt * 3, tilt])}deg`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Slow drift so story versions never sit dead still. */
const useDrift = (amount = 1) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(frame, [0, Math.max(1, durationInFrames)], [0, amount]);
};

// ---------------------------------------------------------------- pieces

const type = (size: number, color: string = C.ink, weight = 800): React.CSSProperties => ({
  fontFamily,
  fontWeight: weight,
  fontSize: size,
  color,
  letterSpacing: "-0.03em",
  lineHeight: 0.95,
  margin: 0,
});

const Label: React.FC<{ children: React.ReactNode; bg?: string; fg?: string; size?: number; border?: string }> = ({
  children,
  bg = C.lemon,
  fg = C.ink,
  size = 44,
  border = C.ink,
}) => (
  <span
    style={{
      ...type(size, fg),
      display: "inline-block",
      background: bg,
      border: `4px solid ${border}`,
      borderRadius: 18,
      padding: "10px 22px 14px",
      boxShadow: `6px 6px 0 ${border}`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const Handle: React.FC<{ color?: string }> = ({ color = C.ink }) => (
  <div style={{ ...type(34, color, 700), letterSpacing: "0.01em", opacity: 0.85 }}>{HANDLE}</div>
);

const Sticker: React.FC<{ n: number; width: number; style?: React.CSSProperties; delay?: number; tilt?: number }> = ({
  n,
  width,
  style,
  delay = 0,
  tilt = 0,
}) => {
  const p = useIn(delay);
  const drift = useDrift(4);
  return (
    <img
      src={staticFile(design(n))}
      style={{
        position: "absolute",
        width,
        filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.35))",
        opacity: Math.min(1, p * 2),
        scale: String(interpolate(p, [0, 1], [0.4, 1])),
        rotate: `${tilt + drift}deg`,
        ...style,
      }}
    />
  );
};

/** Padding that keeps story text clear of Instagram's top bar and reply box. */
const pad = (story: boolean): React.CSSProperties =>
  story
    ? { paddingTop: SAFE.top, paddingBottom: SAFE.bottom - 120, paddingLeft: SAFE.side, paddingRight: SAFE.side }
    : { padding: 80 };

// ---------------------------------------------------------------- 1. lemon slam

const LemonSlam: React.FC<StyleProps> = ({ e, story }) => (
  <AbsoluteFill style={{ background: C.lemon, overflow: "hidden" }}>
    <Sticker n={4} width={story ? 420 : 340} tilt={10} delay={14} style={{ right: -60, top: story ? 140 : 40 }} />
    <Sticker n={16} width={story ? 380 : 300} tilt={12} delay={18} style={{ right: -50, bottom: story ? 150 : 40 }} />
    <AbsoluteFill style={{ ...pad(story), justifyContent: "center", gap: story ? 44 : 34 }}>
      <Slap tilt={-2}>
        <p style={type(story ? 92 : 80)}>We're</p>
        <p style={type(story ? 150 : 128)}>coming</p>
        <p style={type(story ? 92 : 80)}>to</p>
      </Slap>
      <Slap delay={6} tilt={2} style={{ alignSelf: "flex-start" }}>
        <span style={{ ...type(story ? 96 : 84, C.lemon), background: C.ink, borderRadius: 22, padding: "8px 26px 18px", display: "inline-block", maxWidth: 900 }}>
          {e.event}
        </span>
      </Slap>
      <Slap delay={9} tilt={-1}>
        <p style={type(story ? 54 : 48, C.ink, 700)}>{e.venue}</p>
        <p style={{ ...type(story ? 40 : 36, C.ink, 600), marginTop: 10 }}>{e.city}</p>
      </Slap>
      <Slap delay={12} tilt={-3} style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <Label bg={C.white}>{e.date}</Label>
        <Label bg={C.white}>{e.time}</Label>
      </Slap>
      <p style={{ ...type(story ? 34 : 30, C.ink, 600), lineHeight: 1.2, maxWidth: 760 }}>{e.line}</p>
      <Handle />
    </AbsoluteFill>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- 2. ink ticket

const InkTicket: React.FC<StyleProps> = ({ e, story }) => {
  const notch = 44;
  const row = (k: string, v: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 30, borderTop: `3px dashed ${C.ink}`, padding: "20px 0" }}>
      <span style={{ ...type(28, C.ink, 700), letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>{k}</span>
      <span style={{ ...type(46, C.ink), textAlign: "right" }}>{v}</span>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 2px, transparent 2px)", backgroundSize: "34px 34px" }} />
      <AbsoluteFill style={{ ...pad(story), justifyContent: "center", alignItems: "center", gap: story ? 50 : 36 }}>
        <Slap tilt={-2}>
          <p style={{ ...type(story ? 104 : 88, C.white), textAlign: "center" }}>
            See you at <span style={{ color: C.lemon }}>the stall</span>
          </p>
        </Slap>
        <Slap delay={6} tilt={2}>
          <div
            style={{
              width: 860,
              background: C.paper,
              borderRadius: 32,
              padding: "44px 56px 30px",
              position: "relative",
              WebkitMask: `radial-gradient(circle ${notch}px at 0 62%, transparent 98%, #000) , radial-gradient(circle ${notch}px at 100% 62%, transparent 98%, #000)`,
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...type(30, C.ink, 800), letterSpacing: "0.18em" }}>ADMIT ALL</span>
              <Label size={30}>{e.stall}</Label>
            </div>
            <p style={{ ...type(96, C.ink), margin: "26px 0 6px" }}>{e.event}</p>
            <p style={{ ...type(40, C.ink, 600), marginBottom: 26 }}>{e.venue}</p>
            {row("Date", e.date)}
            {row("Time", e.time)}
            {row("Where", e.city)}
            <div style={{ borderTop: `3px dashed ${C.ink}`, paddingTop: 22, display: "flex", gap: 6, height: 70 }}>
              {Array.from({ length: 48 }, (_, i) => (
                <div key={i} style={{ flex: (i * 7) % 3 === 0 ? 2 : 1, background: C.ink, opacity: i % 5 === 0 ? 0 : 1 }} />
              ))}
            </div>
          </div>
        </Slap>
        <p style={{ ...type(34, C.white, 600), lineHeight: 1.25, textAlign: "center", maxWidth: 820, opacity: 0.85 }}>{e.line}</p>
        <Handle color={C.lemon} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 3. map pin

const MapPin: React.FC<StyleProps> = ({ e, story }) => {
  const { width, height } = useVideoConfig();
  const drop = useIn(8);
  const draw = useIn(0);
  const roads = [
    "M -40 300 C 260 260, 420 520, 700 470 S 1000 300, 1140 380",
    "M 180 -40 C 240 300, 120 640, 360 900 S 520 1400, 470 2000",
    "M 1120 760 C 860 820, 700 980, 520 940 S 160 1080, -40 1180",
    "M 820 -40 C 760 260, 900 560, 860 860 S 700 1500, 860 2000",
    "M -40 1500 C 300 1440, 600 1600, 1120 1520",
  ];
  const pinX = width * 0.56;
  const pinY = height * (story ? 0.4 : 0.36);
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <path d={`M -40 ${height * 0.62} C 300 ${height * 0.55}, 520 ${height * 0.72}, 1140 ${height * 0.6}`} stroke={C.ice} strokeWidth={70} fill="none" opacity={0.7} />
        {roads.map((d, i) => (
          <path key={i} d={d} stroke={C.ink} strokeOpacity={0.14} strokeWidth={i % 2 ? 16 : 26} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        ))}
        <circle cx={pinX} cy={pinY + 10} r={interpolate(drop, [0, 1], [0, 120])} fill={C.lemon} opacity={0.35} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: pinX - 90,
          top: pinY - 220,
          translate: `0 ${interpolate(drop, [0, 1], [-400, 0])}px`,
          opacity: Math.min(1, drop * 3),
        }}
      >
        <svg width={180} height={230} viewBox="0 0 180 230">
          <path d="M90 225 C 60 170, 6 130, 6 86 A 84 84 0 1 1 174 86 C 174 130, 120 170, 90 225 Z" fill={C.lemon} stroke={C.ink} strokeWidth={8} />
          <circle cx={90} cy={86} r={34} fill={C.ink} />
        </svg>
      </div>
      <AbsoluteFill style={{ ...pad(story), justifyContent: "space-between" }}>
        <Slap tilt={-2}>
          <p style={type(story ? 64 : 56, C.ink, 700)}>Find us here 👇</p>
          <p style={{ ...type(story ? 120 : 104), marginTop: 12 }}>{e.event}</p>
        </Slap>
        <Slap delay={12} tilt={1}>
          <div style={{ background: C.ink, borderRadius: 30, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={type(56, C.lemon)}>{e.venue}</p>
            <p style={type(40, C.white, 600)}>{e.city}</p>
            <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
              <Label size={36}>{e.date}</Label>
              <Label size={36} bg={C.white}>
                {e.time}
              </Label>
            </div>
            <div style={{ marginTop: 8 }}>
              <Handle color={C.lemon} />
            </div>
          </div>
        </Slap>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 4. sticker sheet

const StickerSheet: React.FC<StyleProps> = ({ e, story }) => {
  const cut = (children: React.ReactNode, delay: number, tilt: number, bg: string = C.white, fg: string = C.ink) => (
    <Slap delay={delay} tilt={tilt}>
      <div
        style={{
          background: bg,
          color: fg,
          borderRadius: 28,
          padding: "20px 30px 24px",
          outline: `3px dashed rgba(11,11,11,0.35)`,
          outlineOffset: 10,
          boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </Slap>
  );
  return (
    <AbsoluteFill style={{ background: "#E9E6DF", ...pad(story), justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.paper,
          borderRadius: 30,
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
          backgroundImage: "linear-gradient(rgba(11,11,11,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(11,11,11,0.05) 2px, transparent 2px)",
          backgroundSize: "60px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 40,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 22, left: 30, ...type(22, C.ink, 700), letterSpacing: "0.2em", opacity: 0.45 }}>STIX N VIBES · PEEL HERE</div>
        {cut(<span style={type(story ? 96 : 80)}>We're coming!</span>, 0, -3, C.lemon)}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <img src={staticFile(design(13))} style={{ width: story ? 230 : 190, rotate: "-8deg", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.25))" }} />
          {cut(<span style={type(story ? 72 : 60)}>{e.event}</span>, 5, 3)}
        </div>
        {cut(<span style={type(44, C.ink, 700)}>{e.venue}</span>, 8, -2)}
        <div style={{ display: "flex", gap: 34, flexWrap: "wrap", justifyContent: "center" }}>
          {cut(<span style={type(46, C.lemon)}>{e.date}</span>, 11, 4, C.ink)}
          {cut(<span style={type(46)}>{e.time}</span>, 13, -4)}
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {cut(<span style={type(40, C.ink, 700)}>{e.city}</span>, 15, 2)}
          <img src={staticFile(design(5))} style={{ width: story ? 210 : 170, rotate: "8deg", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.25))" }} />
        </div>
        <Handle />
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- 5. polaroid crowd

const Polaroid: React.FC<{ file: string; from: number; w: number; tilt: number; delay: number; caption: string; style: React.CSSProperties }> = ({
  file,
  from,
  w,
  tilt,
  delay,
  caption,
  style,
}) => {
  const { fps } = useVideoConfig();
  const p = useIn(delay);
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        background: C.white,
        padding: "22px 22px 0",
        boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
        rotate: `${interpolate(p, [0, 1], [tilt * 4, tilt])}deg`,
        scale: String(interpolate(p, [0, 1], [1.4, 1])),
        opacity: Math.min(1, p * 3),
        ...style,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "4 / 5", overflow: "hidden", background: C.ink2 }}>
        <OffthreadVideo src={staticFile(`footage/${file}.mp4`)} startFrom={Math.round(from * fps)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <p style={{ ...type(38, C.ink, 700), padding: "20px 4px 26px", textAlign: "center" }}>{caption}</p>
    </div>
  );
};

const PolaroidCrowd: React.FC<StyleProps> = ({ e, story }) => (
  <AbsoluteFill style={{ background: C.ink2, overflow: "hidden" }}>
    <Polaroid file="s10" from={0.5} w={story ? 560 : 470} tilt={-7} delay={0} caption="last stall 🔥" style={{ left: 50, top: story ? SAFE.top + 30 : 60 }} />
    <Polaroid file="s16" from={1} w={story ? 540 : 450} tilt={6} delay={6} caption="you, next?" style={{ right: 40, top: story ? SAFE.top + 400 : 280 }} />
    <AbsoluteFill style={{ ...pad(story), justifyContent: "flex-end" }}>
      <Slap delay={12} tilt={-2}>
        <div style={{ background: C.lemon, borderRadius: 30, padding: "30px 38px 34px", border: `5px solid ${C.ink}`, boxShadow: `10px 10px 0 ${C.white}` }}>
          <p style={type(story ? 52 : 44, C.ink, 700)}>Next stop</p>
          <p style={{ ...type(story ? 104 : 88), margin: "6px 0 14px" }}>{e.event}</p>
          <p style={type(40, C.ink, 700)}>
            {e.venue} · {e.city}
          </p>
          <p style={{ ...type(40, C.ink, 600), marginTop: 10 }}>
            {e.date} · {e.time}
          </p>
        </div>
      </Slap>
      <div style={{ marginTop: 26 }}>
        <Handle color={C.lemon} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- 6. countdown

const Countdown: React.FC<StyleProps> = ({ e, story }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pulse = durationInFrames > 1 ? 1 + 0.03 * Math.sin(frame / 4) : 1;
  const words = e.countdown.split(" ");
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
      <Sticker n={14} width={story ? 300 : 250} tilt={14} delay={16} style={{ right: 30, top: story ? SAFE.top + 10 : 50 }} />
      <Sticker n={10} width={story ? 280 : 230} tilt={-10} delay={20} style={{ left: 20, bottom: story ? SAFE.bottom - 60 : 40 }} />
      <AbsoluteFill style={{ ...pad(story), justifyContent: "center", gap: story ? 50 : 34 }}>
        <Slap tilt={0}>
          <span style={{ ...type(40, C.ink, 800), background: C.lemon, borderRadius: 12, padding: "8px 18px 12px", letterSpacing: "0.1em" }}>SAVE THE DATE</span>
        </Slap>
        <Slap delay={4} tilt={-3} style={{ scale: String(pulse) }}>
          {words.map((w, i) => (
            <p key={i} style={{ ...type(story ? 200 : 170, i === words.length - 1 ? C.lemon : C.white), textTransform: "uppercase", lineHeight: 0.86 }}>
              {w}
            </p>
          ))}
        </Slap>
        <Slap delay={10} tilt={1}>
          <p style={type(story ? 66 : 58, C.white)}>{e.event}</p>
          <p style={{ ...type(40, C.white, 600), marginTop: 12, opacity: 0.85 }}>
            {e.venue}, {e.city}
          </p>
          <p style={{ ...type(40, C.lemon, 700), marginTop: 12 }}>
            {e.date} · {e.time}
          </p>
        </Slap>
        <Handle color={C.white} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- composition

const STYLES: Record<PostStyle, React.FC<StyleProps>> = {
  "lemon-slam": LemonSlam,
  "ink-ticket": InkTicket,
  "map-pin": MapPin,
  "sticker-sheet": StickerSheet,
  "polaroid-crowd": PolaroidCrowd,
  countdown: Countdown,
};

export const PostComposition: React.FC<PostProps> = ({ style, format, event }) => {
  const View = STYLES[style];
  return <View e={events[event]} story={format === "story"} />;
};
