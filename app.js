/* Quiz Night — app logic */

const QUESTION_SECONDS = 15;

let state = {
  category: null,
  questions: [],
  current: 0,
  score: 0,
  answers: [],      // { chosen, correct, correctIndex }
  timer: null,
  timeLeft: QUESTION_SECONDS
};

const el = {
  screens: {
    start: document.getElementById("screen-start"),
    play: document.getElementById("screen-play"),
    results: document.getElementById("screen-results")
  },
  categoryGrid: document.getElementById("category-grid"),
  startBtn: document.getElementById("start-btn"),
  selectedNote: document.getElementById("selected-note"),

  progressDots: document.getElementById("progress-dots"),
  timerBar: document.getElementById("timer-bar"),
  timerNum: document.getElementById("timer-num"),
  liveScore: document.getElementById("live-score"),
  questionCat: document.getElementById("question-cat"),
  questionText: document.getElementById("question-text"),
  optionsList: document.getElementById("options-list"),
  nextBtn: document.getElementById("next-btn"),

  resultScore: document.getElementById("result-score"),
  resultTotal: document.getElementById("result-total"),
  resultLine: document.getElementById("result-line"),
  reviewList: document.getElementById("review-list"),
  retryBtn: document.getElementById("retry-btn"),
  changeCatBtn: document.getElementById("change-cat-btn")
};

function showScreen(name) {
  Object.entries(el.screens).forEach(([key, node]) => {
    node.classList.toggle("is-active", key === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Start screen ---------- */

function renderCategories() {
  el.categoryGrid.innerHTML = CATEGORIES.map(c => `
    <button class="cat-card" data-cat="${c.id}">
      <span class="cat-card__icon">${c.icon}</span>
      <span class="cat-card__name">${c.name}</span>
      <span class="cat-card__blurb">${c.blurb}</span>
    </button>`).join("");

  el.categoryGrid.querySelectorAll(".cat-card").forEach(btn => {
    btn.addEventListener("click", () => {
      el.categoryGrid.querySelectorAll(".cat-card").forEach(b => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      state.category = CATEGORIES.find(c => c.id === btn.dataset.cat);
      el.selectedNote.textContent = `${state.category.name} — 6 questions, ${QUESTION_SECONDS}s each. Ready?`;
      el.startBtn.disabled = false;
    });
  });
}

el.startBtn.addEventListener("click", () => {
  if (!state.category) return;
  state.questions = state.category.questions;
  state.current = 0;
  state.score = 0;
  state.answers = [];
  showScreen("play");
  renderQuestion();
});

/* ---------- Play screen ---------- */

function renderProgressDots() {
  el.progressDots.innerHTML = state.questions.map((_, i) => {
    let cls = "dot";
    if (i < state.current) cls += " is-done";
    if (i === state.current) cls += " is-current";
    return `<span class="${cls}"></span>`;
  }).join("");
}

function renderQuestion() {
  const q = state.questions[state.current];
  el.questionCat.textContent = `${state.category.icon} ${state.category.name} · Question ${state.current + 1} of ${state.questions.length}`;
  el.questionText.textContent = q.q;
  el.liveScore.textContent = state.score;
  el.nextBtn.style.display = "none";
  renderProgressDots();

  el.optionsList.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn" data-idx="${i}">
      <span class="option-btn__letter">${String.fromCharCode(65 + i)}</span>
      <span>${opt}</span>
    </button>`).join("");

  el.optionsList.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => selectAnswer(parseInt(btn.dataset.idx, 10)));
  });

  startTimer();
}

function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = QUESTION_SECONDS;
  updateTimerUI();
  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerUI();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      selectAnswer(-1); // timed out, no answer chosen
    }
  }, 1000);
}

function updateTimerUI() {
  el.timerNum.textContent = state.timeLeft;
  const pct = (state.timeLeft / QUESTION_SECONDS) * 100;
  el.timerBar.style.width = pct + "%";
  el.timerBar.classList.toggle("is-low", state.timeLeft <= 5);
}

function selectAnswer(idx) {
  clearInterval(state.timer);
  const q = state.questions[state.current];
  const correct = idx === q.answer;
  if (correct) state.score += 1;

  state.answers.push({ chosen: idx, correctIndex: q.answer, correct, question: q.q, options: q.options });

  const buttons = el.optionsList.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("is-correct");
    if (i === idx && !correct) btn.classList.add("is-wrong");
  });

  el.liveScore.textContent = state.score;
  el.nextBtn.style.display = "inline-flex";
  el.nextBtn.textContent = state.current === state.questions.length - 1 ? "See results" : "Next question";
}

el.nextBtn.addEventListener("click", () => {
  state.current += 1;
  if (state.current >= state.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

/* ---------- Results screen ---------- */

function showResults() {
  showScreen("results");
  const total = state.questions.length;
  el.resultScore.textContent = state.score;
  el.resultTotal.textContent = "/ " + total;

  const pct = state.score / total;
  let line;
  if (pct === 1) line = "Perfect round — you'd win the quiz night trophy.";
  else if (pct >= 0.7) line = "Strong showing. You clearly know your table trivia.";
  else if (pct >= 0.4) line = "Solid effort — a few close calls in there.";
  else line = "Rough round. Buy yourself a drink and try another category.";
  el.resultLine.textContent = line;

  el.reviewList.innerHTML = state.answers.map((a, i) => `
    <div class="review-item ${a.correct ? "is-correct" : "is-wrong"}">
      <span class="review-item__mark">${a.correct ? "✓" : "✕"}</span>
      <div>
        <p class="review-item__q">${i + 1}. ${a.question}</p>
        <p class="review-item__a">
          ${a.correct
            ? `Your answer: <strong>${a.options[a.chosen]}</strong>`
            : `Your answer: <strong>${a.chosen === -1 ? "No answer (time ran out)" : a.options[a.chosen]}</strong> · Correct: <strong>${a.options[a.correctIndex]}</strong>`}
        </p>
      </div>
    </div>`).join("");
}

el.retryBtn.addEventListener("click", () => {
  state.current = 0;
  state.score = 0;
  state.answers = [];
  showScreen("play");
  renderQuestion();
});

el.changeCatBtn.addEventListener("click", () => {
  state.category = null;
  el.startBtn.disabled = true;
  el.selectedNote.textContent = "Pick a category to see how many questions and how much time you'll get.";
  document.querySelectorAll(".cat-card").forEach(b => b.classList.remove("is-selected"));
  showScreen("start");
});

/* ---------- Init ---------- */

renderCategories();
