// Снимает каждый кадр серии в «устоявшемся» состоянии: node preview.js s01e01 <папка>
const { chromium } = require('playwright');
const path = require('path');
const [ep = 's01e01', out = '.'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.error('PAGE ERROR', e.message));
  await p.goto('file://' + path.resolve(__dirname, 'player.html') + '?ep=' + ep);
  const n = await p.evaluate(() => TIMINGS.length);
  for (let i = 0; i < n; i++) {
    await p.evaluate((i) => {
      const start = TIMINGS.slice(0, i).reduce((a, b) => a + b, 0);
      renderAt(start + TIMINGS[i] - 0.05);
    }, i);
    await p.screenshot({ path: path.join(out, `${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 80 });
  }
  console.log('scenes', n, 'duration', await p.evaluate(() => totalDuration().toFixed(1)));
  await b.close();
})();
