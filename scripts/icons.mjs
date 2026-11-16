// Erzeugt aus assets/icon.svg alle Bild-Dateien, die Web, iPhone und Stores brauchen.
// Aufruf: node scripts/icons.mjs   (nur nötig, wenn sich das Symbol ändert)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');   // Playwright ist am Bau-Rechner global installiert

const svg = readFileSync('assets/icon.svg', 'utf8');
const logo = readFileSync('static/mayoka-logo.png').toString('base64');
const grad = 'linear-gradient(135deg,#FDD2B2,#BEE6F3)';
const wrap = (body, w, h, bg = grad) =>
  `<html><body style="margin:0;width:${w}px;height:${h}px;background:${bg};display:grid;place-items:center;overflow:hidden">${body}</body></html>`;

const jobs = [
  // Web-App (Home-Bildschirm, Lesezeichen)
  { out: 'static/icon-192.png', w: 192, h: 192, html: wrap(svg.replace('<svg', '<svg width="192" height="192"'), 192, 192, 'transparent') },
  { out: 'static/icon-512.png', w: 512, h: 512, html: wrap(svg.replace('<svg', '<svg width="512" height="512"'), 512, 512, 'transparent') },
  // „maskable“: Symbol kleiner, Hintergrund füllt alles – Android schneidet selbst die Form zu
  { out: 'static/icon-maskable-512.png', w: 512, h: 512, html: wrap(svg.replace('<svg', '<svg width="400" height="400"'), 512, 512) },
  // iPhone: Symbol am Home-Bildschirm (Web) und App-Symbol (Store, immer ohne Transparenz, Apple rundet selbst ab)
  { out: 'static/apple-touch-icon.png', w: 180, h: 180, html: wrap(svg.replace('<svg', '<svg width="180" height="180"'), 180, 180) },
  { out: 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', w: 1024, h: 1024, html: wrap(svg.replace('<svg', '<svg width="1024" height="1024"'), 1024, 1024) },
  // Startbild iPhone (ein Bild für alle Größen, Mitte zählt)
  { out: 'ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png', w: 2732, h: 2732, html: wrap(svg.replace('<svg', '<svg width="520" height="520" style="border-radius:110px;box-shadow:0 30px 80px rgba(0,0,0,.12)"'), 2732, 2732) },
  // Play Store: Vorschaubild („Feature-Grafik“, 1024×500)
  { out: 'store/feature-graphic.png', w: 1024, h: 500, html: wrap(`
      <div style="display:flex;align-items:center;gap:56px;font-family:system-ui,sans-serif;color:#2a2420">
        ${svg.replace('<svg', '<svg width="300" height="300" style="border-radius:64px;box-shadow:0 20px 50px rgba(0,0,0,.14)"')}
        <div style="display:grid;gap:14px;max-width:560px">
          <div style="font-size:64px;font-weight:800;line-height:1.05;letter-spacing:-1px">Was treibt<br>mich an?</div>
          <div style="font-size:28px;line-height:1.3;color:#5a4e46">Der Antreiber-Selbsttest.<br>50 Aussagen, 8 Minuten, alles bleibt am Handy.</div>
          <img src="data:image/png;base64,${logo}" style="height:64px;width:auto;background:#fff;border-radius:14px;padding:6px 12px;justify-self:start">
        </div>
      </div>`, 1024, 500) },
];

mkdirSync('store', { recursive: true });
const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
  await page.setContent(j.html);
  await page.screenshot({ path: j.out, omitBackground: j.html.includes('background:transparent') });
  await page.close();
  console.log('erzeugt', j.out);
}
await browser.close();
// Store-Symbol 512×512 (ohne Transparenz) ist dasselbe wie das iPhone-Symbol, nur kleiner
writeFileSync('store/icon-512.png', readFileSync('static/icon-maskable-512.png'));
