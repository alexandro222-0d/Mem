"""Озвучка серии по shots.json временным голосом (edge-tts) + тайминги слов.

usage: python3 voice_ep.py <ep_dir>
Пишет <ep_dir>/assets/voice.mp3 и <ep_dir>/timing.json.
Если в <ep_dir>/assets/lines/ уже лежат line_NN.wav (например, нарезка настоящего голоса),
они используются вместо генерации.
"""
import asyncio, json, os, re, subprocess, sys, time

import certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts

VOICE = "ru-RU-DmitryNeural"
SLOW, PITCH = 0.85, 0.9
LEAD = 0.4

ep = sys.argv[1]
shots = json.load(open(f"{ep}/shots.json"))
lines_dir = f"{ep}/assets/lines"
os.makedirs(lines_dir, exist_ok=True)


def plain(t):
    return re.sub(r"\[/?[RY]\]", "", t)


def tokens(t):
    """[(word, color)] — color: R, Y or ''"""
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
    # знаки препинания, приклеенные к закрывающему тегу
    return out


def dur(p):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]))


async def synth(text, path):
    c = edge_tts.Communicate(text, VOICE)
    await c.save(path)


for i, s in enumerate(shots):
    wav = f"{lines_dir}/line_{i:02d}.wav"
    if os.path.exists(wav):
        continue
    raw = f"{lines_dir}/_raw.mp3"
    text = plain(s["text"]).replace("—", ",")
    for k in range(25):
        try:
            if os.path.exists(raw):
                os.remove(raw)
            asyncio.run(synth(text, raw))
            if os.path.getsize(raw) > 0:
                break
        except Exception:
            pass
        time.sleep(2 + k)
    else:
        sys.exit("tts failed: " + text)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af",
                    f"asetrate=24000*{PITCH},aresample=44100,atempo={SLOW / PITCH:.4f},"
                    "silenceremove=start_periods=1:start_threshold=-50dB,areverse,"
                    "silenceremove=start_periods=1:start_threshold=-50dB,areverse",
                    "-ac", "1", wav], check=True)
    os.remove(raw)
    print("line", i, round(dur(wav), 2), flush=True)

# тайминги
t = LEAD
lines = []
for i, s in enumerate(shots):
    wav = f"{lines_dir}/line_{i:02d}.wav"
    d = dur(wav)
    toks = tokens(s["text"])
    tot = sum(len(w) + 3 for w, _ in toks)
    acc, words = 0, []
    for w, c in toks:
        ws = t + d * acc / tot
        acc += len(w) + 3
        words.append({"w": w, "c": c, "s": round(ws, 3), "e": round(t + d * acc / tot, 3)})
    lines.append({"start": round(t, 3), "end": round(t + d, 3), "words": words})
    t += d + s.get("pause", 0.4)
total = round(t + 0.3, 2)

# склейка
inputs, n = ["-f", "lavfi", "-t", str(LEAD), "-i", "anullsrc=r=44100:cl=mono"], 1
for i, s in enumerate(shots):
    inputs += ["-i", f"{lines_dir}/line_{i:02d}.wav"]
    inputs += ["-f", "lavfi", "-t", str(s.get("pause", 0.4)), "-i", "anullsrc=r=44100:cl=mono"]
    n += 2
fc = "".join(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono[a{i}];" for i in range(n))
fc += "".join(f"[a{i}]" for i in range(n)) + f"concat=n={n}:v=0:a=1,loudnorm=I=-14:TP=-1.5:LRA=11[o]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", fc, "-map", "[o]", "-ar", "44100",
                f"{ep}/assets/voice.mp3"], check=True)
json.dump({"total": total, "lines": lines}, open(f"{ep}/timing.json", "w"), ensure_ascii=False, indent=1)
print("total", total)
