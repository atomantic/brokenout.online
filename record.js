// Headless Playwright recorder: loads the demo and records a WebM video.
// Usage: node record.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const videoDir = path.join(__dirname, 'videos');
  fs.mkdirSync(videoDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 860 },
    recordVideo: { dir: videoDir, size: { width: 1280, height: 860 } },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('[page error]', msg.text());
  });

  await page.goto('http://localhost:8765/index.html', { waitUntil: 'load' });

  // Tour auto-starts 900ms after load. With 16 steps averaging ~4.1s/step
  // plus route transitions, total runtime is ~73s. Give it 85s for safety.
  await page.waitForTimeout(85000);

  await page.close();
  await context.close();
  await browser.close();

  // Rename the auto-generated file
  const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
  if (files.length) {
    const latest = files
      .map(f => ({ f, t: fs.statSync(path.join(videoDir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t)[0].f;
    const target = path.join(videoDir, 'brokenout-demo.webm');
    fs.renameSync(path.join(videoDir, latest), target);
    console.log('Recorded:', target);
  }
})();
