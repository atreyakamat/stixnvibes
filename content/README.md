# Stix N Vibes content

Remotion project that renders Instagram content for Stix N Vibes:

- **30 Days of Stix**: the 30-day reel challenge (`day-01` … `day-30`).
- **Series reels**: 100 reels in 10 series of 10 (`r001` … `r100`), about 30 s each.
- **Stall announcement posts**: one "we're coming to…" template in six styles, as feed posts and stories.

It is separate from the website. Nothing here is deployed or posted.

## What's here

- `src/reels.ts`: the 30-day calendar, plus the scene types and the usable footage ranges (`CLIPS`).
- `src/series.ts`: the 100 series reels. Every episode gets a music-only beat, a stall outro, a "next up" teaser and the end card added automatically.
- `src/catalog.ts`: both lists with their ids.
- `src/posts/Post.tsx` and `src/posts/events.json`: the announcement template. **Edit `events.json` for each stall** (event, venue, city, date, time, countdown line, stall number).
- `src/components/`: scene templates and brand pieces (lemon tags, die-cut designs, sticker slides, cut flashes).
- `src/Reel.tsx`: puts scenes in order and adds the Day X/30 bar or series badge, subtitles, voiceover and music.
- `scripts/tts.py`: makes the AI voiceover with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) (free, runs locally) and writes `src/vo.json` with each line's length. Scene lengths follow the voiceover.
- `scripts/render.sh`: renders each reel twice:
  - `out/post/<id>.mp4`: voiceover only. Post this, then add the song from Instagram's music picker.
  - `out/preview/<id>.mp4`: voiceover plus music, for review only. The music is copyrighted, so don't post this version.
- `scripts/posts.sh`: renders the announcement in every style: `out/posts/feed/<style>.png` (1080x1350) and `out/posts/story/<style>.mp4` + `.png` (1080x1920, 6 s).
- `scripts/stills.sh`: one still per scene, for a quick visual check.

## Sticker art

Series reels only use the low-risk sets: Soft Rebellion (slides 03, 16 and 17 left out for swear words), Journal Jotz, Retro pt1 (slides 1 and 5–10) and the lo-fi designs. Band, brand, anime and Redbubble-artist sets are not used.

## Media (not in git)

`public/footage`, `public/designs`, `public/slides`, `public/music` and `public/vo` are ignored by git. To rebuild them:

```bash
# stall clips, portrait 1080x1920 (s01..s25, in filename order of the originals)
ffmpeg -i <clip>.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" \
  -c:v libx264 -crf 20 -an public/footage/sNN.mp4
cp ../public/lofi/*.webp public/designs/
# collection slides as public/slides/{sr,jj,rt}-NN.jpg
# music mixes m1..m5.mp3 go in public/music/
node --experimental-strip-types scripts/dump-vo.ts | python scripts/tts.py <kokoro-model-dir> af_heart
```

## Commands

```bash
npm install
npm run studio                 # live preview in the browser
scripts/render.sh day-01 r001  # specific reels
scripts/render.sh              # all 30 challenge days
scripts/render.sh series       # all 100 series reels
scripts/posts.sh               # all six announcement styles
```

Remotion is free for individuals and companies of up to 3 people. Check [remotion.dev/license](https://www.remotion.dev/license) if the team grows.
