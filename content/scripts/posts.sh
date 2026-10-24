#!/usr/bin/env bash
# Render the "we're coming to…" announcement in every style.
#   out/posts/feed/<style>.png    1080x1350 still for the grid
#   out/posts/story/<style>.mp4   1080x1920, 6 s animated story (silent; add music in Instagram)
#   out/posts/story/<style>.png   the story's last frame, if you'd rather post a still
# Edit src/posts/events.json first. Usage: scripts/posts.sh [style ...]   (no args = all six)
set -euo pipefail
cd "$(dirname "$0")/.."
B="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
styles=("$@")
if [ ${#styles[@]} -eq 0 ]; then styles=(lemon-slam ink-ticket map-pin sticker-sheet polaroid-crowd countdown); fi
mkdir -p out/posts/feed out/posts/story
for s in "${styles[@]}"; do
  npx remotion still src/index.ts "post-$s-feed" "out/posts/feed/$s.png" --browser-executable="$B" --log=error
  npx remotion still src/index.ts "post-$s-story" "out/posts/story/$s.png" --frame=179 --browser-executable="$B" --log=error
  npx remotion render src/index.ts "post-$s-story" "out/posts/story/$s.mp4" --codec=h264 --crf=18 --muted \
    --browser-executable="$B" --log=error
  echo "$s done"
done
