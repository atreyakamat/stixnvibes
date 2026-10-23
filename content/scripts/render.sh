#!/usr/bin/env bash
# Render reels in two versions:
#   out/post/<id>.mp4     voiceover only; add the song in Instagram's music picker
#   out/preview/<id>.mp4  voiceover + music mix, for review only (music is not licensed for posting)
# Usage: scripts/render.sh day-01 r001 ...   (no args = all 30 challenge days; "series" = r001..r100)
set -euo pipefail
cd "$(dirname "$0")/.."
B="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
ids=("$@")
if [ ${#ids[@]} -eq 0 ]; then ids=($(seq -f "day-%02g" 1 30)); fi
if [ "${ids[0]}" = series ]; then ids=($(seq -f "r%03g" 1 100)); fi
mkdir -p out/post out/preview
for kind in preview post; do
  for id in "${ids[@]}"; do
    music=false; [ "$kind" = preview ] && music=true
    npx remotion render src/index.ts "$id" "out/$kind/$id.mp4" \
      --props="{\"id\":\"$id\",\"music\":$music}" \
      --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=192k \
      --browser-executable="$B" --log=error
    # Instagram plays audio around -14 LUFS; normalise so reels aren't quiet.
    ffmpeg -v error -y -i "out/$kind/$id.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k \
      -movflags +faststart "out/$kind/$id.tmp.mp4" && mv "out/$kind/$id.tmp.mp4" "out/$kind/$id.mp4"
    echo "out/$kind/$id.mp4"
  done
done
