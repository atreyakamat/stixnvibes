"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Post = {
  id: string;
  permalink: string;
  timestamp: string;
  prunedCaption?: string;
  sizes?: { medium?: { mediaUrl: string; width: number; height: number } };
};

const KEY = "snv-ig";
const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });
const TILTS = [-3, 2, -1.5];

// The feed counts every fetch against the free plan's monthly views, so one
// fetch per visit is kept for the rest of the session.
async function loadPosts(url: string): Promise<Post[]> {
  try {
    const cached = sessionStorage.getItem(KEY);
    if (cached) return JSON.parse(cached);
  } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  const posts = ((await res.json()).posts ?? []).slice(0, 3) as Post[];
  try {
    sessionStorage.setItem(KEY, JSON.stringify(posts));
  } catch {}
  return posts;
}

/**
 * The three newest Instagram posts, pulled from the Behold feed in
 * `site.instagramFeed`. Pop-up dates are announced on Instagram first, so this
 * keeps the page current without a deploy. Renders nothing until the feed is
 * set up or if it fails.
 */
export function InstagramLatest() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!site.instagramFeed) return;
    let live = true;
    loadPosts(site.instagramFeed)
      .then((p) => live && setPosts(p))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  if (!posts.length) return null;

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="label text-lemon">Latest on {site.contact.instagramHandle}</p>
        <a href={site.contact.instagram} target="_blank" rel="noopener" className="label text-mute hover:text-lemon">
          See all on Instagram ↗
        </a>
      </div>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {posts.map((p, i) => {
          const img = p.sizes?.medium;
          return (
            <li key={p.id}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noopener"
                className="group block rounded-[1.5rem] bg-paper p-2.5 text-ink shadow-[0_18px_30px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
                style={{ rotate: `${TILTS[i]}deg` }}
              >
                {img && (
                  <img
                    src={img.mediaUrl}
                    alt={p.prunedCaption?.slice(0, 120) || "Instagram post from Stix N Vibes"}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-[1.1rem] object-cover"
                  />
                )}
                <div className="px-2 pb-1 pt-3">
                  <time dateTime={p.timestamp} className="label text-ink/60">
                    {fmt.format(new Date(p.timestamp))}
                  </time>
                  {p.prunedCaption && <p className="mt-1 line-clamp-3 text-sm leading-snug">{p.prunedCaption}</p>}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
