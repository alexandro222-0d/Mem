// Рендерит каждую сцену из scenes.html в PNG 1920x1080.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const file = 'file://' + path.resolve(__dirname, 'scenes.html');
  for (const s of ['s1', 's2', 's3']) {
    await p.goto(file + '?s=' + s);
    await p.screenshot({ path: path.resolve(__dirname, s + '.png') });
  }
  await b.close();
})();
