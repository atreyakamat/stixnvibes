"""Generate voiceover WAVs with Kokoro (local, free) and write src/vo.json.

Usage: node --experimental-strip-types scripts/dump-vo.ts | python scripts/tts.py <kokoro-dir> [voice]
"""
import json
import re
import sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

# Spoken forms for words the model mispronounces.
SAY = [
    (r"Stix N Vibes", "Sticks n Vibes"),
    (r"Framez", "Frames"),
    (r"@stixnvibes", "at sticks n vibes"),
]

root = Path(__file__).resolve().parent.parent
model_dir = Path(sys.argv[1])
voice = sys.argv[2] if len(sys.argv) > 2 else "af_heart"
kokoro = Kokoro(str(model_dir / "kokoro-v1.0.onnx"), str(model_dir / "voices-v1.0.bin"))

durations = {}
for line in json.load(sys.stdin):
    text = line["text"]
    for pattern, spoken in SAY:
        text = re.sub(pattern, spoken, text)
    samples, rate = kokoro.create(text, voice=voice, speed=1.15, lang="en-us")
    out = root / "public" / "vo" / f"day-{line['day']:02d}" / f"s{line['scene']}.wav"
    out.parent.mkdir(parents=True, exist_ok=True)
    sf.write(out, samples, rate)
    durations[f"{line['day']}-{line['scene']}"] = round(len(samples) / rate, 3)
    print(out.relative_to(root), durations[f"{line['day']}-{line['scene']}"], file=sys.stderr)

(root / "src" / "vo.json").write_text(json.dumps(durations, indent=2) + "\n")
