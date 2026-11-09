const statsEl = document.getElementById("stats");
const resetBtn = document.getElementById("reset");

function makeStat(value, label) {
  const box = document.createElement("div");
  box.className = "stat";
  const num = document.createElement("div");
  num.className = "num";
  num.textContent = value;
  const text = document.createElement("div");
  text.className = "label";
  text.textContent = label;
  box.append(num, text);
  return box;
}

function renderStreak(progress) {
  const card = document.getElementById("streak-card");
  const days = PW.dayStreak(progress);
  const week = PW.lastDays(progress, 7);
  const playedToday = week[week.length - 1].played;
  const longest = Math.max(progress.bestDayStreak, days);

  card.innerHTML = "";
  card.classList.toggle("active", days > 0);

  const left = document.createElement("div");
  left.className = "streak-main";

  const big = document.createElement("div");
  big.className = "streak-number";
  big.textContent = (days > 0 ? "🔥 " : "") + days + " day streak";

  const note = document.createElement("div");
  note.className = "streak-note";
  if (playedToday) {
    note.textContent = "You've played today. Come back tomorrow to keep it going!";
  } else if (days > 0) {
    note.textContent = "Play a round today to keep your streak alive.";
  } else {
    note.textContent = "Play a round today to start a streak.";
  }

  const best = document.createElement("div");
  best.className = "streak-best";
  best.textContent = "Longest streak: " + longest + (longest === 1 ? " day" : " days");

  left.append(big, note, best);

  const strip = document.createElement("div");
  strip.className = "week";
  week.forEach(function (day) {
    const cell = document.createElement("div");
    cell.className = "week-day" + (day.played ? " played" : "") + (day.isToday ? " today" : "");
    const dot = document.createElement("div");
    dot.className = "week-dot";
    dot.textContent = day.played ? "✓" : "";
    const name = document.createElement("div");
    name.className = "week-name";
    name.textContent = day.label;
    cell.append(dot, name);
    strip.appendChild(cell);
  });

  card.append(left, strip);
}

function renderReview(missed, progress) {
  const reviewEl = document.getElementById("review-list");
  const noteEl = document.getElementById("review-note");

  reviewEl.innerHTML = "";
  if (missed.length === 0) {
    noteEl.textContent = "Nothing to review yet. Words you miss will show up here with their definitions.";
    return;
  }
  noteEl.textContent = missed.length + (missed.length === 1 ? " word" : " words") +
    " to study. A word leaves this list once you solve it.";

  missed.forEach(function (entry) {
    const item = document.createElement("div");
    item.className = "review-item";

    const term = document.createElement("div");
    term.className = "review-term";
    term.textContent = entry.term;

    const meta = document.createElement("div");
    meta.className = "review-meta";
    const times = progress.misses[entry.id];
    meta.textContent = "Missed " + times + (times === 1 ? " time" : " times");

    const def = document.createElement("div");
    def.className = "review-def";
    def.textContent = entry.def;

    item.append(term, meta, def);
    reviewEl.appendChild(item);
  });
}

function render() {
  const progress = PW.loadProgress();
  const playable = PW.entries();
  const missed = PW.reviewList(progress);

  document.getElementById("intro").textContent =
    BRANCH.name + ": read a definition, guess the term. Five tries per word.";

  renderStreak(progress);

  statsEl.innerHTML = "";
  statsEl.append(
    makeStat(PW.countSolved(playable) + " / " + playable.length, "Words solved"),
    makeStat(progress.streak, "Win streak (words in a row)"),
    makeStat(progress.best, "Best win streak"),
    makeStat(missed.length, "Words to review")
  );

  renderReview(missed, progress);
}

resetBtn.addEventListener("click", function () {
  if (confirm("Reset all your progress? This can't be undone.")) {
    PW.resetProgress();
    render();
  }
});

render();
