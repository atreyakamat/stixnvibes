# Stix N Vibes — v2.1 landing site

Landing site for Stix N Vibes, a student-led sticker and print brand from Goa.
Brand rules, palette and copy standards live in [`CONTEXT.md`](./CONTEXT.md).

## Stack

- Next.js 16 (App Router, static export) + TypeScript
- Tailwind CSS v4 (tokens in `src/app/globals.css`)
- Motion (`motion/react`) for hero parallax, matter-js for the sticker pile
- Netlify (static `out/` folder, Netlify Forms)

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | All copy, contacts, products, FAQ. Edit here, not in components. |
| `src/content/stickers.ts` | Sizes of the processed sticker files. |
| `src/app/*/page.tsx` | Pages: home, `/custom`, `/brands`, `/about`, `/contact`. |
| `src/components/` | Header, footer, hero, effects and shared UI. |
| `public/stickers/` | 32 stickers as trimmed 480px WebP (from the original PNGs on `old-v2`). |
| `public/media/` | Hero video (WebM + MP4) and posters. |
| `public/__forms.html` | Registers the `enquiry` form with Netlify Forms. Keep field names in sync with `enquiry-form.tsx`. |

## Effects and their fallbacks

- **Sticker trail** (hero, desktop mouse only) — after fancycomponents.dev Image Trail.
- **Sticker pile** — matter-js, loads when the section scrolls into view; drag on desktop, tap to flick on touch, static pile with reduced motion.
- **Vibes on a path** — SVG `textPath` marquee; static with reduced motion.
- **Hero video** — the poster image is the LCP and carries the scene; video is skipped for reduced motion and data saver.
- Content stays visible without JavaScript (reveal styles only apply once the `js` class is set).

## Launch checklist

- [ ] Confirm WhatsApp number, Instagram handle and email in `src/content/site.ts`.
- [ ] Confirm which products are live vs coming soon.
- [ ] Netlify: confirm build command `npm run build` and publish dir `out` (set in `netlify.toml`).
- [ ] Netlify: turn on form notifications for the `enquiry` form.
- [ ] Add privacy / terms pages if needed.
