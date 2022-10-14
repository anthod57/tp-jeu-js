import { Game } from "./game.js";

const inputEl = document.getElementById("entre");
const validateEl = document.getElementById("validate");

let game = new Game();

function init() {
    window.addEventListener("DOMContentLoaded", () => {

    });
}

function validateListener() {
    validateEl.addEventListener("click", testValeur(inputEL.value))
}