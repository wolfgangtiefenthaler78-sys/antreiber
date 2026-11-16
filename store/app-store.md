# Antreiber fürs iPhone: Testen und App Store

## Das Wichtigste vorweg

Apple erlaubt **keine App-Datei zum Herunterladen** wie bei Android. Eine iPhone-App kommt nur auf zwei Wegen auf fremde Geräte:

1. **TestFlight** (zum Testen, bis 10.000 Tester, Link per Newsletter verschickbar)
2. **App Store** (für alle)

Beides braucht ein **Apple-Entwicklerkonto** (Apple Developer Program, 99 € pro Jahr, Registrierung als Firma mit D-U-N-S-Nummer).

**Was heute schon geht – ohne Apple-Konto:** die Web-Fassung.
Link für Newsletter und iPhone: **https://wolfgangtiefenthaler78-sys.github.io/antreiber/**
Am iPhone in Safari öffnen → Teilen → „Zum Home-Bildschirm“. Dann liegt die App wie eine echte App am Startbildschirm,
läuft ohne Internet und behält die Antworten am Gerät. Die Seite erklärt das selbst, wenn sie am iPhone geöffnet wird.

## Was im Projekt bereit liegt

| Was | Wo |
|---|---|
| iPhone-Projekt (Capacitor) | `ios/` – Bundle-ID `at.mayoka.antreiber`, Name „Antreiber“, ab iOS 14 |
| App-Symbol 1024 × 1024, Startbild | `ios/App/App/Assets.xcassets/` (aus `assets/icon.svg`, erzeugt mit `node scripts/icons.mjs`) |
| Bau bei GitHub auf einem Apple-Rechner | `.github/workflows/ios.yml` – prüft ohne Konto, ob alles baut; mit Konto: Upload zu TestFlight |
| Datenschutzerklärung (Pflicht-Link) | https://wolfgangtiefenthaler78-sys.github.io/antreiber/datenschutz.html |
| Verschlüsselungs-Frage | in `Info.plist` schon beantwortet (keine eigene Verschlüsselung) |

Kein Mac nötig: Der Bau läuft bei GitHub. Ein Mac ist nur bequemer, wenn man selbst in Xcode schauen will.

## Sobald das Apple-Konto da ist

1. Unter https://developer.apple.com → **Certificates, Identifiers & Profiles**:
   - Identifier (App-ID) `at.mayoka.antreiber` anlegen, keine besonderen Fähigkeiten nötig.
   - Zertifikat „Apple Distribution“ erstellen und als `.p12` mit Passwort exportieren (dafür braucht es einmal einen Mac
     oder die Schlüsselbund-Hilfe einer Person mit Mac).
   - Provisioning-Profil „App Store Connect“ für diese App-ID erstellen und als `.mobileprovision` laden.
2. Unter https://appstoreconnect.apple.com → **Users and Access → Integrations → App Store Connect API**:
   Schlüssel mit Rolle „App Manager“ anlegen; Key-ID, Issuer-ID und die `.p8`-Datei merken (die `.p8` gibt es nur einmal zum Laden).
3. In App Store Connect die **App anlegen** (Name „Antreiber“, Bundle-ID wählen, SKU z. B. `antreiber`).
4. Bei GitHub unter *Settings → Secrets and variables → Actions* diese Secrets eintragen
   (base64 am Mac: `base64 -i datei | pbcopy`; am Windows-PC: `certutil -encode`):
   `IOS_CERT_P12_B64`, `IOS_CERT_PASSWORD`, `IOS_PROFILE_B64`, `APPLE_TEAM_ID`, `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8_B64`.
   Die Dateien selbst sicher aufbewahren, nie ins Projekt legen.
5. Bei GitHub *Actions → „iPhone-App bauen“ → Run workflow*. Nach etwa 15 Minuten liegt der Build in
   App Store Connect → TestFlight.
6. **TestFlight-Link erzeugen**: TestFlight → Externe Tests → Gruppe anlegen → „Öffentlicher Link aktivieren“.
   Diesen Link kann man per Newsletter verschicken. Tester laden die TestFlight-App und tippen auf den Link.
   Beim ersten externen Test prüft Apple den Build kurz (meist unter einem Tag).
7. **App Store**: In App Store Connect Texte (wie in `store/play-store.md`), Bildschirmfotos (6,7″-iPhone, 1290 × 2796;
   die vorhandenen aus `store/screenshots/` passen nach Zuschnitt, oder mit `scripts/` neu in dieser Größe erzeugen),
   Datenschutz-Angaben („Daten werden nicht erhoben“), Altersfreigabe 4+, Kategorie „Gesundheit und Fitness“.
   Dann den TestFlight-Build auswählen und „Zur Prüfung einreichen“. Apple prüft 1–3 Tage.

## Woran Apple bei der Prüfung gern hängt

- Apps, die „nur eine Website“ sind, lehnt Apple ab – deshalb hat die App eigene Funktionen (Werkzeuge, Verlauf, Teilen) und läuft offline.
- Gesundheitsthemen: Der Hinweis „keine Diagnose“ steht in der App und in der Datenschutzerklärung. Keine Heilversprechen in den Store-Texten.
- Das Impressum und die Datenschutzerklärung müssen vollständig sein (gelbe Stellen in `src/rechtliches.html` ausfüllen).
