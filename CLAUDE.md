# Antreiber – Hinweise für Claude Code

Antworte auf Deutsch (Österreich). Wolfgang (MAYOKA andersch gsund OG, Dornbirn) ist Inhaber, kein Entwickler:
Erkläre Änderungen in Alltagssprache, ohne Fachjargon, und sag am Ende, was er sehen oder testen kann.

## Was die App ist
Selbsttest zu den fünf Antreibern der Transaktionsanalyse (Kahler 1975): 50 eigene Aussagen, Skala 1–5,
Profil als Fünfeck oder Balken (10–50 Punkte, ab 38 „stark“), Vergleich mit dem letzten Test, Verlauf (bis 12 Tests),
je Antreiber Stärke, Kehrseite, Stress-Zeichen, Erlaubnis-Satz, Übung.
Werkzeuge: „Gerade jetzt“ (Stress-Zeichen antippen), Erlaubnis-Karte ziehen/merken (Baukasten je Antreiber: Anlass + Erlaubnis + kleiner Schritt, ~2.000 Kombinationen, Gesehenes wird gemieden), 7-Tage-Übung.
Seite „Hintergrund“ (`src/hintergrund.html`): Herkunft, Belege und Grenzen des Modells mit Quellen – nur Belegtes eintragen.
Antreiber-Farben sind auf Farbschwäche geprüft (Blau, Grün, Orange, Violett, Magenta) – Namen stehen immer dabei.
Android-App `at.mayoka.antreiber` (Capacitor 7), sanfter MAYOKA-Hintergrund, läuft ohne Internet, Antworten bleiben auf dem Gerät.
Dazu Web-Fassung auf GitHub Pages (`https://wolfgangtiefenthaler78-sys.github.io/antreiber/`, am iPhone „Zum Home-Bildschirm“)
und ein iPhone-Projekt (`ios/`, Bau nur über GitHub; auf ein iPhone kommt es erst mit Apple-Entwicklerkonto via TestFlight).
**Völlig getrennt von Atemwetter** (eigenes Projekt, eigene Unterschrift, eigene Releases) – nichts aus Atemwetter verwenden oder verlinken.

## Aufbau
| Teil | Ort |
|---|---|
| Inhalt und Logik (eine Datei) | `src/app.html` (Platzhalter `<!-- RECHTLICHES -->`) |
| Datenschutz und Impressum (ein Text für App und Web) | `src/rechtliches.html` – gelbe `[bitte ergänzen]`-Stellen vor Store-Einreichung füllen |
| Wissenschaftlicher Hintergrund | `src/hintergrund.html` (Platzhalter `<!-- HINTERGRUND -->`) |
| Feste Dateien (Schriften, Logo, Capacitor-Kern) | `static/` |
| Bau: Lader `www/index.html` + Update-Dateien `dist/` + Web-Fassung `web/` (mit Service Worker) | `scripts/build.mjs` (`npm run build`, `npm run android`) |
| Symbole, Startbild, Store-Bilder aus `assets/icon.svg` | `scripts/icons.mjs` (nur bei Symbol-Änderung) |
| iPhone-Projekt | `ios/` (`npx cap sync ios`; Bau in `.github/workflows/ios.yml`, von Hand starten) |
| Store-Unterlagen (Texte, Bilder, Schritte) | `store/` |
| Nativer Stand, Update-Links | `app-meta.json` (`shell` +1 bei Änderungen an Plugins, Berechtigungen, Symbol, `capacitor.config.json`) |
| Android-Projekt, Symbol, Startbild | `android/` (Symbol-Vorlage `assets/icon.svg`) |
| Bau und Veröffentlichung | `.github/workflows/android.yml` (Push auf `main` → Release „neueste Version“ mit `.apk` + `.aab`), `pages.yml` (Push auf `main` → Web-Fassung) |

## Selbst-Aktualisierung
- Inhalt: App prüft beim Öffnen (höchstens alle 6 h) `releases/latest/download/version.json`, lädt `app.html`, zeigt „Jetzt neu laden“.
  Startet eine neue Version nicht sauber, nimmt der Lader wieder die eingebaute.
- Nativ: ist `shell` im Release höher, zeigt die App „Jetzt aktualisieren“ → lädt `antreiber.apk`, Installation über die alte.

## Geheimnisse – nie in Code, Commits oder Antworten
`ANDROID_KEYSTORE_B64`, `ANDROID_KEYSTORE_PASSWORD` (Alias `antreiber`) nur als GitHub-Secrets; Sicherung bei Wolfgang.

## Regeln
- Einfache Sprache (Sätze kurz, Alltagswörter). Hinweis „keine Diagnose“ und Quelle (Kahler 1975, DOI) bleiben sichtbar.
- Partner-Box nur als „Partner-Angebot“ gekennzeichnet, mit „Kein Ersatz für ärztliche oder psychotherapeutische Behandlung“.
- Stromsparen: keine Dauer-Zeitgeber oder Animationen.
- Links nach außen nur zu mayoka.at und zur Quelle; Datenschutzerklärung muss zu dem passen, was die App tatsächlich tut (keine Datensammlung).
- Nach Änderungen an der Oberfläche: `npm run build`, im Browser bei 390 px und 1280 px, hell und dunkel prüfen. Kein horizontales Scrollen.
