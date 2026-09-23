import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\32edf6b4-5073-4fed-a1a4-2cb110f58e20';

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
];

async function run() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`Setting viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    // 1. Clear session for Landing Page
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log(`Navigating to Landing Page at ${vp.name}px...`);
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));

    const landingPath = path.join(ARTIFACT_DIR, `landing_${vp.name}.png`);
    await page.screenshot({ path: landingPath, fullPage: false });
    console.log(`Saved: ${landingPath}`);

    // If desktop 1440, also capture signin and pipeline sections
    if (vp.name === '1440') {
      try {
        await page.evaluate(() => {
          document.getElementById('signin')?.scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'landing_signin_card.png') });
        
        await page.evaluate(() => {
          document.getElementById('pipeline')?.scrollIntoView({ behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'landing_pipeline.png') });
      } catch (e) {
        console.log('Extra section scroll note:', e.message);
      }
    }

    // 2. Setup user session in localStorage for Home Page
    await page.evaluate(() => {
      localStorage.setItem('skyops_user', JSON.stringify({
        id: 'demo-operator-1',
        email: 'operator@skyops.aero',
        name: 'Sarah Chen',
        role: 'Operator'
      }));
    });

    // 3. Home Page
    console.log(`Navigating to Home Page at ${vp.name}px...`);
    await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));

    const homePath = path.join(ARTIFACT_DIR, `home_${vp.name}.png`);
    await page.screenshot({ path: homePath, fullPage: false });
    console.log(`Saved: ${homePath}`);

    // For desktop 1440, also capture attention cards & pending recommendations
    if (vp.name === '1440') {
      try {
        await page.evaluate(() => {
          window.scrollBy({ top: 700, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_attention_cards.png') });
      } catch (e) {
        console.log('Home scroll note:', e.message);
      }
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
