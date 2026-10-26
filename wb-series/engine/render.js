// Собирает серию в MP4 9:16: node render.js s01e01
// Если есть build/<id>/voice/NN.mp3 — длина кадров подстраивается под озвучку,
// иначе берётся оценка по длине текста (черновик без голоса).
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const loadEpisode = require('./episode');

const id = process.argv[2] || 's01e01';
const FPS = 25;
const PAUSE = 0.35; // пауза после фразы
const root = path.join(__dirname, '..');
const build = path.join(root, 'build', id);
const assets = path.join(root, 'assets');
fs.mkdirSync(build, { recursive: true });

const duration = (f) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());

(async () => {
  const ep = loadEpisode(id);
  const voices = ep.lines.map((_, i) => path.join(build, 'voice', `${String(i + 1).padStart(2, '0')}.mp3`));
  const voiced = voices.every(f => fs.existsSync(f));

  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await p.goto('file://' + path.join(__dirname, 'player.html') + '?ep=' + id);
  if (voiced) {
    const t = ep.lines.map((l, i) => duration(voices[i]) + PAUSE + (l.scene.tail || 0));
    await p.evaluate((t) => { window.TIMINGS = t; }, t);
  }
  const timings = await p.evaluate(() => TIMINGS);
  const total = timings.reduce((a, b) => a + b, 0);
  const starts = timings.map((_, i) => timings.slice(0, i).reduce((a, b) => a + b, 0));
  console.log(`${voiced ? 'с озвучкой' : 'ЧЕРНОВИК без озвучки'} · ${ep.lines.length} кадров · ${total.toFixed(1)} сек`);

  // 1. Видео: кадры → ffmpeg
  const silent = path.join(build, 'video.mp4');
  if (!(process.env.AUDIO_ONLY && fs.existsSync(silent))) {
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  const frames = Math.ceil(total * FPS);
  for (let f = 0; f < frames; f++) {
    await p.evaluate((t) => renderAt(t), f / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % (FPS * 10) === 0) console.log(`кадры ${Math.round(f / frames * 100)}%`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  }
  await b.close();

  // 2. Звук: голос по таймингам + эффекты + музыка (тише под голосом)
  const inputs = ['-i', path.join(assets, 'music.wav')];
  const parts = [];
  let n = 1;
  ep.lines.forEach((l, i) => {
    const ms = Math.round(starts[i] * 1000);
    if (voiced) { inputs.push('-i', voices[i]); parts.push(`[${n + 1}:a]adelay=${ms}|${ms},volume=1.0[v${n}]`); n++; }
    if (l.scene.sfx) { inputs.push('-i', path.join(assets, `${l.scene.sfx}.wav`)); parts.push(`[${n + 1}:a]adelay=${ms + 150}|${ms + 150},volume=0.5[v${n}]`); n++; }
  });
  const labels = Array.from({ length: n - 1 }, (_, k) => `[v${k + 1}]`).join('');
  const music = `[1:a]atrim=0:${total.toFixed(2)},afade=t=out:st=${(total - 2).toFixed(2)}:d=2,volume=${voiced ? 0.12 : 0.3}[m]`;
  const filter = [music, ...parts, `[m]${labels}amix=inputs=${n}:normalize=0:duration=first,alimiter=limit=0.95[out]`].join(';');
  const final = path.join(build, `${id}${voiced ? '' : '_draft'}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, ...inputs, '-filter_complex', filter,
    '-map', '0:v', '-map', '[out]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', final], { stdio: 'inherit' });
  console.log('готово:', final);
})();
