const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const filename = process.argv[2] || 'cap-database-design';
  const outPath  = path.resolve(__dirname, filename + '.png');
  const htmlUrl  = 'file:///' + path.resolve(__dirname, 'db-design.html').replace(/\\/g, '/');

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-file-access-from-files',
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1280, deviceScaleFactor: 2 });

  console.log('Loading:', htmlUrl);
  await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for Mermaid to render and JS color injection to run
  console.log('Waiting for diagram render...');
  await new Promise(r => setTimeout(r, 6000));

  // Resize viewport to full page height
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: 1920, height: bodyHeight, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Taking screenshot...');
  await page.screenshot({ path: outPath, fullPage: true, type: 'png' });

  await browser.close();
  console.log('✅ Saved to:', outPath);
})();
