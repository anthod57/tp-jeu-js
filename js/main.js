import { Game, State, Result } from "./game.js";
import { tabScore } from "./score.js";
import { UI } from "./ui.js";

const inputEl = document.getElementById("entre");
const inputLabelEl = document.getElementById("entre-label");
const validateEl = document.getElementById("validate");
const restartEl = document.getElementById("restart");
const messageEl = document.getElementById("message");
const saveEl = document.getElementById("save-score");
const resetEl = document.getElementById("reset");
const searchEl = document.getElementById("search-by");
const maxAttemptsEl = document.getElementById("max-attempts");
const maxAttemptsLabelEl = document.getElementById("max-attempts-label");
const maxNameSizeLabelEl = document.getElementById("max-name-size-label");
//const maxStoredScoreEl=document.getElementById("");
const maxNameSizeEl = document.getElementById("max-name-size");
const maxNumberEl = document.getElementById("range-number");
const maxNumberLabelEl = document.getElementById("range-number-label");
const maxTimeEl = document.getElementById("max-time");
const maxTimeLabelEl = document.getElementById("max-time-label");
const timerEl = document.getElementById("timer");

let game = new Game();
let Timer;

function init() {
  window.addEventListener("DOMContentLoaded", () => {
    validateListener();
    restartListener();
    saveListner();
    resetListener();
    searchListener();
    maxAttemptsHandler();
    maxNameSizeHandler();
    maxNumberHandler();
    maxTimeHandler();
    game.loadConfig();
    game.score.load();

    maxNameSizeEl.value = game.config.maxNameSize;
    maxNameSizeLabelEl.innerText = `Max Name Size (${maxNameSizeEl.value}):`;
    maxAttemptsEl.value = game.config.maxAttempts;
    maxAttemptsLabelEl.innerText = `Max Attempts (${maxAttemptsEl.value}):`;
    maxNumberEl.value = game.config.maxNumberToFind;
    maxNumberLabelEl.innerText = `Max number to find (${maxNumberEl.value}):`;
    inputLabelEl.innerText = `Entrer un nombre entre 1 et ${maxNumberEl.value}`;
    maxTimeEl.value = game.config.maxTime;
    maxTimeLabelEl.innerText = `Max Time to win (${maxTimeEl.value}s):`;
  });
}
function validerHandler() {
  if (game.state === State.Ended) return;

  if (game.state === State.Idle) {
    if (game.config.maxTime > 0) {
      clearInterval(Timer);
      Timer = setInterval(() => {
        if (game.state === State.Ended) {
          clearInterval(Timer);
        }

        let diff = game._maxTime.diff(moment());

        if (diff <= 0) {
          clearInterval(Timer);
          game.end();
          messageEl.innerHTML = `TIMES OUT`;
        }
        timerEl.innerText = moment(diff).format("mm:ss");
      }, 100);
    }
  }

  let res = game.makeAttempt(+inputEl.value);
  switch (res) {
    case Result.Win:
      messageEl.innerText = `You Won with ${game.attempts} attempts`;
      UI.showUserForm();
      break;
    case Result.Greater:
      messageEl.innerText = "Greater";
      break;
    case Result.Smaller:
      messageEl.innerHTML = "Smaller";
      break;
    case Result.Lost:
      messageEl.innerHTML = `YOU LOST (max of ${game.config.maxAttempts} attempts)`;
  }
  inputEl.value = "";
}
function validateListener() {
  validateEl.addEventListener("click", (e) => {
    e.preventDefault();
    validerHandler();
  });
  inputEl.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      validerHandler();
    }
  });
}

function restart() {
  game = new Game();
  messageEl.innerText = "";
  inputEl.value = "";
  messageEl.value = "";
  game.loadConfig();
  game.score.load();
  timerEl.innerText = "";
}

function restartListener() {
  restartEl.addEventListener("click", (e) => {
    e.preventDefault();

    restart();
  });
}

function saveListner() {
  saveEl.addEventListener("click", (e) => {
    if (UI.getUserName().length > game.config.maxNameSize) {
      alert(
        "Veuillez entrer un maximum de " +
          game.config.maxNameSize +
          " caractères."
      );
      return;
    }
    e.preventDefault();
    game.saveScore();

    restart();
  });
}

function resetListener() {
  resetEl.addEventListener("click", (e) => {
    game.score.resetScore();
  });
}
function searchListener() {
  searchEl.addEventListener("keyup", (e) => {
    let username = e.target.value;

    if (username === "") {
      UI.populateLeaderboard(tabScore);
      return;
    }

    let find = game.score.searchByName(username);

    UI.populateLeaderboard(find);
  });
}

function maxAttemptsHandler() {
  maxAttemptsEl.addEventListener("input", (e) => {
    maxAttemptsLabelEl.innerText = `Max Attempts (${e.target.value}):`;
    game.config = { maxAttempts: +e.target.value };
  });
}

function maxNameSizeHandler() {
  maxNameSizeEl.addEventListener("input", (e) => {
    maxNameSizeLabelEl.innerText = `Max Name Size (${e.target.value}):`;
    game.config = { maxNameSize: +e.target.value };
  });
}

function maxNumberHandler() {
  maxNumberEl.addEventListener("input", (e) => {
    maxNumberLabelEl.innerText = `Max number to find (${e.target.value}):`;
    inputLabelEl.innerText = `Entrer un nombre entre 1 et ${e.target.value}`;
    game.config = { maxNumberToFind: +e.target.value };
  });
}

function maxTimeHandler() {
  maxTimeEl.addEventListener("input", (e) => {
    maxTimeLabelEl.innerText = `Max Time to win (${e.target.value}s):`;
    game.config = { maxTime: +e.target.value };
  });
}

init();
