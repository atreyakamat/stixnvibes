# 30 Days of Stix: reels

Remotion project that renders the 30-day Instagram reel challenge for Stix N Vibes.
It is separate from the website. Nothing here is deployed or posted.

## What's here

- `src/reels.ts`: the calendar. One entry per day, each a list of scenes (title, footage, list, versus, designs, laptop, end card). Edit text and voiceover lines here.
- `src/components/`: scene templates and brand pieces (lemon tags, die-cut designs, cut flashes).
- `src/Reel.tsx`: puts scenes in order and adds the Day X/30 bar, subtitles, voiceover and music.
- `scripts/tts.py`: makes the AI voiceover with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) (free, runs locally) and writes `src/vo.json` with each line's length. Scene lengths follow the voiceover.
- `scripts/render.sh`: renders each reel twice:
  - `out/post/day-XX.mp4`: voiceover only. Post this, then add the song from Instagram's music picker.
  - `out/preview/day-XX.mp4`: voiceover plus music, for review only. The music is copyrighted, so don't post this version.
- `scripts/stills.sh`: one still per scene, for a quick visual check.

## Media (not in git)

`public/footage`, `public/designs`, `public/music` and `public/vo` are ignored by git. To rebuild them:

```bash
# stall clips, portrait 1080x1920 (s01..s25, in filename order of the originals)
ffmpeg -i <clip>.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" \
  -c:v libx264 -crf 20 -an public/footage/sNN.mp4
cp ../public/lofi/*.webp public/designs/
# music mixes m1..m5.mp3 go in public/music/
node --experimental-strip-types scripts/dump-vo.ts | python scripts/tts.py <kokoro-model-dir> af_heart
```

`CLIPS` in `src/reels.ts` lists the usable time range in each clip. Those ranges skip frames where licensed art (anime posters, car or film posters, F1) fills the shot.

## Commands

```bash
npm install
npm run studio                 # live preview in the browser
scripts/render.sh day-01 day-02
scripts/render.sh              # all 30
```

Remotion is free for individuals and companies of up to 3 people. Check [remotion.dev/license](https://www.remotion.dev/license) if the team grows.
