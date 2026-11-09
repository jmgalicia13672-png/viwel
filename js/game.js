
const MAX_TRIES = 5;

const HINT_SCENARIO_TRY = 3;
const HINT_PHOTO1_TRY = 4;
const HINT_PHOTO2_TRY = 5;

const titleEl = document.getElementById("title");
const boardEl = document.getElementById("board");
const keyboardEl = document.getElementById("keyboard");
const messageEl = document.getElementById("message");
const topicEl = document.getElementById("topic");
const definitionEl = document.getElementById("definition");
const hintsEl = document.getElementById("hints");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next");

const entries = PW.entries();   
let current;
let answer = "";
let guesses = [];
let typing = "";
let gameOver = false;
let deck = [];
let lastId = null;

function shuffle(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function refillDeck() {
  const progress = PW.loadProgress();
  let pool = entries.filter(function (e) { return !progress.solved[e.id]; });
  if (pool.length === 0) pool = entries.slice();
  deck = shuffle(pool);

  if (deck.length > 1 && deck[deck.length - 1].id === lastId) {
    deck.unshift(deck.pop());
  }
}

function pickEntry() {
  if (deck.length === 0) refillDeck();
  return deck.pop();
}

function showDoneForToday() {
  gameOver = true;   
  topicEl.textContent = BRANCH.name;
  definitionEl.textContent = "You've finished your " + PW.DAILY_LIMIT +
    " words for today. Come back tomorrow for more!";
  messageEl.textContent = "";
  nextBtn.hidden = true;
  hintsEl.hidden = true;
  boardEl.innerHTML = "";
  keyboardEl.innerHTML = "";
  updateProgress();
}

function newGame() {
  if (PW.roundsLeftToday() === 0) {
    showDoneForToday();
    return;
  }
  current = pickEntry();
  lastId = current.id;
  answer = current.answer;
  guesses = [];
  typing = "";
  gameOver = false;

  topicEl.textContent = BRANCH.name + " · " + answer.length + " letters";
  definitionEl.textContent = current.def;
  messageEl.textContent = "";
  nextBtn.hidden = true;

  renderHints(1);
  buildBoard();
  buildKeyboard();
  updateProgress();
}

function updateProgress() {
  const solved = PW.countSolved(entries);
  const days = PW.dayStreak(PW.loadProgress());
  progressEl.textContent = "Today: " + PW.roundsToday() + " of " + PW.DAILY_LIMIT + " words" +
    " · Solved " + solved + " of " + entries.length +
    (days > 0 ? " · 🔥 " + days + "-day streak" : "");
}

function renderHints(tryNumber) {
  hintsEl.innerHTML = "";
  const photos = current.photos;

  if (tryNumber >= HINT_SCENARIO_TRY && current.scenario) {
    hintsEl.appendChild(makeScenarioHint(current.scenario));
  }
  const photoRow = document.createElement("div");
  photoRow.className = "photo-row";
  if (tryNumber >= HINT_PHOTO1_TRY && photos[0]) {
    photoRow.appendChild(makePhotoHint(photos[0], "Photo example 1"));
  }
  if (tryNumber >= HINT_PHOTO2_TRY && photos[1]) {
    photoRow.appendChild(makePhotoHint(photos[1], "Photo example 2"));
  }
  if (photoRow.children.length > 0) hintsEl.appendChild(photoRow);

  hintsEl.hidden = hintsEl.children.length === 0;
}

function makeLabel(text) {
  const label = document.createElement("div");
  label.className = "hint-label";
  label.textContent = text;
  return label;
}

function makeScenarioHint(text) {
  const box = document.createElement("div");
  box.className = "hint-block";
  const body = document.createElement("p");
  body.className = "hint-text";
  body.textContent = text;
  box.append(makeLabel("Example scenario"), body);
  return box;
}

function makePhotoHint(photo, labelText) {
  const box = document.createElement("figure");
  box.className = "hint-block photo-hint";

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.caption || "";
  img.addEventListener("error", function () {
    const missing = document.createElement("div");
    missing.className = "photo-missing";
    missing.textContent = "📷 Photo coming soon";
    img.replaceWith(missing);
  });

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption || "";
  if (photo.credit) {
    const credit = document.createElement("span");
    credit.className = "photo-credit";
    credit.textContent = photo.credit;
    caption.appendChild(credit);
  }

  box.append(makeLabel(labelText), img, caption);
  return box;
}

function unlockHints(nextTry) {
  renderHints(nextTry);
  if (nextTry === HINT_SCENARIO_TRY && current.scenario) {
    showMessage("Hint unlocked: a real-life example.");
  } else if (nextTry === HINT_PHOTO1_TRY && current.photos[0]) {
    showMessage("Hint unlocked: a photo example.");
  } else if (nextTry === HINT_PHOTO2_TRY && current.photos[1]) {
    showMessage("Last hint unlocked: another photo example.");
  }
}
function buildBoard() {
  boardEl.innerHTML = "";
  boardEl.style.setProperty("--len", answer.length);   // tells the CSS how many columns

  for (let r = 0; r < MAX_TRIES; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let c = 0; c < answer.length; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      row.appendChild(tile);
    }
    boardEl.appendChild(row);
  }
}

function renderTyping() {
  const row = boardEl.children[guesses.length];
  if (!row) return;
  for (let c = 0; c < answer.length; c++) {
    const tile = row.children[c];
    tile.textContent = typing[c] || "";
    tile.classList.toggle("filled", Boolean(typing[c]));
  }
}

function evaluate(guess, target) {
  const result = Array(target.length).fill("absent");
  const leftover = {};

  for (let i = 0; i < target.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = "correct";
    } else {
      leftover[target[i]] = (leftover[target[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (result[i] === "correct") continue;
    const letter = guess[i];
    if (leftover[letter] > 0) {
      result[i] = "present";
      leftover[letter]--;
    }
  }
  return result;
}

function submitGuess() {
  if (gameOver) return;

  if (typing.length < answer.length) {
    showMessage("Not enough letters. This word has " + answer.length + ".");
    return;
  }

  const result = evaluate(typing, answer);
  const row = boardEl.children[guesses.length];

  for (let c = 0; c < answer.length; c++) {
    const tile = row.children[c];
    tile.style.transitionDelay = c * 0.08 + "s";
    tile.classList.add(result[c]);
    colorKey(typing[c], result[c]);
  }

  guesses.push(typing);
  const won = typing === answer;
  typing = "";

  if (won) {
    endGame(true);
  } else if (guesses.length === MAX_TRIES) {
    endGame(false);
  } else {
    unlockHints(guesses.length + 1);
  }
}

function answerLabel() {
  return current.answerText === current.term
    ? current.term
    : current.answerText + " (" + current.term + ")";
}

function endGame(won) {
  gameOver = true;
  PW.recordResult(current.id, won);
  updateProgress();
  renderHints(99);

  if (won) {
    showMessage("Correct! " + answerLabel() + " in " + guesses.length + "/" + MAX_TRIES + ".");
  } else {
    showMessage("Out of tries. The answer was " + answerLabel() + ".");
  }
  
  const lastOne = PW.roundsLeftToday() === 0;
  if (lastOne) {
    showMessage(messageEl.textContent + " That was your last word for today. Come back tomorrow!");
  }
  nextBtn.hidden = lastOne;
}

function showMessage(text) {
  messageEl.textContent = text;
}

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
];

function buildKeyboard() {
  keyboardEl.innerHTML = "";
  KEY_ROWS.forEach(function (keys) {
    const row = document.createElement("div");
    row.className = "kb-row";
    keys.forEach(function (k) {
      const btn = document.createElement("button");
      btn.className = "key" + (k.length > 1 ? " wide" : "");
      btn.dataset.key = k;
      btn.textContent = k === "BACK" ? "⌫" : k;
      row.appendChild(btn);
    });
    keyboardEl.appendChild(row);
  });
}

const RANK = { absent: 1, present: 2, correct: 3 };
function colorKey(letter, status) {
  const btn = keyboardEl.querySelector('[data-key="' + letter + '"]');
  if (!btn) return;
  const old = ["absent", "present", "correct"].find(function (s) {
    return btn.classList.contains(s);
  });
  if (old && RANK[old] >= RANK[status]) return;
  btn.classList.remove("absent", "present", "correct");
  btn.classList.add(status);
}

function pressKey(key) {
  if (gameOver) return;
  messageEl.textContent = "";

  if (key === "ENTER") {
    submitGuess();
  } else if (key === "BACK") {
    typing = typing.slice(0, -1);
    renderTyping();
  } else if (/^[A-Z]$/.test(key) && typing.length < answer.length) {
    typing += key;
    renderTyping();
  }
}

keyboardEl.addEventListener("click", function (e) {
  const btn = e.target.closest(".key");
  if (!btn) return;
  pressKey(btn.dataset.key);
  btn.blur();
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Enter") {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "A" || tag === "BUTTON") return;
    if (e.repeat) return;                 // ignore a held-down Enter key
    if (gameOver) {
      if (PW.roundsLeftToday() > 0) newGame();   // round is over: Enter = next word
    } else {
      pressKey("ENTER");
    }
  } else if (e.key === "Backspace") {
    pressKey("BACK");
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    pressKey(e.key.toUpperCase());
  }
});

nextBtn.addEventListener("click", newGame);

titleEl.textContent = BRANCH.name;
if (entries.length === 0) {
  definitionEl.textContent = "There are no playable terms yet. Add some in data/words.js.";
  topicEl.textContent = "";
  progressEl.textContent = "";
} else {
  newGame();
}
