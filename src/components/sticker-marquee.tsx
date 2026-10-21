import { Sticker } from "./ui";

const ROW = ["sticker-05", "sticker-12", "sticker-18", "sticker-24", "sticker-09", "sticker-26", "sticker-02", "sticker-30"];
const TILT = [-6, 5, -3, 7, -8, 4, -5, 6];

/** A slow loop of real stickers between the hero and the first section. */
export function StickerMarquee() {
  const row = (hidden: boolean) =>
    ROW.map((id, i) => (
      <li key={`${hidden}-${id}`} aria-hidden={hidden || undefined} className="w-28 shrink-0 px-5 md:w-40">
        <Sticker id={id} rotate={TILT[i]} className="w-full" />
      </li>
    ));
  return (
    <div className="overflow-hidden border-y border-line py-8 md:py-12" aria-hidden="true">
      <ul className="marquee">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
