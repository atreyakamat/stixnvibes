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
| – | Pull up to the stall | `stall-reel.tsx` | The stall reel, pinned while you scroll. The frame grows, the headline lights up and six stickers slap onto it and stay stuck. |
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
| Stall reel and the stickers that slap onto it | `public/media/stall/reel.*` and `STICKERS` in `src/components/stall-reel.tsx` |
| Share image (WhatsApp, Instagram, X previews) | `public/og.jpg`, 1200 × 630 |
| Forms | `src/components/enquiry-form.tsx`, `sticker-lab.tsx` and `public/__forms.html` (keep field names in sync) |
| Form emails | `src/lib/notify.ts` (EmailJS, see "Form emails" below) |
| Book a stall page and the organiser pitch PDF | `src/content/book.ts`, `src/app/book/page.tsx`; PDF source in `scripts/pitch/` (`node scripts/pitch/render.mjs` rewrites `public/stixnvibes-stall-pitch.pdf`) |
| Customer reviews and photos ("Stuck on you" wall) | `src/content/reviews.ts`; empty frames ask people to tag us until there are three |

## Media

All media is made from the originals in `G:\Assets` with
[`scripts/encode-media.sh`](./scripts/encode-media.sh). Run it again after
swapping a clip.

| File | Source | Format |
| --- | --- | --- |
| `hero-wide.av1.mp4` / `hero-wide.mp4` | `VID_20261014_113814693` | Desktop hero. 16:10 crop. AV1 (sharp, small) with an H.264 fallback. |
| `hero-tall.av1.mp4` / `hero-tall.mp4` | same clip | Phone hero. 1080 × 1920. |
| `clip-1` … `clip-6` | six stall clips (listed in the script) | Proof wall, 720 × 1280. |
| `*.webp` posters | first second of each clip | Shown instantly; the video fades in over it. The phone hero poster is 828 px. |
| `reel.av1.mp4` / `reel.mp4` | `Video-6092` (the edited stall reel) | 720 × 1280, muted, first 9.6 s (the "Follow us" end card is cut; the section has a real Follow button). |
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

Lighthouse with real throttling (23 Oct 2026): phone 88–89 (hero visible in
2.8 s), desktop 98. Accessibility 96, best practices 100, SEO 100.

- Static HTML from Netlify's CDN. Images, video and Next.js bundles are cached
  for a year (`netlify.toml`).
- The phone hero poster is fetched first and kept under 100 KB (828 px). Keep it
  that small if you replace it: it decides how fast the page looks loaded.
- Stickers are 420 px WebP (about 40 KB each) and load lazily below the hero.
- Heavy pieces load late: matter-js when the pile is near, videos after page
  load and only while on screen.
- Effects use transforms and canvas only. Nothing runs off screen.

## Effects and fallbacks

| Effect | No JavaScript | Reduced motion | Phone |
| --- | --- | --- | --- |
| Peel-and-stick hero | Stickers hidden, page works | Works without the squash animation | Four stickers, smaller |
| Sticker pile | Static pile | Static pile | Tap to flick, page still scrolls |
| Stall reel | Poster with every sticker shown | Poster, no pinning, every sticker shown | Smaller frame, headline on one line |
| Videos | Poster image | Poster image | Phone-shaped hero clip |
| Glass header | Solid fallback where blur is unsupported | Same | Same |

## Form emails

Every enquiry and custom-sticker upload goes two ways at once: Netlify Forms keeps a copy, and EmailJS emails it to the inbox. The person sees "Got it." when either one lands. Uploaded artwork stays in Netlify (Forms → sticker-upload); the email names the file.

Setup, once:

1. At emailjs.com (free plan, 200 emails a month), add an Email Service and connect the Gmail inbox.
2. Add an Email Template. Subject `{{title}}`, content `{{details}}`, Reply To `{{email}}`, To Email the inbox address.
3. In Netlify → Project configuration → Environment variables, add `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (Account → General in EmailJS), then redeploy.
4. In EmailJS → Account → Security, allow only `https://www.stixnvibes.com` so nobody can send from the key elsewhere.

With any variable missing, the site skips the email and only posts to Netlify.

## Launch checklist

- [ ] Merge the PR, then confirm Netlify publishes from `master`.
- [ ] Netlify: turn on form detection, redeploy, and send a test through both forms.
- [ ] Netlify: turn on email notifications for `enquiry` and `sticker-upload`.
- [ ] Confirm the WhatsApp number, Instagram handle and email in `src/content/site.ts`.
- [ ] Add pop-up dates to `src/content/popups.ts` as they are booked.
- [ ] Submit `https://www.stixnvibes.com/sitemap.xml` in Google Search Console.
