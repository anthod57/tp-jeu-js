import { Game, State, Result } from "./game.js";

const inputEl = document.getElementById("entre");
const validateEl = document.getElementById("validate");
const restartEl = document.getElementById("restart");
const messageEl = document.getElementById("message");

let game = new Game();

function init() {
    window.addEventListener("DOMContentLoaded", () => {
        validateListener();
        restartListener();
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

function restartListener() {
    restartEl.addEventListener("click", e => {
        e.preventDefault();

        game = new Game();
        messageEl.innerText = "";
    })
}

init();