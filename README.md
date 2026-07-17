# vibemon-static

Static assets (registry JSON, character PNGs) served via GitHub Pages from the `docs` folder.

## About

This repository is the canonical asset home for VibeMon - a real-time status monitor for AI assistants (Claude Code, Codex, Kiro, OpenClaw) with pixel art characters. State rendering itself lives in the consumers: the Desktop app's bundled engine ([vibemon-app](https://github.com/opspresso/vibemon-app) `src/engine/`) and the dashboard's canvas renderer ([vibemon](https://github.com/opspresso/vibemon) `src/lib/character-canvas.ts`).

## Files

The `docs` folder contains:
- `index.html` - Landing page (live character preview cycling random states)
- `js/vibemon-engine.js` - Rendering engine used by the landing page (verbatim copy of vibemon-app's `src/engine/vibemon-engine.js`)
- `characters/` - Character images (vibemon.png, codex.png, clawd.png, kiro.png, claw.png, daangni.png)
- `data/` - Canonical state/character registry (states.json, characters.json)

## Canonical Registry

This repository is the **single source of truth** for the state/character
registry and character images consumed at runtime by the Desktop app
([vibemon-app](https://github.com/opspresso/vibemon-app)) and the cloud
dashboard ([vibemon](https://github.com/opspresso/vibemon)):

| Resource | URL |
|----------|-----|
| State registry | `https://static.vibemon.io/data/states.json` |
| Character registry | `https://static.vibemon.io/data/characters.json` |
| Character image | `https://static.vibemon.io/characters/{name}.png` |

To change a state or character, edit the registry here — consumers fetch at
runtime (with bundled fallbacks) or verify their vendored copies against
these files. Adding a character requires both the registry entry in
`data/characters.json` and a 128x128 PNG in `characters/`.

### States

| State | Color | Description |
|-------|-------|-------------|
| `start` | Cyan | Session begins |
| `idle` | Green | Waiting for input |
| `thinking` | Purple | Processing prompt |
| `planning` | Teal | Plan mode active |
| `working` | Blue | Tool executing |
| `packing` | Gray | Context compacting |
| `notification` | Yellow | User input needed |
| `done` | Green | Tool completed |
| `sleep` | Navy | 5min inactivity |
| `alert` | Red | Critical error/failure |

### Characters

- `vibemon` - Purple (VibeMon, default)
- `codex` - Blue cloud (Codex CLI; light eyes on a dark screen — uses `eyeColor`/`glassesColor`)
- `clawd` - Orange (Claude Code)
- `kiro` - White ghost (Kiro)
- `claw` - Red (OpenClaw)
- `daangni` - White/teal (Daangn)

Each `data/characters.json` entry defines `displayName`/`color`/`image`/`eyes`/`effect`. Optional overlay colors override the near-black defaults for characters with a dark face: `eyeColor` sets the blink/happy stroke color (default `#000000`) and `glassesColor` sets the glasses frame color (default `#111111`).

## Access

The site is available at:
- https://static.vibemon.io (primary)
- https://opspresso.github.io/vibemon-static/

## Project Structure

```
vibemon-static/
├── docs/
│   ├── index.html      # Landing page (live random-state preview)
│   ├── favicon.ico
│   ├── CNAME           # Custom domain (static.vibemon.io)
│   ├── js/
│   │   └── vibemon-engine.js  # Copy of vibemon-app src/engine/vibemon-engine.js
│   ├── data/
│   │   ├── states.json
│   │   └── characters.json
│   └── characters/
│       ├── vibemon.png
│       ├── codex.png
│       ├── clawd.png
│       ├── kiro.png
│       ├── claw.png
│       └── daangni.png
├── prompts/            # Sprite-sheet generation scripts & references
└── README.md
```

## GitHub Pages Setup

This repository uses GitHub Pages to serve the contents of the `docs` folder.

To enable GitHub Pages:
1. Go to repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose branch (e.g., `main` or `master`) and `/docs` folder
5. Save the configuration

## Related Projects

- [vibemon](https://github.com/opspresso/vibemon) - Cloud dashboard & API ([vibemon.io](https://vibemon.io))
- [vibemon-app](https://github.com/opspresso/vibemon-app) - Desktop App & ESP32 hardware client
- [vibemon-docs](https://github.com/opspresso/vibemon-docs) - Agent hook installation & setup guide ([docs.vibemon.io](https://docs.vibemon.io))

## License

ISC
