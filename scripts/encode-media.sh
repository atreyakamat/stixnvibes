#!/usr/bin/env bash
# Rebuilds every video, poster and cutting frame in public/media from the
# original phone clips (G:\Assets). Needs ffmpeg with libsvtav1 and libx264.
#
#   SRC=/path/to/Assets scripts/encode-media.sh            # everything
#   SRC=/path/to/Assets scripts/encode-media.sh hero       # only the hero
#
# Each video is written twice: AV1 (sharp at a small size, used by most
# browsers) and H.264 (fallback for older iPhones and Safari).
set -euo pipefail

SRC=${SRC:?Set SRC to the folder with the original clips}
OUT=$(cd "$(dirname "$0")/.." && pwd)/public/media
ONLY=${1:-all}

HERO="VID_20261014_113814693.mp4"
CLIPS=(
  VID_20261015_113504669.mp4
  VID_20260409_113609912.mp4
  VID_20261016_104344419.mp4
  VID_20260423_125206402.mp4
  VID_20260421_111806788.mp4
  VID_20261015_113815052.mp4
)
CUT="VID_20260925_065824094 (2).mp4"

SHARPEN="cas=0.25"
WIDE_CROP="crop=2160:1350:0:(ih-1350)/2+300"

av1() { local out=$1; shift; ffmpeg -v error -y "$@" -an -c:v libsvtav1 -preset 4 -pix_fmt yuv420p10le -movflags +faststart "$out"; }
h264() { local out=$1; shift; ffmpeg -v error -y "$@" -an -c:v libx264 -preset slower -tune film -profile:v high -pix_fmt yuv420p -movflags +faststart "$out"; }
still() { local out=$1 vf=$2 in=$3 q=$4; ffmpeg -v error -y -ss 1 -i "$in" -frames:v 1 -vf "$vf" -c:v libwebp -quality "$q" "$out"; }

mkdir -p "$OUT/stall" "$OUT/cut"

if [[ $ONLY == all || $ONLY == hero ]]; then
  in="$SRC/$HERO"
  # Desktop: native 2160 px wide crop for AV1, 1920 px for H.264.
  av1  "$OUT/stall/hero-wide.av1.mp4" -t 5 -i "$in" -vf "$WIDE_CROP,$SHARPEN" -crf 44
  h264 "$OUT/stall/hero-wide.mp4"     -t 5 -i "$in" -vf "$WIDE_CROP,scale=1920:-2:flags=lanczos,$SHARPEN" -crf 27
  still "$OUT/stall/hero-wide.webp" "$WIDE_CROP,scale=1920:-2:flags=lanczos,$SHARPEN" "$in" 84
  # Phones: full 1080 x 1920.
  av1  "$OUT/stall/hero-tall.av1.mp4" -t 5 -i "$in" -vf "scale=1080:-2:flags=lanczos,$SHARPEN" -crf 44
  h264 "$OUT/stall/hero-tall.mp4"     -t 5 -i "$in" -vf "scale=1080:-2:flags=lanczos,$SHARPEN" -crf 26
  # The phone poster is the page's largest image, so it stays under 100 KB.
  # The full-resolution video replaces it a moment later.
  still "$OUT/stall/hero-tall.webp" "scale=828:-2:flags=lanczos,$SHARPEN" "$in" 76
fi

if [[ $ONLY == all || $ONLY == clips ]]; then
  for i in "${!CLIPS[@]}"; do
    n=$((i + 1)); in="$SRC/${CLIPS[$i]}"
    av1  "$OUT/stall/clip-$n.av1.mp4" -t 4 -i "$in" -vf "scale=720:-2:flags=lanczos,$SHARPEN" -crf 42
    h264 "$OUT/stall/clip-$n.mp4"     -t 4 -i "$in" -vf "scale=720:-2:flags=lanczos,$SHARPEN" -crf 25
    still "$OUT/stall/clip-$n.webp" "scale=720:-2:flags=lanczos,$SHARPEN" "$in" 78
  done
fi

if [[ $ONLY == all || $ONLY == cut ]]; then
  rm -f "$OUT"/cut/f-*.webp
  # 72 frames across the whole clip, cropped to the cutting area.
  ffmpeg -v error -y -i "$SRC/$CUT" -vf "fps=72/27.35,crop=2160:2700:0:200,scale=760:-2:flags=lanczos" \
    -c:v libwebp -quality 74 "$OUT/cut/f-%03d.webp"
fi

echo "Done. Sizes:"
du -h "$OUT"/stall/* | sort -h | tail -n 8
