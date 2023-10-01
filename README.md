# Rcmmndr

Ein Projekt von Alexander Bergmann & Robin Steil für das Modul Musikinformatik von Prof. Dr. Jochen Steffens an der Hochschule Düsselorf.

## Übersicht & Ziele

Diese Applikation schlägt den Nutzenden Lieder vor, auf der Basis der Lieblingssongs bei Spotify, welche diese "Liken" oder "Disliken" können.

Damit werden zwei Ziele verfolgt, welche in Zukunft weiter ausgebaut werden könnten.

1. Private Nutzung: Nutzende können neue Lieder entdecken und die Parameter, welche für die Generierung der Vorschläge genutzt werden, transparent beeinflussen.  
2. Akademische Nutzung: Zu den Vorschlägen werden einige Daten gepeichert, welche es ermöglichen verschiende Forschungsthemen zu analysieren. Beispielsweise kann die Qualität der generierten Vorschläge beurteilt werden oder untersucht werden wie sich die bewerteten Songs zu den Favoriten der Person verhalten.
     
## Starten der Applikation

### Developement
- "npm install" und "npm run generate" ausführen
- docker installieren
- unter https://developer.spotify.com/dashboard eine Spotify App erstellen.
- Die Datei .env.example zu .env.local umbenennnen und dort die Werte für SPOTIFY_CLIENT_ID und SPOTIFY_CLIENT_SECRET einfügen
- "npm run dev:docker:build" ausführen
  Das frontend ist auf http://localhost:3000 verfügbar und die Datenbank kann über http://localhost:8080 mittels adminer erreicht werden
### Production
- Analog zu Developement
- "npm run prod:docker" ausführen (statt "npm run dev:docker:build")

## Technische Details

Die Applikation nutzt folgende Technologien:
-  [Next.js](https://nextjs.org/) für Front- und Backend
-  [TypeScript](https://www.typescriptlang.org/)
-  [Postgres](https://www.postgresql.org/) als Datenbank
-  [Prisma](https://www.prisma.io/) als ORM
-  [Docker](https://www.docker.com/)
-  [Spotify Web API](https://developer.spotify.com/documentation/web-api) 
-   [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) für das Abspielen von Musik
- [Auth.js](https://authjs.dev/) für die Authentifizierung
- [zustand](https://github.com/pmndrs/zustand) für das Datenmanagement
- [Zod](https://zod.dev/) für Schema Deklaration and Validierung 
