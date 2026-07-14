import { CHARACTER_CONFIG, CHARACTER_NAMES, DEFAULT_CHARACTER, states, createVibeMonEngine } from './js/vibemon-engine-standalone.js';

// VibeMon engine instance
let vibeMonEngine = null;

// Cached DOM references (populated during init)
const domRefs = {};

// Current state
let currentState = 'start';
let currentCharacter = 'vibemon';
let iconType = 'emoji';

// Parse URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    character: params.get('character'),
    state: params.get('state'),
    project: params.get('project'),
    tool: params.get('tool'),
    model: params.get('model'),
    memory: params.get('memory'),
    usage5h: params.get('usage5h'),
    usageWeek: params.get('usageWeek'),
    icon: params.get('icon')
  };
}

function parsePercent(value, fallback) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : Math.max(0, Math.min(100, parsed));
}

// Initialize
async function init() {
  const container = document.getElementById('vibemon-display');

  // Create and initialize VibeMon engine
  vibeMonEngine = createVibeMonEngine(container, {
    useEmoji: iconType === 'emoji',
    characterImageUrls: {
      vibemon: './characters/vibemon.png',
      clawd: './characters/clawd.png',
      kiro: './characters/kiro.png',
      claw: './characters/claw.png',
      daangni: './characters/daangni.png'
    }
  });
  await vibeMonEngine.init();

  // Get URL parameters
  const urlParams = getUrlParams();
  const stateNames = Object.keys(states);

  // State: use URL param or random
  if (urlParams.state && states[urlParams.state]) {
    currentState = urlParams.state;
  } else {
    currentState = stateNames[Math.floor(Math.random() * stateNames.length)];
  }

  // Character: use URL param or random
  if (urlParams.character && CHARACTER_CONFIG[urlParams.character]) {
    currentCharacter = urlParams.character;
  } else {
    currentCharacter = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
  }

  // Populate character dropdown from CHARACTER_CONFIG
  const characterSelect = document.getElementById('character-select');
  CHARACTER_NAMES.forEach(name => {
    const char = CHARACTER_CONFIG[name];
    const option = document.createElement('option');
    option.value = name;
    option.textContent = char.displayName || name;
    if (name === currentCharacter) option.selected = true;
    characterSelect.appendChild(option);
  });

  // Cache input element references
  domRefs.projectInput = document.getElementById('project-input');
  domRefs.toolInput = document.getElementById('tool-input');
  domRefs.modelInput = document.getElementById('model-input');
  domRefs.memoryInput = document.getElementById('memory-input');
  domRefs.usage5hInput = document.getElementById('usage5h-input');
  domRefs.usageWeekInput = document.getElementById('usage-week-input');
  const { projectInput, toolInput, modelInput, memoryInput, usage5hInput, usageWeekInput } = domRefs;

  // Project: use URL param or default
  if (urlParams.project) {
    projectInput.value = urlParams.project;
  }

  // Tool: use URL param or default
  if (urlParams.tool) {
    toolInput.value = urlParams.tool;
  }

  // Model: use URL param or default
  if (urlParams.model) {
    modelInput.value = urlParams.model;
  }

  // Memory: use URL param (0-100) or random (10-90%)
  const memoryValue = urlParams.memory !== null ? parsePercent(urlParams.memory, 45) : Math.floor(Math.random() * 81) + 10;
  memoryInput.value = memoryValue;
  document.getElementById('memory-display').textContent = memoryValue + '%';

  // Usage: use URL params (0-100) or demo defaults
  const usage5hValue = urlParams.usage5h !== null ? parsePercent(urlParams.usage5h, 45) : 62;
  const usageWeekValue = urlParams.usageWeek !== null ? parsePercent(urlParams.usageWeek, 45) : 78;
  usage5hInput.value = usage5hValue;
  usageWeekInput.value = usageWeekValue;
  document.getElementById('usage5h-display').textContent = usage5hValue + '%';
  document.getElementById('usage-week-display').textContent = usageWeekValue + '%';

  // Icon type: use URL param or default
  if (urlParams.icon === 'pixel' || urlParams.icon === 'emoji') {
    iconType = urlParams.icon;
    document.getElementById('icon-type-select').value = iconType;
  }

  updateDisplay();
  vibeMonEngine.startAnimation();
}

// Set state
window.setState = function(state) {
  currentState = state;
  updateDisplay();
};

// Set character
window.setCharacter = function(character) {
  currentCharacter = CHARACTER_CONFIG[character] ? character : DEFAULT_CHARACTER;
  updateDisplay();
};

// Set icon type
window.setIconType = function(type) {
  iconType = type;
  vibeMonEngine.useEmoji = (type === 'emoji');
  updateDisplay();
};

// Update memory slider display
window.updateMemorySlider = function(value) {
  document.getElementById('memory-display').textContent = value + '%';
  updateDisplay();
};

window.updateUsage5hSlider = function(value) {
  document.getElementById('usage5h-display').textContent = value + '%';
  updateDisplay();
};

window.updateUsageWeekSlider = function(value) {
  document.getElementById('usage-week-display').textContent = value + '%';
  updateDisplay();
};

// Update display
window.updateDisplay = function() {
  const { projectInput, toolInput, modelInput, memoryInput, usage5hInput, usageWeekInput } = domRefs;

  // Get values from inputs
  const projectName = projectInput.value.trim();
  const toolName = toolInput.value;
  const modelName = modelInput.value.trim();
  const memoryValue = parseInt(memoryInput.value, 10) || 0;
  const usage5hValue = parseInt(usage5hInput.value, 10) || 0;
  const usageWeekValue = parseInt(usageWeekInput.value, 10) || 0;

  // Update VibeMon engine state
  vibeMonEngine.setState({
    state: currentState,
    character: currentCharacter,
    project: projectName,
    tool: toolName,
    model: modelName,
    memory: memoryValue,
    usage5h: usage5hValue,
    usageWeek: usageWeekValue
  });

  // Render using VibeMon engine
  vibeMonEngine.render();

  // Update simulator-specific UI
  document.getElementById('current-state-display').textContent = currentState;

  // Update JSON preview
  const json = {
    state: currentState,
    tool: currentState === 'working' ? toolName : '',
    project: projectName,
    model: modelName,
    memory: memoryValue,
    usage5h: usage5hValue,
    usageWeek: usageWeekValue,
    character: currentCharacter
  };
  document.getElementById('json-preview').textContent = JSON.stringify(json, null, 2);
};

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
