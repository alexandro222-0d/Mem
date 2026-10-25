"""Собирает index.html серии из shots.json + timing.json.

usage: python3 build_ep.py <ep_dir> "<ЗАГОЛОВОК>"
"""
import json, subprocess, sys

ep = sys.argv[1]
shots = json.load(open(f"{ep}/shots.json"))
timing = json.load(open(f"{ep}/timing.json"))
lines, total = timing["lines"], timing["total"]

# границы планов: план начинается чуть раньше своей реплики
starts = [0.0] + [max(0.0, lines[i]["start"] - 0.15) for i in range(1, len(shots))]
ends = starts[1:] + [total]
data_shots = [{"scene": s["scene"], "opt": s.get("opt", {}), "start": round(a, 3), "dur": round(b - a, 3)}
              for s, a, b in zip(shots, starts, ends)]

hud_hide = [[a, b] for s, a, b in zip(shots, starts, ends) if s["scene"] in ("titleCard", "endCard")]
court_at = next((round(a + 0.3, 3) for s, a in zip(shots, starts) if s["scene"] == "court"), None)

sections = []
for i, (a, b) in enumerate(zip(starts, ends)):
    p = f"s{i}"
    layers = "".join(f'<div class="layer" id="{p}-L-{L}"><svg viewBox="0 0 1080 1920" id="{p}-{L}"></svg></div>' for L in ("bg", "mid", "fg"))
    sections.append(f'  <section id="{p}" class="clip" data-start="{a:.3f}" data-duration="{b - a:.3f}" data-track-index="0">'
                    f'<div class="shot" id="{p}-in"><div class="shot" id="{p}-cam">{layers}</div></div></section>')

# звук
audio, n = [], 0


def snd(src, start, dur, vol):
    global n
    n += 1
    audio.append(f'  <audio id="a{n}" src="assets/{src}" data-start="{start:.3f}" data-duration="{dur:.3f}" data-track-index="{10 + n}" data-volume="{vol}"></audio>')


snd("voice.mp3", 0, total, 1)
dr = 0
while dr < total:
    snd("sfx/drone.wav", dr, min(13, total - dr), 0.3)
    dr += 13
RAINY = {"house", "door", "uchanyDoor", "whiteClose", "body"}
BOIL = {"bridgeWide", "mpClose"}
prev = None
for s, a, b in zip(shots, starts, ends):
    sc, o = s["scene"], s.get("opt", {})
    d = b - a
    if sc in RAINY:
        snd("sfx/rain.wav", a, min(6, d), 0.25)
    if sc in BOIL:
        snd("sfx/boil.wav", a, min(6, d), 0.18)
    if sc != prev and a > 0:
        snd("sfx/whoosh.wav", max(0, a - 0.25), 0.7, 0.22)
    if sc == "tablet" and not o.get("rule"):
        snd("sfx/gong.wav", a, min(3, d + 1), 0.5)
    if sc == "door" and o.get("knock"):
        snd("sfx/knock.wav", a + 0.12, 1.1, 0.9)
    if sc == "lanBridge" and o.get("refuse"):
        snd("sfx/boom.wav", a + 0.55, 1.6, 0.85)
    if sc == "chain":
        snd("sfx/chain.wav", a + (0.5 if not o.get("taut") else 0.1), 0.35, 0.8)
        if not o.get("taut"):
            snd("sfx/boom.wav", a + 0.55, 1.6, 0.6)
    if sc == "court":
        snd("sfx/boom.wav", a + 0.1, 1.6, 0.6)
    if sc in ("titleCard", "endCard"):
        snd("sfx/gong.wav", a, 3, 0.5)
    prev = sc

data = {"shots": data_shots, "lines": lines, "total": total, "hudHide": hud_hide, "courtAt": court_at}

html = f"""<!doctype html>
<html lang="ru" data-resolution="portrait">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="assets/gsap.min.js"></script>
<script src="assets/lib.js"></script>
<link rel="stylesheet" href="assets/style.css" />
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1080" data-height="1920">
{chr(10).join(sections)}
  <div id="hud" class="clip" data-start="0" data-duration="{total}" data-track-index="1">
    <div class="plaque" id="plq-knots"><span class="lbl">УЗЕЛКИ</span><div class="knots">{''.join('<div class="knot"></div>' for _ in range(7))}</div></div>
    <div class="plaque" id="plq-court"><span class="lbl">СУД</span><span class="cn"><span id="court0">0/10</span><span id="court1">1/10</span></span></div>
  </div>
  <div id="subs" class="clip" data-start="0" data-duration="{total}" data-track-index="2"></div>
  <div id="flash" class="clip" data-start="0" data-duration="{total}" data-track-index="3"></div>
  <div id="vignette" class="clip" data-start="0" data-duration="{total}" data-track-index="4"></div>
  <svg id="grain" class="clip" data-start="0" data-duration="{total}" data-track-index="5" viewBox="0 0 1080 1920">
    <filter id="grainF"><feTurbulence id="turb" type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="1080" height="1920" filter="url(#grainF)"/>
  </svg>
{chr(10).join(audio)}
</div>
<script>
window.__timelines = window.__timelines || {{}};
buildEpisode({json.dumps(data, ensure_ascii=False)});
</script>
</body>
</html>
"""
open(f"{ep}/index.html", "w").write(html)
# фоновый гул нужной длины
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "sine=f=55:d=13", "-f", "lavfi", "-i", "sine=f=82.5:d=13",
                "-f", "lavfi", "-i", "anoisesrc=color=brown:d=13:a=0.5", "-filter_complex",
                "[0]volume=0.5[a];[1]volume=0.25[b];[2]lowpass=f=260,volume=0.6[c];[a][b][c]amix=3,afade=t=in:d=1,afade=t=out:st=12:d=1",
                f"{ep}/assets/sfx/drone.wav"], check=True)
print("shots", len(shots), "total", total)
