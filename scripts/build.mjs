// Baut die Antreiber-App:
//  www/index.html  = kleiner Lader für die Android- und iPhone-App. Er startet die eingebaute Version oder eine
//                    heruntergeladene neuere. Startet eine neue Version nicht sauber, nimmt er beim nächsten Start
//                    wieder die eingebaute.
//  www/…           = feste Dateien (Schriften, Logo, Capacitor) aus static/
//  dist/app.html + dist/version.json = Update-Dateien für das Release „neueste Version“
//  web/            = Web-Fassung für GitHub Pages (im Browser nutzbar, am iPhone „Zum Home-Bildschirm“),
//                    mit Service Worker, damit sie auch ohne Internet läuft
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const META = JSON.parse(readFileSync('app-meta.json', 'utf8'));
const legal = readFileSync('src/rechtliches.html', 'utf8').replace(/<!--[\s\S]*?-->\s*/, '');
const html = readFileSync('src/app.html', 'utf8').replace('<!-- RECHTLICHES -->', legal);
if (!html.includes('class="stack legal"')) throw new Error('Platzhalter <!-- RECHTLICHES --> fehlt in src/app.html');
const version = createHash('sha256').update(html).digest('hex').slice(0, 12);
const b64 = Buffer.from(html, 'utf8').toString('base64');

const loader = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>html,body{margin:0;background:#fdf6f0}@media (prefers-color-scheme:dark){html,body{background:#1a1714}}</style></head><body>
<script id="builtin" type="text/plain">${b64}</script>
<script>
window.__AB_SHELL = ${META.shell};
window.__AB_UPDATE = ${JSON.stringify({ base: META.updateBase, apk: META.apkUrl })};
(function(){
  var BUILTIN = '${version}', html = null, v = BUILTIN;
  function ls(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,x){ try{ x === null ? localStorage.removeItem(k) : localStorage.setItem(k,x); }catch(e){} }
  window.__AB_BUILTIN = BUILTIN;
  var sv = ls('ab-bundle-v'), sh = ls('ab-bundle');
  // Neue App installiert? Dann gilt deren eingebaute Version, alte Downloads verwerfen.
  if(sv && ls('ab-bundle-base') !== BUILTIN){ set('ab-bundle', null); set('ab-bundle-v', null); sv = null; }
  if(sv && sh && sv !== BUILTIN){
    if(ls('ab-boot-try') === sv && ls('ab-boot-ok') !== sv){ set('ab-bundle', null); set('ab-bundle-v', null); set('ab-bundle-bad', sv); }
    else { html = sh; v = sv; }
  }
  if(!html){
    var b = document.getElementById('builtin').textContent.trim(), bin = atob(b), u = new Uint8Array(bin.length);
    for(var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    html = new TextDecoder().decode(u); v = BUILTIN;
  }
  set('ab-boot-try', v); window.__AB_RUNNING = v;
  document.open(); document.write(html); document.close();
})();
</script></body></html>`;

// Eigenständige Seite Datenschutz + Impressum (Link für die Stores)
const legalPage = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Datenschutz und Impressum – Antreiber</title><link rel="icon" href="icon-192.png">
<style>
@font-face{font-family:"Atkinson Hyperlegible";font-weight:400;src:url(fonts/atkinson-hyperlegible-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:"Atkinson Hyperlegible";font-weight:700;src:url(fonts/atkinson-hyperlegible-latin-700-normal.woff2) format("woff2")}
:root{color-scheme:light dark}
body{margin:0;padding:28px 18px 48px;background:#fdf6f0;color:#2a2420;font:17px/1.55 "Atkinson Hyperlegible",system-ui,sans-serif}
@media (prefers-color-scheme:dark){body{background:#1a1714;color:#f1e9e2} a{color:#fb8a40} .hint{color:#b4a79c}}
main{max-width:640px;margin:0 auto} h1{font-size:30px;line-height:1.15;margin:0 0 6px} h2{font-size:23px;margin:22px 0 6px} h3{font-size:18px;margin:16px 0 4px} p,ul{margin:0 0 10px}
a{color:#b9561a} mark{background:#ffe58a;color:#2a2420;padding:0 4px;border-radius:4px} .hint{color:#6d625a;font-size:14px}
.stack{display:flex;flex-direction:column;gap:8px}
</style></head><body><main>
<h1>Antreiber – Selbsttest</h1><p class="hint">App von MAYOKA andersch gsund, Dornbirn · <a href="./">Zur App</a></p>
${legal}
</main></body></html>`;

// Android/iPhone-App
rmSync('www', { recursive: true, force: true });
mkdirSync('www', { recursive: true });
cpSync('static', 'www', { recursive: true });
writeFileSync('www/index.html', loader);
writeFileSync('www/datenschutz.html', legalPage);

// Update-Dateien
mkdirSync('dist', { recursive: true });
writeFileSync('dist/app.html', html);
writeFileSync('dist/version.json', JSON.stringify({
  version, shell: META.shell, minShell: META.minShell, apkUrl: META.apkUrl, built: new Date().toISOString()
}, null, 2));

// Web-Fassung (GitHub Pages)
rmSync('web', { recursive: true, force: true });
mkdirSync('web', { recursive: true });
cpSync('static', 'web', { recursive: true });
writeFileSync('web/index.html', html.replace('<script src="capacitor-core.js"></script>', `<script>window.__AB_WEB=true;window.__AB_RUNNING="${version}"</script>\n<script src="capacitor-core.js"></script>`));
writeFileSync('web/datenschutz.html', legalPage);
writeFileSync('web/.nojekyll', '');
const files = ['./', 'index.html', 'datenschutz.html', 'manifest.webmanifest', 'capacitor-core.js', 'mayoka-logo.png',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png',
  ...readdirSync('static/fonts').map(f => 'fonts/' + f)];
writeFileSync('web/sw.js', `// Service Worker: legt die App im Browser ab, damit sie auch ohne Internet startet.
// Jede neue Version bekommt einen neuen Namen; alte Ablagen werden gelöscht.
const CACHE = 'antreiber-${version}';
const FILES = ${JSON.stringify(files)};
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Seitenaufrufe: die passende Seite aus der Ablage (Startseite oder datenschutz.html), sonst aus dem Netz
  const nav = e.request.mode === 'navigate';
  e.respondWith(caches.match(e.request, { ignoreSearch: true })
    .then(r => r || (nav && new URL(e.request.url).pathname.endsWith('/') ? caches.match('index.html') : undefined))
    .then(r => r || fetch(e.request).catch(() => nav ? caches.match('index.html') : undefined)));
});
`);
console.log('Antreiber gebaut: Inhalt', version, '· Shell', META.shell, '· Web-Fassung in web/');
