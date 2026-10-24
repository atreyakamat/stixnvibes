import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { Reveal } from "./reveal";

const SLOTS = ["Your laptop here", "Your bottle here", "Your wall here"];
const TILTS = [-2.5, 1.5, -1, 2, -1.5, 1];

/**
 * Customer photos and reviews, pinned like polaroids. Until there are enough,
 * empty frames ask people to tag us, which is how the wall fills up.
 */
export function StuckWall() {
  const empty = SLOTS.slice(0, Math.max(0, 3 - reviews.length));

  return (
    <section aria-labelledby="stuck-title" className="pt-28 md:pt-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 id="stuck-title" className="display text-[clamp(2.8rem,8vw,7.5rem)]">
              Stuck on <span className="text-lemon">you.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-sm text-paper/70">
            Stuck one of ours on your laptop, bottle or wall? Post it and tag{" "}
            {site.contact.instagramHandle}. We repost the best ones and pin them here.
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.name + i} style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}>
              <figure className="rounded-[1.5rem] bg-paper p-3 text-ink shadow-[0_18px_30px_rgb(0_0_0/0.45)]">
                {r.photo && (
                  <img
                    src={r.photo}
                    alt={`${r.name}'s Stix N Vibes stickers`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-[1.1rem] object-cover"
                  />
                )}
                <blockquote className="px-2 pt-4 text-lg leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="label px-2 pb-1 pt-3 text-ink/60">
                  {r.name}
                  {r.where && ` · ${r.where}`}
                </figcaption>
              </figure>
            </li>
          ))}
          {empty.map((label, i) => (
            <li key={label} style={{ rotate: `${TILTS[(reviews.length + i) % TILTS.length]}deg` }}>
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener"
                className="group grid aspect-[4/3] place-items-center rounded-[1.5rem] border-2 border-dashed border-paper/25 p-6 text-center transition-colors hover:border-lemon"
              >
                <span>
                  <span className="display block text-4xl text-paper/80 group-hover:text-lemon md:text-5xl">{label}</span>
                  <span className="label mt-4 block text-mute">Tag {site.contact.instagramHandle} ↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
