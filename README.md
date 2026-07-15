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
- `characters/` - Character images (vibemon.png, clawd.png, kiro.png, claw.png, daangni.png)

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
    vibemon: 'https://static.vibemon.io/characters/vibemon.png',
    clawd: 'https://static.vibemon.io/characters/clawd.png',
    kiro: 'https://static.vibemon.io/characters/kiro.png',
    claw: 'https://static.vibemon.io/characters/claw.png',
    daangni: 'https://static.vibemon.io/characters/daangni.png'
  }
});

await engine.init();
engine.setState({
  state: 'working',
  character: 'clawd',
  tool: 'Bash',
  project: 'my-project',
  model: 'Opus 4.5',
  memory: 45,
  usage5h: 62,
  usageWeek: 78
});
engine.render();
engine.startAnimation();
</script>
```

`memory`, `usage5h`, `usageWeek` accept 0-100 and each render as a labeled bar (context memory, 5-hour usage window, weekly usage window).

### Exports

Besides `createVibeMonEngine`, the module also exports:

```js
import { states, CHARACTER_CONFIG, CONSTANTS, CHARACTER_NAMES, DEFAULT_CHARACTER } from 'https://static.vibemon.io/js/vibemon-engine-standalone.js';
```

- `states` - the `STATES` config object (colors, descriptions) keyed by state name
- `CHARACTER_CONFIG` - per-character rendering config
- `CHARACTER_NAMES` - `Object.keys(CHARACTER_CONFIG)`, useful for populating a character selector
- `DEFAULT_CHARACTER` - the character used when none is set
- `CONSTANTS` - shared engine constants

### Lifecycle

- `engine.stopAnimation()` - stops the animation loop without tearing down the engine
- `engine.cleanup()` - stops the animation loop and releases resources; call this on unmount (e.g. in a SPA) to avoid a dangling `requestAnimationFrame` loop

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
- `clawd` - Orange (Claude Code)
- `kiro` - White ghost (Kiro)
- `claw` - Red (OpenClaw)
- `daangni` - White/teal (Daangn)

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
│   ├── favicon.ico
│   ├── CNAME           # Custom domain (static.vibemon.io)
│   ├── js/
│   │   └── vibemon-engine-standalone.js
│   └── characters/
│       ├── vibemon.png
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
