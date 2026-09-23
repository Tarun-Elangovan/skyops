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

  // 1. Dashboard
  console.log('Navigating to /app/dashboard...');
  await page.goto('http://localhost:5173/app/dashboard', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));
  const dashboardPath = path.join(ARTIFACT_DIR, 'dashboard_no_subtitle.png');
  await page.screenshot({ path: dashboardPath, fullPage: false });
  console.log(`Saved dashboard: ${dashboardPath}`);

  // 2. Predictions
  console.log('Navigating to /app/predictions...');
  await page.goto('http://localhost:5173/app/predictions', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));
  const predictionsPath = path.join(ARTIFACT_DIR, 'predictions_no_subtitle.png');
  await page.screenshot({ path: predictionsPath, fullPage: false });
  console.log(`Saved predictions: ${predictionsPath}`);

  // 3. Alerts
  console.log('Navigating to /app/alerts...');
  await page.goto('http://localhost:5173/app/alerts', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));
  const alertsPath = path.join(ARTIFACT_DIR, 'alerts_no_subtitle.png');
  await page.screenshot({ path: alertsPath, fullPage: false });
  console.log(`Saved alerts: ${alertsPath}`);

  await browser.close();
  console.log('All verification screenshots captured!');
}

run().catch(err => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
