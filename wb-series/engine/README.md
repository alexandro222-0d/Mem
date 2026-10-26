# Движок серий «Селлер с нуля»

Кадры 9:16 рисуются в HTML/SVG (`player.html` + `lib.js`), серия описывается в `../episodes/<id>.js`:
каждая строка = одна фраза озвучки + один кадр.

```bash
python3 engine/music.py assets              # один раз: музыка и звуки (своя генерация, без лицензий)
node engine/preview.js s01e01 <папка>       # стоп-кадры всех сцен для проверки
node engine/tts.js s01e01                   # озвучка ElevenLabs → build/s01e01/voice/NN.mp3
node engine/render.js s01e01                # MP4 → build/s01e01/s01e01.mp4
```

- Без озвучки `render.js` собирает черновик `s01e01_draft.mp4` с примерными таймингами.
- С озвучкой длина каждого кадра = длина фразы + 0.35 сек паузы.
- `tts.js` берёт `ELEVENLABS_API_KEY` и `ELEVENLABS_VOICE_ID` из окружения
  (модель по умолчанию `eleven_multilingual_v2`, можно сменить через `ELEVENLABS_MODEL`).
- `AUDIO_ONLY=1 node engine/render.js s01e01` — пересобрать только звук, не перерисовывая кадры.
- Playwright: если `require('playwright')` не находится, запускать с `NODE_PATH=$(npm root -g)`.
