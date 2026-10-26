"""Генерирует фоновую музыку и звуковые эффекты без сторонних лицензий.
python3 music.py <папка> → music.wav (3 мин, спокойный эмбиент), click.wav, cash.wav"""
import sys, wave
import numpy as np

SR = 44100
out = sys.argv[1] if len(sys.argv) > 1 else '.'


def save(name, x):
    x = np.clip(x, -1, 1)
    st = np.stack([x, x], 1) if x.ndim == 1 else x
    with wave.open(f'{out}/{name}', 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())


def lowpass(x, a):
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += a * (v - acc); y[i] = acc
    return y


note = lambda m: 440 * 2 ** ((m - 69) / 12)
# Am – F – C – G, по 4 секунды
chords = [[57, 60, 64], [53, 57, 60], [48, 55, 64], [55, 59, 62]]
bar = 4.0
total = 180.0
t = np.arange(int(SR * total)) / SR
pad = np.zeros_like(t)
pluck = np.zeros_like(t)
for k in range(int(total / bar)):
    ch = chords[k % 4]
    s0, s1 = int(k * bar * SR), int((k + 1) * bar * SR)
    tt = t[s0:s1] - k * bar
    env = np.minimum(1, tt / 1.2) * np.minimum(1, (bar - tt) / 0.8)
    for m in ch:
        f = note(m)
        pad[s0:s1] += env * (np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 1.003 * tt)) / 6
    # тихое арпеджио восьмыми
    for j in range(8):
        m = ch[j % 3] + 12
        a = s0 + int(j * bar / 8 * SR)
        n = int(0.9 * SR)
        seg = np.arange(min(n, len(t) - a)) / SR
        pluck[a:a + len(seg)] += np.sin(2 * np.pi * note(m) * seg) * np.exp(-seg * 5) * 0.12
    # бас
    tb = tt
    pad[s0:s1] += env * np.sin(2 * np.pi * note(ch[0] - 12) * tb) * 0.18

mix = lowpass(pad + pluck, 0.18)
fade = np.minimum(1, t / 2) * np.minimum(1, (total - t) / 3)
mix = mix * fade
mix = mix / np.abs(mix).max() * 0.5
save('music.wav', mix)

# щелчок
n = int(0.06 * SR); tt = np.arange(n) / SR
click = np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 90) * 0.6
save('click.wav', click)

# «касса»: два колокольчика
n = int(0.7 * SR); tt = np.arange(n) / SR
bell = lambda f, d: np.where(tt >= d, np.sin(2 * np.pi * f * (tt - d)) * np.exp(-(tt - d) * 7), 0)
cash = (bell(2093, 0) + bell(2637, 0.09) + 0.4 * bell(4186, 0.09)) * 0.35
save('cash.wav', cash)
print('ok')
