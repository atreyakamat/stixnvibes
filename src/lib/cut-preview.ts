// Draws a "what will this look like" preview of a sticker on a canvas. It is
// an illustration of the cut type, not a print-ready proof.

export type CutType = "die" | "kiss" | "circle" | "square";

export const CUTS: { id: CutType; name: string; blurb: string }[] = [
  { id: "die", name: "Die cut", blurb: "Cut right around the shape of your design." },
  { id: "kiss", name: "Kiss cut", blurb: "Cut through the sticker only. It stays on a backing sheet." },
  { id: "circle", name: "Circle", blurb: "Your design cropped into a circle." },
  { id: "square", name: "Square", blurb: "Your design cropped into a rounded square." },
];

type Canvas = HTMLCanvasElement;

function make(w: number, h: number): Canvas {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

function ctxOf(c: Canvas) {
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  return ctx;
}

function tint(src: Canvas, color: string): Canvas {
  const out = make(src.width, src.height);
  const ctx = ctxOf(out);
  ctx.drawImage(src, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, out.width, out.height);
  return out;
}

// Grows a silhouette outward by `r` pixels by stamping it around a circle.
function grow(sil: Canvas, r: number): Canvas {
  const out = make(sil.width, sil.height);
  const ctx = ctxOf(out);
  for (const [radius, steps] of [
    [r, 40],
    [r * 0.66, 28],
    [r * 0.33, 16],
  ] as const) {
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      ctx.drawImage(sil, Math.cos(a) * radius, Math.sin(a) * radius);
    }
  }
  ctx.drawImage(sil, 0, 0);
  return out;
}

export function hasTransparency(img: CanvasImageSource, w: number, h: number): boolean {
  const c = make(Math.min(w, 200), Math.min(h, 200));
  const ctx = ctxOf(c);
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 200) return true;
  return false;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function renderPreview(
  canvas: Canvas,
  img: HTMLImageElement,
  cut: CutType,
  transparent: boolean,
  size = 720,
) {
  canvas.width = size;
  canvas.height = size;
  const ctx = ctxOf(canvas);
  const cx = size / 2;
  const cy = size / 2;

  // Background: a dark studio surface.
  ctx.clearRect(0, 0, size, size);
  const bg = ctx.createRadialGradient(cx, cy * 0.8, size * 0.1, cx, cy, size * 0.75);
  bg.addColorStop(0, "#222");
  bg.addColorStop(1, "#0d0d0d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const nw = img.naturalWidth || 512;
  const nh = img.naturalHeight || 512;
  const border = size * 0.022;

  if (cut === "circle" || cut === "square") {
    const box = size * 0.66;
    const outer = box + border * 2;
    ctx.save();
    ctx.shadowColor = "rgb(0 0 0 / 0.6)";
    ctx.shadowBlur = size * 0.04;
    ctx.shadowOffsetY = size * 0.02;
    ctx.fillStyle = "#fff";
    if (cut === "circle") {
      ctx.beginPath();
      ctx.arc(cx, cy, outer / 2, 0, Math.PI * 2);
    } else {
      roundRect(ctx, cx - outer / 2, cy - outer / 2, outer, outer, outer * 0.12);
    }
    ctx.fill();
    ctx.restore();

    ctx.save();
    if (cut === "circle") {
      ctx.beginPath();
      ctx.arc(cx, cy, box / 2, 0, Math.PI * 2);
    } else {
      roundRect(ctx, cx - box / 2, cy - box / 2, box, box, box * 0.1);
    }
    ctx.clip();
    if (!transparent) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(cx - box / 2, cy - box / 2, box, box);
    } else {
      ctx.fillStyle = "#1b1b1b";
      ctx.fillRect(cx - box / 2, cy - box / 2, box, box);
    }
    // "Cover" fit so the shape is always filled.
    const k = Math.max(box / nw, box / nh);
    ctx.drawImage(img, cx - (nw * k) / 2, cy - (nh * k) / 2, nw * k, nh * k);
    ctx.restore();
    return;
  }

  // Die cut and kiss cut follow the outline of the artwork.
  const fit = Math.min((size * 0.68) / nw, (size * 0.68) / nh);
  const aw = nw * fit;
  const ah = nh * fit;
  const pad = Math.ceil(border * 3);

  const art = make(aw + pad * 2, ah + pad * 2);
  const actx = ctxOf(art);
  actx.drawImage(img, pad, pad, aw, ah);

  // Artwork with no transparency has no outline to follow, so use its box.
  let sil: Canvas;
  if (transparent) {
    sil = tint(art, "#fff");
  } else {
    sil = make(art.width, art.height);
    const sctx = ctxOf(sil);
    sctx.fillStyle = "#fff";
    roundRect(sctx, pad, pad, aw, ah, Math.min(aw, ah) * 0.06);
    sctx.fill();
  }
  const body = grow(sil, border);
  const ox = cx - art.width / 2;
  const oy = cy - art.height / 2;

  if (cut === "kiss") {
    // Backing sheet.
    const sw = size * 0.84;
    const sh = size * 0.84;
    ctx.save();
    ctx.shadowColor = "rgb(0 0 0 / 0.55)";
    ctx.shadowBlur = size * 0.05;
    ctx.shadowOffsetY = size * 0.025;
    const paper = ctx.createLinearGradient(0, cy - sh / 2, 0, cy + sh / 2);
    paper.addColorStop(0, "#f1eee2");
    paper.addColorStop(1, "#dedacb");
    ctx.fillStyle = paper;
    roundRect(ctx, cx - sw / 2, cy - sh / 2, sw, sh, size * 0.02);
    ctx.fill();
    ctx.restore();

    // The cut line sits just outside the white border.
    const line = size * 0.0045;
    const outer = grow(sil, border + line * 2);
    const ring = tint(outer, "#1b1b1b");
    const rctx = ctxOf(ring);
    rctx.globalCompositeOperation = "destination-out";
    rctx.drawImage(grow(sil, border + line * 0.2), 0, 0);
    ctx.globalAlpha = 0.38;
    ctx.drawImage(ring, ox, oy);
    ctx.globalAlpha = 1;
  }

  ctx.save();
  ctx.shadowColor = cut === "kiss" ? "rgb(0 0 0 / 0.3)" : "rgb(0 0 0 / 0.65)";
  ctx.shadowBlur = size * (cut === "kiss" ? 0.012 : 0.035);
  ctx.shadowOffsetY = size * (cut === "kiss" ? 0.006 : 0.02);
  ctx.drawImage(body, ox, oy);
  ctx.restore();
  ctx.drawImage(art, ox, oy);
}
