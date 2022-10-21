import { Game, State, Result } from "./game.js";
import { tabScore } from "./score.js";
import { UI } from "./ui.js";

const inputEl = document.getElementById("entre");
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

let game = new Game();

function init() {
    window.addEventListener("DOMContentLoaded", () => {
        validateListener();
        restartListener();
        saveListner();
        resetListener();
        searchListener();
        maxAttemptsHandler();
        maxNameSizeHandler();
        game.score.load();
    });
}

function validateListener() {
    validateEl.addEventListener("click", e => {
        e.preventDefault();
        let res = game.makeAttempt(+inputEl.value);
        switch (res) {
            case Result.Win:
                messageEl.innerText = `You Won with ${game.attempts} attempts`;
                break;
            case Result.Greater:
                messageEl.innerText = 'Greater';
                break;
            case Result.Smaller:
                messageEl.innerHTML = 'Smaller';
                break;
        }
    })
}

function restart() {
    game = new Game();
    messageEl.innerText = "";
    inputEl.value = "";
    messageEl.value = "";
}

function restartListener() {
    restartEl.addEventListener("click", e => {
        e.preventDefault();

        restart()
    })
}

function saveListner() {
    saveEl.addEventListener("click", e => {
        if (UI.getUserName().length > game.config.maxNameSize) {
            alert("Veuillez entrer un maximum de " + game.config.maxNameSize + " caractères.");
            return;
        }
        e.preventDefault();
        game.saveScore();

        restart();
    })
}

function resetListener() {
    resetEl.addEventListener("click", e => {
        game.score.resetScore();
    })
}
function searchListener() {
    searchEl.addEventListener("keyup", e => {
        let username = e.target.value;

        if (username === "") {
            UI.populateLeaderboard(tabScore);
            return;
        }

        let find = game.score.searchByName(username);

        UI.populateLeaderboard(find);
    })
}

function maxAttemptsHandler() {
    maxAttemptsEl.addEventListener("input", e => {
        maxAttemptsLabelEl.innerText = `Max Attempts (${e.target.value}):`;
        game.config = { maxAttempts: +e.target.value };
    })
}

function maxNameSizeHandler() {
    maxNameSizeEl.addEventListener("input", e => {
        maxNameSizeLabelEl.innerText = `Max Name Size (${e.target.value}):`;
        game.config = { maxNameSize: +e.target.value };
    })
}

init();