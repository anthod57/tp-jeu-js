import { getRandomInt } from "./functions.js";

const inputEl = document.getElementById("entre");
const validateEl = document.getElementById("validate");

let GAME = {
    attempts: 0,
    numberToFind: 0,
}

function newGame() {
    GAME.attempts = 0;
    GAME.numberToFind = getRandomInt(1, 99);
}

function init(){
    window.addEventListener("DOMContentLoaded", () => {
        
    });
}

function validateListener() {
    validateEl.addEventListener("click",testValeur(inputEL.value))
}