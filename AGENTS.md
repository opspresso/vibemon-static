# Repository Guidelines

## Project Structure & Module Organization

This repository publishes canonical VibeMon assets directly from `docs/` through GitHub Pages. Registry data lives in `docs/data/`, 128×128 character PNGs in `docs/characters/`, and shared rendering sources in `docs/js/` and `docs/css/`. `docs/index.html` only redirects visitors to the main site. Use `scripts/validate-registry.mjs` for registry checks. The `prompts/` directory contains sprite-generation references and Python utilities; generated outputs should not be committed unless they are intentional project assets.

## Build, Test, and Development Commands

There is no package installation or compile step. Use Node.js 20, matching CI.

- `node scripts/validate-registry.mjs` validates JSON structure, supported state values, image references, and 128×128 coordinate bounds.
- `python3 prompts/verify_sprite.py path/to/sheet.png` inspects a generated sprite sheet. It requires Pillow.
- `python3 -m http.server 8000 --directory docs` serves the published tree locally at `http://localhost:8000`.

Run the registry validator before every pull request that changes `docs/data/` or `docs/characters/`.

## Coding Style & Naming Conventions

Match the existing file style: two-space indentation and semicolons in JavaScript, two-space indentation in JSON, and four-space indentation with `snake_case` names in Python. JavaScript uses ES modules and `camelCase`; constants use `UPPER_SNAKE_CASE`. Keep character IDs and PNG filenames lowercase, using only letters, digits, and hyphens (for example, `docs/characters/my-agent.png`). Preserve the dependency-free static design and avoid unrelated formatting changes.

## Testing Guidelines

GitHub Actions runs the registry validator on pushes and pull requests to `main`; no coverage threshold or general test suite is configured. Treat validator failures as blocking. When changing rendering behavior, exercise the affected module in a consuming project or a focused browser fixture and describe that manual verification in the pull request.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style subjects such as `feat: support model-scoped usage label` and `docs: update README references`. Use an imperative, scoped summary with an appropriate prefix (`feat:`, `fix:`, `docs:`, or `ci:`), and keep each commit focused.

Pull requests should explain the user-visible or registry impact, list validation performed, and link related issues. Include before/after screenshots for sprite, CSS, or rendering changes. Adding a character requires both its registry entry and matching 128×128 PNG. Never commit `.env`, `.env.local`, API keys, or generated files containing secrets.
