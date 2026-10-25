"""Трейлер серии: склейка сильных планов из готового mp4 + финальная карточка.

usage: python3 make_trailer.py <ep_dir> <episode.mp4> <end_card.png> <out.mp4>
Планы режутся по границам из timing.json (как в build_ep.py), со звуком серии.
"""
import json, subprocess, sys

ep, src, card, out = sys.argv[1:5]
timing = json.load(open(f"{ep}/timing.json", encoding="utf-8"))
lines, total = timing["lines"], timing["total"]
starts = [0.0] + [max(0.0, lines[i]["start"] - 0.15) for i in range(1, len(lines))]
ends = starts[1:] + [total]

# суп → отказ → «срок вышел» → вычеркнутое имя → она сама → правило → «Лань!»
PICK = [(0, 0), (2, 3), (18, 18), (21, 21), (25, 26), (30, 30), (32, 32)]
CARD = 3.0
FADE = 0.04

inputs, fc, n = [], "", 0
for a, b in PICK:
    s, e = starts[a], ends[b]
    d = e - s
    inputs += ["-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", src]
    fc += (f"[{n}:v]fps=30,format=yuv420p,setsar=1[v{n}];"
           f"[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=in:d={FADE},afade=t=out:st={d - FADE:.3f}:d={FADE}[a{n}];")
    n += 1
inputs += ["-loop", "1", "-t", str(CARD), "-i", card, "-i", f"{ep}/assets/sfx/gong.wav"]
fc += (f"[{n}:v]fps=30,format=yuv420p,setsar=1,fade=t=in:d=0.3[v{n}];"
       f"[{n + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,apad,atrim=0:{CARD},afade=t=out:st={CARD - 0.8}:d=0.8,volume=0.8[a{n}];")
n += 1
fc += "".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart", out], check=True)
print("trailer", round(sum(ends[b] - starts[a] for a, b in PICK) + CARD, 2), "s")
