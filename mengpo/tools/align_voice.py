"""Подгоняет серию под готовую озвучку (например, из SYNTX) одним файлом.

usage: python3 align_voice.py <ep_dir> <voice_file>
Распознаёт слова (faster-whisper), сопоставляет со сценарием shots.json и пишет
<ep_dir>/assets/voice.mp3 и <ep_dir>/timing.json. Потом: build_ep.py <ep_dir>.
"""
import difflib, json, os, re, subprocess, sys

import numpy as np

os.environ.setdefault("REQUESTS_CA_BUNDLE", "/root/.ccr/ca-bundle.crt")
from faster_whisper import WhisperModel

sys.path.insert(0, os.path.dirname(__file__))
ep, src = sys.argv[1], sys.argv[2]
shots = json.load(open(f"{ep}/shots.json"))


def tokens(t):
    out, color = [], ""
    for part in re.split(r"(\[/?[RY]\])", t):
        if part in ("[R]", "[Y]"):
            color = part[1]
        elif part in ("[/R]", "[/Y]"):
            color = ""
        else:
            for w in part.split():
                if w in ("—", "-"):
                    continue
                if out and re.fullmatch(r"[.,!?»…:]+", w):
                    out[-1] = (out[-1][0] + w, out[-1][1])
                else:
                    out.append((w, color))
    return out


norm = lambda w: re.sub(r"[^а-яa-z0-9]", "", w.lower().replace("ё", "е"))

# громкость и формат
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "44100",
                f"{ep}/assets/voice.mp3"], check=True)
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f"{ep}/assets/voice.mp3", "-ar", "16000", "-ac", "1", "-f", "s16le", "-"],
                     check=True, capture_output=True).stdout
audio = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768
total_audio = len(audio) / 16000

model = WhisperModel("small", device="cpu", compute_type="int8")
segs, _ = model.transcribe(audio, language="ru", word_timestamps=True)
heard = [(w.word.strip(), float(w.start), float(w.end)) for s in segs for w in s.words]

script = [(li, w, c) for li, s in enumerate(shots) for w, c in tokens(s["text"])]
sm = difflib.SequenceMatcher(a=[norm(w) for _, w, _ in script], b=[norm(w) for w, _, _ in heard], autojunk=False)
times = [None] * len(script)
for a, b, n in sm.get_matching_blocks():
    for k in range(n):
        times[a + k] = (heard[b + k][1], heard[b + k][2])
# несовпавшие слова — интерполяция между соседями
known = [i for i, t in enumerate(times) if t]
for i, t in enumerate(times):
    if t:
        continue
    prev = max([k for k in known if k < i], default=None)
    nxt = min([k for k in known if k > i], default=None)
    s0 = times[prev][1] if prev is not None else 0.0
    s1 = times[nxt][0] if nxt is not None else total_audio
    gap = [k for k in range(prev + 1 if prev is not None else 0, nxt if nxt is not None else len(script))]
    j = gap.index(i)
    step = (s1 - s0) / (len(gap) + 1)
    times[i] = (s0 + step * (j + 0.5), s0 + step * (j + 1.5))
print(f"совпало слов: {len(known)}/{len(script)}")

lines = []
for li, s in enumerate(shots):
    ws = [(w, c, times[i]) for i, (l, w, c) in enumerate(script) if l == li]
    lines.append({"start": round(ws[0][2][0], 3), "end": round(ws[-1][2][1], 3),
                  "words": [{"w": w, "c": c, "s": round(t[0], 3), "e": round(t[1], 3)} for w, c, t in ws]})
total = round(max(total_audio, lines[-1]["end"] + shots[-1].get("pause", 2)) + 0.3, 2)
json.dump({"total": total, "lines": lines}, open(f"{ep}/timing.json", "w"), ensure_ascii=False, indent=1)
print("total", total)
