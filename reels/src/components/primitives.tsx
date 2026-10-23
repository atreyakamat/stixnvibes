import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, design, fontFamily } from "../brand";

/** Spring from 0 to 1 starting at `delay` frames. */
export const usePop = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness: 180, mass: 0.7 } });
};

/** A slap-on entrance: big and tilted, then settles. */
export const slap = (p: number, tilt = -4) => ({
  opacity: Math.min(1, p * 3),
  scale: String(interpolate(p, [0, 1], [1.6, 1])),
  rotate: `${interpolate(p, [0, 1], [tilt * 3, tilt])}deg`,
});

/** Text where *wrapped* parts render on a lemon highlight. */
export const Marked: React.FC<{ text: string; dark?: boolean }> = ({ text, dark }) => {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") ? (
          <span
            key={i}
            style={{
              background: dark ? C.ink : C.lemon,
              color: dark ? C.lemon : C.ink,
              padding: "0 0.18em",
              borderRadius: "0.14em",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

/** Lemon label that looks like a sticker slapped onto the frame. */
export const Tag: React.FC<{ children: React.ReactNode; delay?: number; tilt?: number; size?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  tilt = -4,
  size = 52,
  style,
}) => {
  const p = usePop(delay);
  return (
    <div
      style={{
        ...slap(p, tilt),
        display: "inline-block",
        fontFamily,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        color: C.ink,
        background: C.lemon,
        padding: `${size * 0.32}px ${size * 0.5}px`,
        borderRadius: size * 0.36,
        border: `${Math.max(4, size * 0.09)}px solid ${C.ink}`,
        boxShadow: `0 0 0 ${Math.max(5, size * 0.12)}px ${C.white}, 0 18px 40px rgba(0,0,0,0.45)`,
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** One die-cut design with a soft drop shadow. */
export const Design: React.FC<{ n: number; width: number; style?: React.CSSProperties }> = ({ n, width, style }) => (
  <Img
    src={staticFile(design(n))}
    style={{
      width,
      height: "auto",
      filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.45))",
      ...style,
    }}
  />
);

/** Designs drifting slowly behind title cards. */
export const FloatingDesigns: React.FC<{ seed?: number; count?: number; opacity?: number }> = ({ seed = 0, count = 4, opacity = 0.9 }) => {
  const frame = useCurrentFrame();
  const spots = [
    [-90, 140, 360, -12],
    [760, 210, 330, 10],
    [-60, 1380, 340, 8],
    [740, 1300, 360, -9],
    [620, 860, 220, 14],
    [40, 820, 200, -16],
  ];
  return (
    <>
      {spots.slice(0, count).map(([x, y, w, r], i) => {
        const p = spring({ frame: frame - 2 - i * 3, fps: 30, config: { damping: 14 } });
        const drift = Math.sin((frame + i * 40) / 38) * 14;
        return (
          <Design
            key={i}
            n={seed + i * 3 + 1}
            width={w}
            style={{
              position: "absolute",
              left: x,
              top: y + drift,
              opacity: opacity * p,
              scale: String(interpolate(p, [0, 1], [0.4, 1])),
              rotate: `${r + drift * 0.2}deg`,
            }}
          />
        );
      })}
    </>
  );
};

/** Subtle dot grid for flat backgrounds. */
export const DotGrid: React.FC<{ color?: string }> = ({ color = "rgba(255,255,255,0.07)" }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(${color} 3px, transparent 3.5px)`,
      backgroundSize: "54px 54px",
    }}
  />
);

/** Quick white flash on a cut, so edits land on the beat. */
export const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 4], [0.55, 0], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, background: C.white, opacity: o, pointerEvents: "none" }} />;
};
