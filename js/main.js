import { Game, State, Result } from "./game.js";

const inputEl = document.getElementById("entre");
const validateEl = document.getElementById("validate");
const message = document.getElementById("message");

let game = new Game();

function init() {
    window.addEventListener("DOMContentLoaded", () => {
        validateListener();
    });
}

function validateListener() {
    validateEl.addEventListener("click", e => {
        e.preventDefault();
        let res=game.makeAttempt(+inputEl.value);
        switch(res){
            case Result.Win:
                message.innerText=`You Won with ${game.attempts} attempts`
                break;
            case Result.Greater:
                message.innerText='Greater';
                break;
            case Result.Smaller:
                message.innerHTML='Smaller';
                break;
        }
    })
}

init();