#!/usr/bin/env bash
# Render one still per scene (mid-scene) and a contact sheet, for a quick visual check.
# Usage: scripts/stills.sh day-02 [r001 ...]
set -euo pipefail
cd "$(dirname "$0")/.."
B="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
mkdir -p out/stills
for id in "$@"; do
  # Mirrors src/timeline.ts (which can't load in plain node because of the font import).
  frames=$(node --experimental-strip-types -e "
    import('./src/catalog.ts').then(async ({findReel}) => {
      const vo = (await import('./src/vo.json', {with: {type: 'json'}})).default;
      const reel = findReel('$id'); let at = 0; const out = [];
      reel.scenes.forEach((s, i) => { const v = s.vo ? (vo['$id-' + i] ?? 0) + 0.3 + (reel.breath ?? 0) : 0;
        const f = Math.ceil(Math.max(s.min ?? (s.kind === 'cta' ? 2 : 1.8), v) * 30); out.push(at + Math.floor(f * 0.7)); at += f; });
      console.log(out.join(' '));
    });" 2>/dev/null)
  for f in $frames; do
    npx remotion still src/index.ts "$id" "out/stills/$id-$f.jpg" --frame="$f" --browser-executable="$B" --log=error >/dev/null 2>&1
  done
  ffmpeg -v error -y $(for f in $frames; do echo -i "out/stills/$id-$f.jpg"; done) \
    -filter_complex "$(i=0; for f in $frames; do printf "[$i]scale=300:-1[v$i];"; i=$((i+1)); done; for ((j=0;j<i;j++)); do printf "[v$j]"; done; echo "hstack=$i")" \
    "out/stills/$id-sheet.jpg"
  echo "out/stills/$id-sheet.jpg"
done
