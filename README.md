# Mein TV Menü – Samsung UE65NU7099

Eine fernbedienbare Vollbild-Web-App für Samsung Tizen 4.0. Die App verändert nicht die geschützte Samsung-Firmware; sie läuft als eigene Oberfläche.

Das Projekt ist zusätzlich als TizenBrew-Application-Module vorbereitet. TizenBrew erkennt die Angaben in `package.json` und öffnet `index.html` als App.

## Enthalten

- Vollbild-Oberfläche für 1920 × 1080
- Navigation mit Links, Rechts, OK und Zurück
- Uhr und deutsches Datum
- Bereiche für Fernsehen, YouTube, Quellen, Medien und Einstellungen
- Keine Internetverbindung oder externen Bibliotheken erforderlich

## Auf dem Fernseher installieren

### Variante A: TizenBrew

1. Den Inhalt dieses Ordners in ein öffentliches GitHub-Repository hochladen.
2. TizenBrew auf dem Fernseher öffnen und den Modul-Manager auswählen.
3. **GitHub-Modul hinzufügen** wählen.
4. Den Repository-Namen im Format `benutzername/repository@main` eingeben.
5. Das Modul **Mein TV Menü** öffnen.

TizenBrew lädt GitHub-Module über das Internet. Eine ZIP-Datei auf dem PC kann daher nicht unmittelbar im TV-Modul-Manager ausgewählt werden.

### Variante B: Tizen Studio

1. Auf dem Windows-PC **Tizen Studio**, die **Samsung TV Extensions** und die **Samsung Certificate Extension** installieren.
2. Fernseher und PC mit demselben Netzwerk verbinden.
3. Am TV `Smart Hub → Apps` öffnen und mit der Bildschirm-Zahlentastatur `12345` eingeben.
4. Entwicklermodus einschalten, die IP-Adresse des PCs eintragen und den Fernseher vollständig neu starten.
5. In Tizen Studio ein Samsung-Zertifikat erstellen: `Tools → Certificate Manager`.
6. Diesen Ordner als vorhandenes Tizen-Projekt importieren: `File → Import → Tizen → Tizen Project`.
7. Unter `Tools → Device Manager → Remote Device Manager` die IP-Adresse des Fernsehers hinzufügen und verbinden.
8. Projekt mit `Run As → Tizen Web Application` starten.

Tizen Studio kann beim Import ein Standard-App-Symbol ergänzen. Für ein eigenes Symbol bitte eine 117 × 117 Pixel große PNG-Datei verwenden; SVG wird von Samsung-TVs nicht zuverlässig unterstützt.

Bei Tizen 4.0 kann das Debugging eingeschränkt sein. Die App deshalb normal starten, nicht im Debug-Modus.

## Wichtige Grenze

Eine normale Tizen-App darf Samsungs Systemmenü, Einstellungen und vorinstallierte Anwendungen nicht ersetzen. Kacheln für geschützte Samsung-Funktionen sind in dieser Version deshalb sichere Ansichten und keine System-Hacks.

