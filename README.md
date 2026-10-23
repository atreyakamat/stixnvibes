# Stix N Vibes — landing site (v2.3)

The landing site for Stix N Vibes, a student-led sticker and print brand from Goa.
It is a landing page only: no prices, cart or accounts. The shop lives at
[shop.stixnvibes.com](https://shop.stixnvibes.com).

Brand rules, palette and copy standards are in [`CONTEXT.md`](./CONTEXT.md).

## Stack

- Next.js 16 (App Router, static export to `out/`) and TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- matter-js for the sticker pile (loaded only when that section is near)
- Netlify for hosting and forms

There is no animation library. Effects use CSS, pointer events and canvas.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # writes the static site to out/
```

To check the production build locally, run `npx http-server out -p 4310` and
open http://localhost:4310.

## Page map (home)

| # | Section | Component | What it does |
| --- | --- | --- | --- |
| – | Hero | `hero.tsx`, `sticker-board.tsx` | Real stall footage. Visitors peel stickers off and stick them anywhere on the page. |
| – | Sticker marquee | `sticker-marquee.tsx` | CSS loop of the designs. Pauses on hover. |
| 01 | Why stickers | `sticker-gravity.tsx` | Physics pile you can throw around (tap to flick on phones). |
| – | We cut it live | `cut-scrub.tsx` | Scroll plays the Cricut clip frame by frame on a canvas. |
| 02 | What we make | `ui.tsx` (`ProductGrid`) | Products from `src/content/site.ts`. |
| – | Goa queues for this | `proof-wall.tsx`, `loop-video.tsx` | Six stall clips that play only while on screen. |
| 03 | Pick your vibe | `vibe-picker.tsx` | Collections from `src/content/vibes.ts`. |
| 04 | Custom | `page.tsx` | Services and process. Links to the upload tool on `/custom`. |
| 05 | For brands | `page.tsx` | Lemon block with use cases. |
| 06 | Find us | `find-us.tsx` | Pop-up dates from `src/content/popups.ts`. |
| 07 | Who we are | `page.tsx` | Founders and story. |
| 08 | FAQ | `ui.tsx` (`FaqList`) | Questions from `src/content/site.ts`. |

Other pages: `/custom` (cut preview and artwork upload), `/brands`, `/about`, `/contact`.

## Where to change things

| To change | Edit |
| --- | --- |
| Copy, contacts, products, FAQ, shop link | `src/content/site.ts` |
| Collections (Late Night, Golden Hour, Soft Paws, Off the Wall) | `src/content/vibes.ts` |
| Pop-up dates | `src/content/popups.ts` (add `{ date, name, place, note }`; past dates hide themselves) |
| Sticker art | `public/lofi/` and `src/content/stickers.ts` (sizes) |
| Hero and stall videos | `public/media/stall/` (see "Media" below) |
| Cutting clip frames | `public/media/cut/f-001.webp` … `f-072.webp` |
| Share image (WhatsApp, Instagram, X previews) | `public/og.jpg`, 1200 × 630 |
| Forms | `src/components/enquiry-form.tsx`, `sticker-lab.tsx` and `public/__forms.html` (keep field names in sync) |

## Media

All media is made from the originals in `G:\Assets` with
[`scripts/encode-media.sh`](./scripts/encode-media.sh). Run it again after
swapping a clip.

| File | Source | Format |
| --- | --- | --- |
| `hero-wide.av1.mp4` / `hero-wide.mp4` | `VID_20261014_113814693` | Desktop hero. 16:10 crop. AV1 (sharp, small) with an H.264 fallback. |
| `hero-tall.av1.mp4` / `hero-tall.mp4` | same clip | Phone hero. 1080 × 1920. |
| `clip-1` … `clip-6` | six stall clips (listed in the script) | Proof wall, 720 × 1280. |
| `*.webp` posters | first second of each clip | Shown instantly; the video fades in over it. |
| `public/media/cut/` | `VID_20260925_065824094` | 72 WebP frames of the Cricut cutting. |
| `public/lofi/` | `Untitled design (1).zip` | 17 designs, background removed, 420 px WebP. |

How video loads:

- The poster shows first. The video downloads only after the page has loaded,
  and only while it is on screen.
- Browsers that support AV1 get the AV1 file. Others (older iPhones, older Safari)
  get the H.264 file.
- Reduced motion and data saver get the poster only.

## SEO

- `src/app/sitemap.ts` builds `/sitemap.xml` with every page and a last-modified date.
- `src/app/robots.ts` builds `/robots.txt`: everything is allowed except the hidden
  forms page, and it points to the sitemap.
- The canonical domain is `https://www.stixnvibes.com` (`site.url` in
  `src/content/site.ts`). Netlify redirects the bare domain to www. If the
  primary domain ever changes, change `site.url` too.
- Every page has its own title, description, canonical link and share image.

## Performance

- Static HTML from Netlify's CDN. Images, video and Next.js bundles are cached
  for a year (`netlify.toml`).
- Stickers are 420 px WebP (about 40 KB each) and load lazily below the hero.
- Heavy pieces load late: matter-js when the pile is near, cutting frames when
  that section is near, videos after page load.
- Effects use transforms and canvas only. Nothing runs off screen.

## Effects and fallbacks

| Effect | No JavaScript | Reduced motion | Phone |
| --- | --- | --- | --- |
| Peel-and-stick hero | Stickers hidden, page works | Works without the squash animation | Four stickers, smaller |
| Sticker pile | Static pile | Static pile | Tap to flick, page still scrolls |
| Cutting scrub | Section shows text | One still frame | Same, compact list |
| Videos | Poster image | Poster image | Phone-shaped hero clip |
| Glass header | Solid fallback where blur is unsupported | Same | Same |

## Launch checklist

- [ ] Merge the PR, then confirm Netlify publishes from `master`.
- [ ] Netlify: turn on form detection, redeploy, and send a test through both forms.
- [ ] Netlify: turn on email notifications for `enquiry` and `sticker-upload`.
- [ ] Confirm the WhatsApp number, Instagram handle and email in `src/content/site.ts`.
- [ ] Add pop-up dates to `src/content/popups.ts` as they are booked.
- [ ] Submit `https://www.stixnvibes.com/sitemap.xml` in Google Search Console.
