# vibemon-static

Static files (JS, PNG, etc.) served via GitHub Pages from the `docs` folder.

## About

This repository contains static web assets for VibeMon - a real-time status monitor for AI assistants (Claude Code, Kiro, OpenClaw) with pixel art characters.

## Files

The `docs` folder contains:
- `index.html` - Main HTML page
- `style.css` - Stylesheet
- `app.js` - JavaScript application
- `logo.png` - Sample image file
- `js/vibemon-engine-standalone.js` - VibeMon rendering engine
- `characters/` - Character images (apto.png, clawd.png, kiro.png, claw.png)

## VibeMon Engine

### Usage

```html
<div class="vibemon-display" id="vibemon-display"></div>
<script type="module">
import { createVibeMonEngine } from 'https://static.vibemon.io/js/vibemon-engine-standalone.js';

const container = document.getElementById('vibemon-display');
const engine = createVibeMonEngine(container, {
  useEmoji: true,
  characterImageUrls: {
    apto: 'https://static.vibemon.io/characters/apto.png',
    clawd: 'https://static.vibemon.io/characters/clawd.png',
    kiro: 'https://static.vibemon.io/characters/kiro.png',
    claw: 'https://static.vibemon.io/characters/claw.png'
  }
});

await engine.init();
engine.setState({ state: 'working', tool: 'Bash', project: 'my-project' });
engine.render();
engine.startAnimation();
</script>
```

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

### Characters

- `apto` - Gray-purple (Apto)
- `clawd` - Orange (Claude Code)
- `kiro` - White ghost (Kiro)
- `claw` - Red (OpenClaw)

## Access

The site is available at:
- https://static.vibemon.io (primary)
- https://nalbam.github.io/vibemon-static/

## Project Structure

```
vibemon-static/
├── docs/
│   ├── index.html      # Landing page
│   ├── demo.html       # Live demo (simulator)
│   ├── demo.css
│   ├── demo.js
│   ├── js/
│   │   └── vibemon-engine-standalone.js
│   └── characters/
│       ├── apto.png
│       ├── clawd.png
│       ├── kiro.png
│       └── claw.png
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

## License

ISC
