const PW = (function () {

  const MAX_LETTERS = 14;

  const DAILY_LIMIT = 5;

  const STORAGE_KEY = "viwel.progress.v1";

  function answerOf(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, "");
  }

  function allEntries() {
    return BRANCH.terms.map(function (t) {
      const answerText = t.answer || t.term;
      return {
        id: BRANCH.id + ":" + t.term,
        term: t.term,
        answerText: answerText,
        answer: answerOf(answerText),
        def: t.def,
        scenario: t.scenario || "",
        photos: t.photos || []
      };
    });
  }

  function entries() {
    return allEntries().filter(function (e) {
      return e.answer.length > 0 && e.answer.length <= MAX_LETTERS;
    });
  }

  function emptyProgress() {
    return { solved: {}, misses: {}, streak: 0, best: 0, days: {}, bestDayStreak: 0 };
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign(emptyProgress(), JSON.parse(raw));
    } catch (e) {
     
    }
    return emptyProgress();
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {

    }
  }

 
  function dateKey(date) {
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + m + "-" + d;
  }

  
  function daysAgo(n, from) {
    const date = new Date(from || new Date());
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - n);
    return date;
  }


  function dayStreak(progress, from) {
    const days = progress.days || {};
    let n = days[dateKey(daysAgo(0, from))] ? 0 : 1;
    let count = 0;
    while (days[dateKey(daysAgo(n, from))]) {
      count++;
      n++;
    }
    return count;
  }

 
  function lastDays(progress, count, from) {
    const days = progress.days || {};
    const list = [];
    for (let i = count - 1; i >= 0; i--) {
      const date = daysAgo(i, from);
      list.push({
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        played: Boolean(days[dateKey(date)]),
        isToday: i === 0
      });
    }
    return list;
  }

 
  function roundsToday() {
    const p = loadProgress();
    return p.days[dateKey(new Date())] || 0;
  }


  function roundsLeftToday() {
    return Math.max(0, DAILY_LIMIT - roundsToday());
  }

 
  function recordResult(entryId, won) {
    const p = loadProgress();


    const today = dateKey(new Date());
    p.days[today] = (p.days[today] || 0) + 1;
    const currentDays = dayStreak(p);
    if (currentDays > p.bestDayStreak) p.bestDayStreak = currentDays;

    if (won) {
      p.solved[entryId] = true;
      p.streak += 1;
      if (p.streak > p.best) p.best = p.streak;
    } else {
      p.misses[entryId] = (p.misses[entryId] || 0) + 1;
      p.streak = 0;
    }
    saveProgress(p);
    return p;
  }

  function resetProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
    }
  }

  function countSolved(list) {
    const p = loadProgress();
    return list.filter(function (e) { return p.solved[e.id]; }).length;
  }

  // Words the student missed and hasn't solved since, most-missed first.
  function reviewList(progress) {
    return allEntries()
      .filter(function (e) { return progress.misses[e.id] && !progress.solved[e.id]; })
      .sort(function (a, b) { return progress.misses[b.id] - progress.misses[a.id]; });
  }

  return {
    MAX_LETTERS: MAX_LETTERS,
    answerOf: answerOf,
    allEntries: allEntries,
    entries: entries,
    loadProgress: loadProgress,
    recordResult: recordResult,
    resetProgress: resetProgress,
    DAILY_LIMIT: DAILY_LIMIT,
    roundsToday: roundsToday,
    roundsLeftToday: roundsLeftToday,
    dayStreak: dayStreak,
    lastDays: lastDays,
    countSolved: countSolved,
    reviewList: reviewList
  };
})();
