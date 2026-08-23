// Sound mappings
const SOUNDS = {
  digits: {
    '0': 'audio/0.mp3', '1': 'audio/1.mp3', '2': 'audio/2.mp3',
    '3': 'audio/3.mp3', '4': 'audio/4.mp3', '5': 'audio/5.mp3',
    '6': 'audio/6.mp3', '7': 'audio/7.mp3', '8': 'audio/8.mp3',
    '9': 'audio/9.mp3', '.': 'audio/point.mp3'
  },
  ops: {
    '+': 'audio/plus.mp3',
    '-': 'audio/minus.mp3',
    '*': 'audio/times.mp3',
    '/': 'audio/divided-by.mp3'
  },
  clear: 'audio/clear.mp3',
  equals: 'audio/equals.mp3',
  thinking: 'audio/thinking.mp3',
  result: 'audio/result.mp3',
  error: 'audio/error.mp3',
  plush: 'audio/teto.mp3'
};

// Adjustable pause duration in milliseconds after she finishes thinking
const PAUSE_AFTER_THINKING_MS = 600;

// UI Elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const plush = document.getElementById('tetoPlush');
const plushWrapper = document.getElementById('plushWrapper');
const keypad = document.getElementById('keypad');

// State
let currentInput = '0';
let previousInput = null;
let activeOp = null;
let awaitingNextNumber = false;
let isCalculating = false;

let currentAudio = null;

// Audio Player with automatic Plush Bouncing
function playVoice(src, onEndedCallback = null) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(src);
  plush.classList.add('plush-talking');

  currentAudio.play().catch(() => {});

  currentAudio.onended = () => {
    plush.classList.remove('plush-talking');
    currentAudio = null;
    if (onEndedCallback) onEndedCallback();
  };
}

// Direct Plush Click
plushWrapper.addEventListener('click', () => {
  plush.classList.remove('plush-hop');
  void plush.offsetWidth; // Reflow trigger to restart CSS animation
  plush.classList.add('plush-hop');
  playVoice(SOUNDS.plush);
});

// Calculator Logic
function handleDigit(d) {
  if (isCalculating) return;

  if (awaitingNextNumber) {
    currentInput = d === '.' ? '0.' : d;
    awaitingNextNumber = false;
  } else {
    if (d === '.' && currentInput.includes('.')) return;
    currentInput = (currentInput === '0' && d !== '.') ? d : currentInput + d;
  }

  display.textContent = currentInput;
  playVoice(SOUNDS.digits[d]);
}

function handleOperator(op) {
  if (isCalculating) return;

  if (previousInput !== null && !awaitingNextNumber) {
    computeInstant();
  }

  previousInput = parseFloat(currentInput);
  activeOp = op;
  awaitingNextNumber = true;

  const symbolMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
  historyDisplay.textContent = `${previousInput} ${symbolMap[op]}`;

  playVoice(SOUNDS.ops[op]);
}

function computeInstant() {
  const prev = previousInput;
  const curr = parseFloat(currentInput);
  let res = 0;

  if (activeOp === '+') res = prev + curr;
  if (activeOp === '-') res = prev - curr;
  if (activeOp === '*') res = prev * curr;
  if (activeOp === '/') {
    if (curr === 0) return 'error';
    res = prev / curr;
  }
  return Math.round(res * 100000000) / 100000000;
}

function handleEquals() {
  if (isCalculating || activeOp === null || previousInput === null) return;

  const curr = parseFloat(currentInput);
  const symbolMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
  historyDisplay.textContent = `${previousInput} ${symbolMap[activeOp]} ${curr}`;

  const outcome = computeInstant();

  if (outcome === 'error') {
    display.textContent = 'Error!';
    playVoice(SOUNDS.error);
    previousInput = null;
    activeOp = null;
    awaitingNextNumber = true;
    return;
  }

  isCalculating = true;

  // 1. Clear the main output right away
  display.textContent = '';

  // 2. Play "Thinking..." line
  playVoice(SOUNDS.thinking, () => {
    // 3. Pause for comedic timing
    setTimeout(() => {
      // 4. Reveal the numerical result
      currentInput = outcome.toString();
      display.textContent = currentInput;

      // 5. Play "...Here's the result!"
      playVoice(SOUNDS.result, () => {
        isCalculating = false;
        previousInput = null;
        activeOp = null;
        awaitingNextNumber = true;
      });
    }, PAUSE_AFTER_THINKING_MS);
  });
}

function handleClear() {
  if (isCalculating) return;
  currentInput = '0';
  previousInput = null;
  activeOp = null;
  awaitingNextNumber = false;
  historyDisplay.textContent = '';
  display.textContent = '0';
  playVoice(SOUNDS.clear);
}

function handleBackspace() {
  if (isCalculating || awaitingNextNumber) return;
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  display.textContent = currentInput;
}

// Keypad Button Delegation
keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.val) handleDigit(btn.dataset.val);
  if (btn.dataset.op) handleOperator(btn.dataset.op);
  if (btn.dataset.action === 'equals') handleEquals();
  if (btn.dataset.action === 'clear') handleClear();
  if (btn.dataset.action === 'backspace') handleBackspace();
});