import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\32edf6b4-5073-4fed-a1a4-2cb110f58e20';

async function run() {
  console.log('Launching Edge browser for Dashboard screenshot...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Pre-seed authenticated user in localStorage
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('skyops_user', JSON.stringify({
      id: 'demo-operator-1',
      email: 'operator@skyops.aero',
      name: 'Sarah Chen',
      role: 'Operator'
    }));
  });

  // 1. Desktop
  console.log('Capturing Desktop /home...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_no_gray_band_desktop.png'), fullPage: false });

  // 2. Tablet
  console.log('Capturing Tablet /home...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_no_gray_band_tablet.png'), fullPage: false });

  // 3. Mobile
  console.log('Capturing Mobile /home...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollBy({ top: 340, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_no_gray_band_mobile.png'), fullPage: false });

  await browser.close();
  console.log('All responsive screenshots captured!');
}

run().catch(err => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
