# Antreiber im Google Play Store veröffentlichen

Alles, was für die Einreichung nötig ist, liegt bereit. Diese Liste führt Schritt für Schritt durch die Play Console.

## Was schon da ist

| Was | Wo |
|---|---|
| Unterschriebene App-Datei für den Store (`.aab`) | bei jedem Release: https://github.com/wolfgangtiefenthaler78-sys/antreiber/releases/latest/download/antreiber.aab |
| App-Symbol 512 × 512 | `store/icon-512.png` |
| Vorschaubild 1024 × 500 („Feature-Grafik“) | `store/feature-graphic.png` |
| Bildschirmfotos Handy (1080 × 2340) | `store/screenshots/` (mindestens 2 nötig, 6 vorhanden) |
| Datenschutzerklärung (öffentlicher Link, Pflicht) | https://wolfgangtiefenthaler78-sys.github.io/antreiber/datenschutz.html |
| Paketname | `at.mayoka.antreiber` |
| Versionsnummer | steigt bei jedem Bau automatisch (1.0.*Laufnummer*) |
| Ziel-Android-Version | 15 (API 35), mindestens Android 6 |

## Vorher ausfüllen

- In `src/rechtliches.html` die gelb markierten Stellen ergänzen: E-Mail, Telefon, Firmenbuchnummer, UID.
  Danach auf `main` übernehmen – die Seite aktualisiert sich von selbst.
- Prüfen, ob `https://mayoka.at` die richtige Website-Adresse ist (steht im Logo-Link und im Impressum).

## Schritte in der Play Console (https://play.google.com/console)

1. **Entwicklerkonto** anlegen (einmalig 25 US-Dollar). Als Firma (MAYOKA andersch gsund OG) registrieren,
   dafür braucht Google eine D-U-N-S-Nummer der Firma (kostenlos, dauert einige Tage).
2. **App erstellen**: Name „Antreiber“, Sprache Deutsch, App (keine Spiel), kostenlos.
3. **App-Signatur**: Google Play App Signing annehmen. Beim ersten Upload fragt Google nach dem Upload-Schlüssel –
   das ist unser bestehender Schlüssel (die `.aab` ist damit unterschrieben), nichts weiter nötig.
4. **Store-Eintrag** (Texte unten), Symbol, Vorschaubild, Bildschirmfotos hochladen.
5. **Datenschutzerklärung**: Link oben eintragen.
6. **App-Inhalte** ausfüllen:
   - Datensicherheit: *Es werden keine Nutzerdaten erhoben oder weitergegeben.* Daten werden nicht verschlüsselt
     übertragen (es werden keine übertragen), Nutzer können keine Löschung beantragen (es gibt nichts zu löschen).
   - Werbung: Nein, enthält keine Werbung.
   - Zielgruppe: 18 und älter. Nicht für Kinder gestaltet.
   - Einstufung des Inhalts (IARC-Fragebogen): Kategorie „Dienstprogramm/Produktivität/…“, alle Fragen mit Nein → „Ab 0“ bzw. „PEGI 3“.
   - Gesundheits-Apps: Ja, „Gesundheit und Fitness“ → Wohlbefinden / Selbsthilfe; keine medizinische Diagnose.
   - Staatliche Apps / Nachrichten-Apps / Finanz: Nein.
7. **Test-Phasen**: Zuerst „Interner Test“ (bis 100 Tester per E-Mail-Liste, sofort nutzbar).
   Für neue Konten verlangt Google vor der Veröffentlichung einen **geschlossenen Test mit mindestens 12 Testern über 14 Tage**.
   Danach kann „Produktion“ beantragt werden.
8. **Produktion**: `.aab` hochladen, Länder wählen (Österreich, Deutschland, Schweiz oder alle), Veröffentlichung beantragen.
   Prüfung durch Google dauert meist 1–7 Tage.

## Texte für den Store-Eintrag

**Titel (max. 30 Zeichen):** Antreiber – Selbsttest

**Kurzbeschreibung (max. 80 Zeichen):**
Welche inneren Sätze treiben mich an? 50 Aussagen, 8 Minuten, alles bleibt am Handy.

**Vollständige Beschreibung:**

Viele Menschen tragen innere Sätze aus der Kindheit mit sich. „Mach keine Fehler!“ – „Zeig keine Schwäche!“ – „Beeil dich!“ Solche Sätze heißen Antreiber. Sie helfen uns oft. Unter Stress werden sie aber zur Last.

Der Antreiber-Selbsttest zeigt in etwa 8 Minuten, welche der fünf Antreiber bei Ihnen stark sind:
• Sei perfekt!
• Sei stark!
• Beeil dich!
• Streng dich an!
• Mach es allen recht!

Das bekommen Sie:
• Ihr Profil als Fünfeck oder Balken – mit Vergleich zum letzten Test
• Zu jedem Antreiber: Ihre Stärke, die Kehrseite, Stress-Zeichen, ein Erlaubnis-Satz und eine kleine Übung
• „Gerade jetzt“: Tippen Sie an, was gerade in Ihnen passiert – die App sagt, welche innere Stimme laut ist und was jetzt hilft
• Erlaubnis-Karten: freundliche Sätze an sich selbst, zum Merken
• 7-Tage-Übung zum Abhaken

Ihre Antworten bleiben auf Ihrem Handy. Kein Konto, keine Werbung, keine Weitergabe. Die App läuft auch ohne Internet.

Der Test hilft beim Nachdenken über sich selbst. Er ist keine Diagnose und kein Ersatz für ärztliche oder psychotherapeutische Behandlung. Grundlage: Kahler T. (1975), Transactional Analysis Journal 5(3). Die Aussagen sind eigene Formulierungen.

Eine App von MAYOKA andersch gsund, Dornbirn.

**Kategorie:** Gesundheit & Fitness · **Tags:** Selbsttest, Stress, Persönlichkeit, Achtsamkeit

**Kontakt-E-Mail (Pflicht, wird öffentlich angezeigt):** [E-Mail der Firma]
