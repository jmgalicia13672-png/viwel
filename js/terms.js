const listEl = document.getElementById("terms-list");

function renderTerms() {
  const progress = PW.loadProgress();
  const all = PW.allEntries();
  const solved = PW.countSolved(all);

  document.getElementById("terms-title").textContent = BRANCH.name;
  document.getElementById("terms-note").textContent =
    all.length + " terms and their definitions. " + solved + " solved so far.";

  listEl.innerHTML = "";
  all.forEach(function (entry) {
    const card = document.createElement("div");
    card.className = "term-card";

    const head = document.createElement("div");
    head.className = "term-head";

    const name = document.createElement("h2");
    name.className = "term-name";
    name.textContent = entry.term;
    head.appendChild(name);

    const badge = document.createElement("span");
    if (progress.solved[entry.id]) {
      badge.className = "term-badge solved";
      badge.textContent = "Solved";
      head.appendChild(badge);
    } else if (progress.misses[entry.id]) {
      badge.className = "term-badge review";
      badge.textContent = "Review";
      head.appendChild(badge);
    }

    const def = document.createElement("p");
    def.className = "term-def";
    def.textContent = entry.def;

    card.append(head, def);
    listEl.appendChild(card);
  });
}

renderTerms();
