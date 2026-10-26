import Link from "next/link";
import type { ReactNode } from "react";
import { faqs, products, stickerSrc, type Product } from "@/content/site";
import { stickerSize } from "@/content/stickers";
import { Reveal } from "./reveal";
import { TiltSticker } from "./tilt-sticker";

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-mute">
      <span className="text-lemon">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Sticker({
  id,
  rotate = 0,
  className = "",
  alt = "",
}: {
  id: string;
  rotate?: number;
  className?: string;
  alt?: string;
}) {
  const [w, h] = stickerSize[id] ?? [400, 400];
  return <TiltSticker src={stickerSrc(id)} alt={alt} width={w} height={h} rotate={rotate} className={className} />;
}

export function StatusPill({ status }: { status: Product["status"] }) {
  return status === "available" ? (
    <span className="label inline-flex items-center gap-2 rounded-full bg-lemon px-3 py-1.5 text-ink">
      <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
      Available now
    </span>
  ) : (
    <span className="label inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-paper/80 ring-1 ring-paper/20">
      Coming soon
    </span>
  );
}

// Line drawings stand in for products that have no photos yet. They show the
// format, not the artwork, so nothing here reads as a real product shot.
function Outline({ shape }: { shape: Product["shape"] }) {
  const stroke = "stroke-paper/35";
  switch (shape) {
    case "poster":
      return (
        <svg viewBox="0 0 120 160" className="h-full w-auto" fill="none" aria-hidden="true">
          <rect x="10" y="6" width="100" height="148" rx="3" className={stroke} strokeWidth="1.5" />
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => (
              <circle key={`${r}${c}`} cx={38 + c * 44} cy={38 + r * 42} r="15" className="stroke-lemon/70" strokeWidth="1.5" strokeDasharray="3 3" />
            )),
          )}
          <text x="60" y="150" textAnchor="middle" className="fill-paper/40 font-mono" fontSize="7">A4 · A3</text>
        </svg>
      );
    case "frame":
      return (
        <svg viewBox="0 0 140 170" className="h-full w-auto" fill="none" aria-hidden="true">
          <rect x="6" y="6" width="128" height="158" rx="2" className="stroke-paper/50" strokeWidth="6" />
          <rect x="22" y="22" width="96" height="126" className={stroke} strokeWidth="1" />
          <path d="M34 128 L58 96 L74 112 L92 84 L106 128 Z" className="stroke-lemon/70" strokeWidth="1.5" />
        </svg>
      );
    case "cards":
      return (
        <svg viewBox="0 0 160 140" className="h-full w-auto" fill="none" aria-hidden="true">
          <rect x="30" y="20" width="70" height="100" rx="6" transform="rotate(-12 65 70)" className={stroke} strokeWidth="1.5" />
          <rect x="50" y="18" width="70" height="100" rx="6" transform="rotate(4 85 68)" className={stroke} strokeWidth="1.5" />
          <rect x="66" y="22" width="70" height="100" rx="6" transform="rotate(14 101 72)" className="stroke-lemon/70" strokeWidth="1.5" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 120 160" className="h-full w-auto" fill="none" aria-hidden="true">
          <rect x="10" y="6" width="100" height="148" rx="8" className={stroke} strokeWidth="1.5" />
          <rect x="22" y="18" width="76" height="76" rx="3" className={stroke} strokeWidth="1" />
          <line x1="22" y1="112" x2="98" y2="112" className="stroke-paper/25" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="112" x2="62" y2="112" className="stroke-lemon" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 126 L68 133 L56 140 Z" className="fill-lemon/80" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProductTile({ product, index, feature = false }: { product: Product; index: number; feature?: boolean }) {
  const live = product.status === "available";
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-line p-6 md:p-8 ${
        live ? "ice" : "bg-surface/40"
      } ${feature ? "min-h-[26rem] md:min-h-[32rem]" : "min-h-[22rem]"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label text-mute">{String(index + 1).padStart(2, "0")}</span>
        <StatusPill status={product.status} />
      </div>

      <div className="relative my-6 flex flex-1 items-center justify-center">
        {live && product.stickers ? (
          <div className="relative flex w-full max-w-md items-center justify-center">
            {product.stickers.map((id, i) => (
              <Sticker
                key={id}
                id={id}
                rotate={[-10, 4, 12][i] ?? 0}
                className={`relative w-[38%] shrink-0 ${i > 0 ? "-ml-[8%]" : ""} ${i === 1 ? "z-10 -translate-y-3" : ""}`}
              />
            ))}
          </div>
        ) : (
          <div className="h-40 opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:h-48">
            <Outline shape={product.shape} />
          </div>
        )}
      </div>

      <div>
        <h3 className={`display ${feature ? "text-5xl md:text-6xl" : "text-4xl"}`}>{product.name}</h3>
        <p className="mt-3 max-w-sm text-paper/70">{product.line}</p>
      </div>
    </article>
  );
}

export function ProductGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {products.map((p, i) => (
        <Reveal
          key={p.id}
          delay={(i % 4) * 80}
          className={
            i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-6 lg:col-span-3"
          }
        >
          <ProductTile product={p} index={i} feature={i < 2} />
        </Reveal>
      ))}
    </div>
  );
}

export function FaqList({ items = faqs }: { items?: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium md:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-paper/25 transition-transform duration-300 group-open:rotate-45 group-open:bg-lemon group-open:text-ink group-open:ring-lemon"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-5 text-paper/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="container-x pb-16 pt-32 md:pb-24 md:pt-44">
      <p className="label fade-up text-mute">{label}</p>
      <h1 className="display mt-5 text-[clamp(3.2rem,11vw,10rem)]">
        <span className="rise-line">
          <span style={{ ["--d" as string]: "100ms" }}>{title}</span>
        </span>
      </h1>
      {children && (
        <div className="fade-up mt-8 max-w-2xl text-lg leading-relaxed text-paper/75" style={{ ["--d" as string]: "300ms" }}>
          {children}
        </div>
      )}
    </section>
  );
}

export function CtaBand({
  title = "What's your vibe?",
  primary = { href: "/contact/", label: "Get in touch" },
  secondary = { href: "/custom/", label: "Make it custom" },
}: {
  title?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="container-x pt-24 md:pt-36">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line px-6 py-16 text-center md:px-16 md:py-24">
        <Sticker id="lofi-07" rotate={-14} className="absolute left-6 top-6 hidden w-32 md:block" />
        <Sticker id="lofi-13" rotate={12} className="absolute bottom-6 right-6 hidden w-32 md:block" />
        <h2 className="display text-[clamp(3rem,10vw,9rem)]">{title}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={primary.href} className="btn btn-primary">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn btn-ghost">
            {secondary.label}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
