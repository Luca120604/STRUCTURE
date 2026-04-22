# Kompass — Editorial Edition

Persönlicher Profil- und Karriere-Kompass. Single-Page PWA im Editorial-Stil. Vanilla JS, keine Build-Step.

**Live:** `https://<username>.github.io/<repo-name>/`

---

## Stack

- Vanilla HTML/CSS/JS — kein React, kein Build-Tool
- PWA — offline-fähig, Home-Screen-installierbar
- Google Fonts: Bricolage Grotesque, Instrument Serif, JetBrains Mono
- Persistenz via `localStorage` (Theme, Favoriten, Checkliste, Onboarding)
- GitHub Pages als Hosting

---

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | App-Shell, Font-Imports, Tab-Navigation |
| `styles.css` | Komplettes Design-System |
| `data.js` | Content-Modell (Source of Truth) |
| `app.js` | App-Logik, Icon-Library, Render-Funktionen |
| `manifest.json` | PWA-Manifest (Install-Prompt) |
| `sw.js` | Service Worker (Offline-Cache) |
| `icon-192.svg` / `icon-512.svg` | App-Icons |
| `404.html` | GitHub-Pages-Fallback |

---

## Lokal testen

Weil der Service Worker einen HTTP-Kontext braucht:

```bash
# Python
python3 -m http.server 8080

# oder Node
npx serve .
```

Dann `http://localhost:8080` öffnen.

---

## GitHub Pages Deploy

1. Repo erstellen (Name egal, z.B. `kompass`)
2. Alle Dateien aus diesem Ordner hochladen / committen
3. **Settings → Pages → Source: `main` branch, folder `/ (root)`** → Save
4. Nach 1–2 Min live unter `https://<username>.github.io/<repo>/`

### Via Git CLI (empfohlen)

```bash
cd /pfad/zum/kompass-ordner
git init
git add .
git commit -m "initial"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Pages dann in den Repo-Settings aktivieren (siehe oben).

---

## Content anpassen

Alle Inhalte stehen in `data.js` — das ist die **Source of Truth**. Neue Bücher, Apps, Pfade etc. dort ergänzen. App lädt alles automatisch beim nächsten Reload.

Struktur: `window.KOMPASS_DATA` mit den Keys `profile`, `karrierepfade`, `pmDetail`, `apmProgramme`, `jobBoards`, `mch`, `kompassReihenfolge`, `plattformen`, `apps`, `buecher*`, `newsletter`, `podcasts`, `kurse`, `blogs`, `checklist`.

---

## PWA installieren (iOS)

1. In Safari die URL öffnen
2. Teilen-Button → "Zum Home-Bildschirm"
3. Fertig — App ist jetzt Standalone mit eigenem Icon

## PWA installieren (Desktop Chrome/Edge)

- Adresszeile → Install-Icon rechts → Installieren

---

## Service Worker Update

Beim Deployment in `sw.js` die Zeile

```js
const CACHE_VERSION = 'kompass-v3-1';
```

auf eine neue Version bumpen (z.B. `v3-2`). Sonst sieht der User die alte Cached-Version.

---

## Optional: Claude-Chatbot einbinden

**Kurzversion: Geht, aber nicht trivial und nicht empfohlen für dieses Repo direkt.**

Drei Wege, sortiert nach Aufwand/Sinn:

### Weg 1 — Direkt-Link (empfohlen, 5 Sekunden)

Button in der App der claude.ai mit pre-filled Prompt öffnet:

```html
<a href="https://claude.ai/new?q=Ich%20habe%20eine%20Frage%20zu%20meinem%20Kompass%3A%20">
  Frag Claude
</a>
```

Kein Backend, keine Kosten, kein Key-Management.

### Weg 2 — Cloudflare Worker als API-Proxy (richtig)

**Problem:** Den Anthropic API Key darfst du **niemals** ins Frontend schreiben. Er wäre im Client-Code sichtbar, jeder könnte ihn benutzen, deine Rechnung explodiert.

**Lösung:** Serverless-Proxy zwischen Browser und Anthropic API. Cloudflare Workers bietet das kostenlos bis 100k Requests/Tag.

Workflow:
1. Cloudflare Account anlegen, Workers-Dashboard öffnen
2. Neuen Worker erstellen, diesen Code als Template nutzen:

```javascript
export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://<username>.github.io',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    const { messages } = await request.json();
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: 'Du bist ein Assistent für die Kompass-App. Antworte knapp und direkt.',
        messages
      })
    });
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://<username>.github.io'
      }
    });
  }
};
```

3. In den Worker-Settings: **Variables → Encrypted → `ANTHROPIC_API_KEY`** setzen
4. Worker deployen, URL kopieren (z.B. `https://kompass-bot.<dein-name>.workers.dev`)
5. Im Frontend eine Chat-Komponente bauen die POST an diese URL sendet

**Kostenschätzung:** Cloudflare Workers: gratis bis 100k req/Tag. Claude API: ca. $3 pro 1M Input-Tokens (Sonnet). Bei Privat-Nutzung quasi kostenlos, aber **Rate-Limit im Worker einbauen** damit kein Fremder deinen Key abusen kann.

### Weg 3 — Puter.js (3rd Party, unofficial)

Es gibt Libraries wie [puter.js](https://puter.com/) die Claude-Aufrufe ohne eigenen Key erlauben. **Nicht von Anthropic offiziell.** Funktioniert heute, kann morgen weg sein. Für einen Production-Kompass würde ich's nicht nehmen.

### Meine Empfehlung

Für deinen Anwendungsfall (privater Kompass): **Weg 1**. Wenn du echten Chat willst, später separates Repo + Cloudflare Worker. Nicht ins Kompass-Repo mischen — Kompass ist static, Chatbot braucht Backend.

---

## Lizenz

Privat, persönlich. Content = deins.
