// Озвучка серии через ElevenLabs: node tts.js s01e01 [--force]
// Нужны переменные ELEVENLABS_API_KEY и ELEVENLABS_VOICE_ID.
// Каждая строка → build/<id>/voice/NN.mp3; уже готовые файлы не перезаписываются без --force.
const fs = require('fs');
const path = require('path');
const loadEpisode = require('./episode');

const [id = 's01e01', flag] = process.argv.slice(2);
const key = process.env.ELEVENLABS_API_KEY;
const voice = process.env.ELEVENLABS_VOICE_ID;
if (!key || !voice) {
  console.error('Нужны ELEVENLABS_API_KEY и ELEVENLABS_VOICE_ID');
  process.exit(1);
}

(async () => {
  const ep = loadEpisode(id);
  const dir = path.join(__dirname, '..', 'build', id, 'voice');
  fs.mkdirSync(dir, { recursive: true });
  const texts = ep.lines.map(l => l.text);
  for (let i = 0; i < texts.length; i++) {
    const file = path.join(dir, `${String(i + 1).padStart(2, '0')}.mp3`);
    if (fs.existsSync(file) && flag !== '--force') continue;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: texts[i],
        model_id: process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2',
        language_code: 'ru',
        previous_text: texts[i - 1],
        next_text: texts[i + 1],
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.15, speed: 0.95 },
      }),
    });
    if (!res.ok) {
      console.error(`Строка ${i + 1}: ${res.status} ${await res.text()}`);
      process.exit(1);
    }
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${i + 1}/${texts.length}`);
  }
})();
