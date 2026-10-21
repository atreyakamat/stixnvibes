import { site } from "@/content/site";
import { popUps } from "@/content/popups";

const fmt = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" });

export function FindUs() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = popUps.filter((p) => p.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="max-w-md text-lg text-paper/75">
          We set up at college events, markets and pop-ups around Goa, mostly on Sundays. Dates go on
          Instagram first.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.contact.instagramDm} target="_blank" rel="noopener" className="btn btn-primary">
            DM us on Instagram
          </a>
          <a href={site.contact.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
            Follow {site.contact.instagramHandle}
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        {upcoming.length > 0 ? (
          <ul className="divide-y divide-line border-y border-line">
            {upcoming.map((p) => (
              <li key={p.date + p.name} className="grid grid-cols-[7rem_1fr] gap-4 py-5 md:grid-cols-[9rem_1fr]">
                <time dateTime={p.date} className="display text-3xl text-lemon md:text-4xl">
                  {fmt.format(new Date(p.date))}
                </time>
                <div>
                  <p className="text-xl font-semibold">{p.name}</p>
                  <p className="text-paper/70">{p.place}</p>
                  {p.note && <p className="mt-1 text-sm text-mute">{p.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="ice rounded-[1.5rem] p-8 md:p-10">
            <p className="label text-lemon">Next stall</p>
            <p className="display mt-4 text-5xl md:text-6xl">Dates drop on Instagram.</p>
            <p className="mt-4 max-w-md text-paper/70">
              Send us a DM and we tell you where we are setting up next.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
