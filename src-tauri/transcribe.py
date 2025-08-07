# transcribe.py

import whisper
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python whisper.py path_to_audio_file")
    sys.exit(1)

audio_path = sys.argv[1]

if not os.path.isfile(audio_path):
    print(f"File not found: {audio_path}")
    sys.exit(1)

model = whisper.load_model("small.en")  # You can use "small", "medium", "large"

result = model.transcribe(audio_path, fp16=False)

print(result["text"])
