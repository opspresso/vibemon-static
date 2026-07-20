#!/usr/bin/env node
// Validate the canonical registry (docs/data/*.json) and character images.
// This repo is the single source of truth for three downstream consumers
// (vibemon-app, vibemon, vibemon-esp32), so structural mistakes must fail
// before merge. Mirrors the constraints the rendering engine can draw.

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');

// Values with an engine drawing branch (vibemon-engine.js drawEyes/drawEffect).
const EYE_TYPES = new Set(['normal', 'glasses', 'blink', 'happy']);
const EFFECTS = new Set(['none', 'sparkle', 'thinking', 'question', 'zzz', 'exclamation']);
const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;
const CANVAS = 128;

const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };

function loadJson(name) {
  try {
    return JSON.parse(readFileSync(join(DOCS, 'data', name), 'utf8'));
  } catch (error) {
    errors.push(`data/${name}: ${error.message}`);
    return null;
  }
}

// --- states.json ---
const statesDoc = loadJson('states.json');
const states = statesDoc?.states;
if (states) {
  check(typeof states === 'object' && !Array.isArray(states), 'states.json: "states" must be an object');
  for (const [name, state] of Object.entries(states)) {
    const at = `states.json ${name}`;
    check(HEX_COLOR.test(state?.color ?? ''), `${at}: color must be #RRGGBB, got ${state?.color}`);
    check(typeof state?.text === 'string' && state.text.length > 0, `${at}: text must be a non-empty string`);
    check(typeof state?.active === 'boolean', `${at}: active must be a boolean`);
    check(typeof state?.loading === 'boolean', `${at}: loading must be a boolean`);
    check(EYE_TYPES.has(state?.eyeType), `${at}: eyeType "${state?.eyeType}" has no engine drawing branch`);
    check(EFFECTS.has(state?.effect), `${at}: effect "${state?.effect}" has no engine drawing branch`);
  }
}

// --- characters.json ---
const charsDoc = loadJson('characters.json');
const characters = charsDoc?.characters;
if (charsDoc) {
  check(typeof charsDoc.default === 'string' && !!characters?.[charsDoc.default],
    `characters.json: default "${charsDoc.default}" must name a defined character`);
}
const anchorInRange = (value) => Number.isFinite(value) && value >= 0 && value <= CANVAS;
if (characters) {
  for (const [name, ch] of Object.entries(characters)) {
    const at = `characters.json ${name}`;
    check(/^[a-z0-9-]+$/.test(name), `${at}: name must be lowercase alphanumeric`);
    check(typeof ch?.displayName === 'string' && ch.displayName.length > 0, `${at}: displayName required`);
    check(HEX_COLOR.test(ch?.color ?? ''), `${at}: color must be #RRGGBB, got ${ch?.color}`);
    for (const key of ['eyeColor', 'glassesColor']) {
      if (ch?.[key] !== undefined) check(HEX_COLOR.test(ch[key]), `${at}: ${key} must be #RRGGBB, got ${ch[key]}`);
    }
    check(typeof ch?.image === 'string' && /^[a-z0-9-]+\.png$/.test(ch?.image ?? ''),
      `${at}: image must be a simple .png filename, got ${ch?.image}`);
    const eyes = ch?.eyes;
    check(!!eyes && anchorInRange(eyes?.left?.x) && anchorInRange(eyes?.left?.y)
      && anchorInRange(eyes?.right?.x) && anchorInRange(eyes?.right?.y),
      `${at}: eyes.left/right anchors must be within 0..${CANVAS}`);
    // Eye size comes as w/h or the square shorthand `size`.
    check(!!eyes && (anchorInRange(eyes?.size) || (anchorInRange(eyes?.w) && anchorInRange(eyes?.h))),
      `${at}: eyes needs w/h (or size) within 0..${CANVAS}`);
    check(anchorInRange(ch?.effect?.x) && anchorInRange(ch?.effect?.y),
      `${at}: effect anchor must be within 0..${CANVAS}`);
  }

  // Image files and registry entries must match 1:1.
  const pngs = new Set(readdirSync(join(DOCS, 'characters')).filter((f) => f.endsWith('.png')));
  for (const [name, ch] of Object.entries(characters)) {
    if (typeof ch?.image === 'string') {
      check(pngs.has(ch.image), `characters.json ${name}: image ${ch.image} not found in docs/characters/`);
      pngs.delete(ch.image);
    }
  }
  for (const orphan of pngs) errors.push(`docs/characters/${orphan}: no characters.json entry references it`);
}

if (errors.length > 0) {
  for (const message of errors) console.error(`FAIL  ${message}`);
  process.exit(1);
}
console.log('Registry is valid: states, characters, and images all check out.');
