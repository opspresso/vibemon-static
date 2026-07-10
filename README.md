# vibemon-static

Static files (JS, PNG, etc.) served via GitHub Pages from the `docs` folder.

## About

This repository contains static web assets for VibeMon - a real-time status monitor for AI assistants (Claude Code, Codex, Kiro, OpenClaw) with pixel art characters.

## Files

The `docs` folder contains:
- `index.html` - Landing page
- `demo.html` - Live simulator
- `demo.css` - Demo styles
- `demo.js` - Demo controller
- `js/vibemon-engine-standalone.js` - VibeMon rendering engine
- `characters/` - Character images (clawd.png, codex.png, kiro.png, claw.png)

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
    clawd: 'https://static.vibemon.io/characters/clawd.png',
    codex: 'https://static.vibemon.io/characters/codex.png',
    kiro: 'https://static.vibemon.io/characters/kiro.png',
    claw: 'https://static.vibemon.io/characters/claw.png'
  }
});

await engine.init();
engine.setState({
  state: 'working',
  character: 'clawd',
  tool: 'Bash',
  project: 'my-project',
  model: 'Opus 4.5',
  memory: 45
});
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
| `alert` | Red | Error occurred |

### Characters

- `clawd` - Orange (Claude Code)
- `codex` - Green terminal robot (Codex)
- `kiro` - White ghost (Kiro)
- `claw` - Red (OpenClaw)

## Access

The site is available at:
- https://static.vibemon.io (primary)
- https://opspresso.github.io/vibemon-static/

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
│       ├── clawd.png
│       ├── codex.png
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

## Related Projects

- [vibemon](https://github.com/opspresso/vibemon) - Cloud dashboard & API ([vibemon.io](https://vibemon.io))
- [vibemon-app](https://github.com/opspresso/vibemon-app) - Desktop App & ESP32 hardware client
- [vibemon-docs](https://github.com/opspresso/vibemon-docs) - Agent hook installation & setup guide ([docs.vibemon.io](https://docs.vibemon.io))

## License

ISC
