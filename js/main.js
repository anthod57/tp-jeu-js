import { Game, State } from "./game.js";

const inputEl = document.getElementById("entre");
const validateEl = document.getElementById("validate");

let game = new Game();

function init() {
    window.addEventListener("DOMContentLoaded", () => {
        validateListener();
    });
}

function validateListener() {
    validateEl.addEventListener("click", e => {
        e.preventDefault();
        console.log(game.makeAttempt(inputEl.value));
    })
}

init();