#!/usr/bin/env bash
# Render one still per scene (mid-scene) for a quick visual check.
# Usage: scripts/stills.sh day-02 [day-05 ...]
set -euo pipefail
cd "$(dirname "$0")/.."
B="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
mkdir -p out/stills
for id in "$@"; do
  day=$((10#${id#day-}))
  frames=$(node --experimental-strip-types -e "
    import('./src/reels.ts').then(async ({REELS}) => {
      const vo = (await import('./src/vo.json', {with: {type: 'json'}})).default;
      const reel = REELS.find(r => r.day === $day); let at = 0; const out = [];
      reel.scenes.forEach((s, i) => { const v = s.vo ? (vo[\`\${$day}-\${i}\`] ?? 0) + 0.55 : 0;
        const f = Math.ceil(Math.max(s.min ?? (s.kind === 'cta' ? 2.4 : 2.5), v) * 30); out.push(at + Math.floor(f * 0.7)); at += f; });
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
