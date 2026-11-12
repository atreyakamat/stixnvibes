import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Designs",
  description: "Free wallpaper and sticker-style designs from Stix N Vibes. Download and print or share.",
  alternates: { canonical: "/designs/" },
};

const designs = [
  { file: "design-peel-paste.png", title: "Peel. Paste. Repeat." },
  { file: "design-wet-still-stuck.png", title: "Wet? Still stuck." },
  { file: "design-goa-obviously.png", title: "Goa, obviously." },
  { file: "design-no-signal.png", title: "No signal? No problem." },
  { file: "design-make-it-stick.png", title: "Make it stick." },
  { file: "design-stay-sticky.png", title: "Stay sticky." },
  { file: "n01-feets-luck.png", title: "Feet's Luck" },
  { file: "n02-yuck-fou.png", title: "Yuck Fou" },
  { file: "n03-sticky-fingers.png", title: "Sticky Fingers" },
  { file: "n04-stuck-on-you.png", title: "Stuck on You" },
  { file: "n05-get-stuck-in.png", title: "Get Stuck In" },
  { file: "n06-wanna-peel.png", title: "Wanna Peel?" },
  { file: "n07-naughty-but-nice.png", title: "Naughty but Nice" },
  { file: "n08-oh-my-sticks.png", title: "Oh My Sticks!" },
  { file: "n09-cut-it-out.png", title: "Cut It Out" },
  { file: "n10-sticks-and-stones.png", title: "Sticks & Stones" },
];

export default function DesignsPage() {
  return (
    <>
      <PageIntro label="Designs" title={<>Free <span className="text-lemon">downloads.</span></>}>
        <p>Original designs from Stix N Vibes. Save one, print it, or share it.</p>
      </PageIntro>

      <section aria-label="Design downloads" className="container-x pb-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((d) => (
            <li key={d.file} className="overflow-hidden rounded-[1.25rem] border border-line">
              <img src={`/designs/${d.file}`} alt={d.title} width={1200} height={1200} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-4 p-5">
                <span className="font-medium">{d.title}</span>
                <a href={`/designs/${d.file}`} download className="btn btn-ghost text-sm">Download</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
