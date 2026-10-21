// Geometry for the hero sticker-sheet peel. The sheet is folded along the
// diagonal line x + y = c, measured from the top-left corner. Everything on
// the near side (x + y <= c) stays stuck; the far side lifts and shows its
// back, mirrored across the fold.

export type Pt = { x: number; y: number };

// Keeps the part of `poly` where a*x + b*y + d >= 0 (Sutherland–Hodgman).
function clip(poly: Pt[], a: number, b: number, d: number): Pt[] {
  const out: Pt[] = [];
  const f = (p: Pt) => a * p.x + b * p.y + d;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const fp = f(p);
    const fq = f(q);
    if (fp >= 0) out.push(p);
    if (fp >= 0 !== fq >= 0) {
      const k = fp / (fp - fq);
      out.push({ x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k });
    }
  }
  return out;
}

export function peelShapes(w: number, h: number, t: number) {
  const rect: Pt[] = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];
  // t = 0: nothing peeled. t = 1: the whole sheet is off.
  const c = (w + h) * (1 - Math.min(Math.max(t, 0), 1));
  const stuck = clip(rect, -1, -1, c);
  const lifted = clip(rect, 1, 1, -c);
  const flap = clip(
    clip(
      lifted.map((p) => ({ x: c - p.y, y: c - p.x })),
      1,
      0,
      0,
    ),
    0,
    1,
    0,
  );
  return { stuck, flap, c };
}

export function toPolygon(points: Pt[]): string {
  if (points.length < 3) return "polygon(0 0, 0 0, 0 0)";
  return `polygon(${points.map((p) => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`).join(", ")})`;
}
