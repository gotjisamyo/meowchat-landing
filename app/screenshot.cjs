const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for content to load
  await page.waitForSelector('.min-h-screen', { timeout: 10000 }).catch(() => {});
  
  // Take screenshot
  await page.screenshot({ 
    path: '/home/got/.openclaw/workspace/meowchat-admin-dashboard/screenshot.png',
    fullPage: true
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();
