import { getRandomInt } from "./functions.js";
import { Score} from "./score.js";
import { UI } from "./ui.js"

export const State = {
    Idle: Symbol("idle"),
    Started: Symbol("started"),
    Ended: Symbol("ended")
}
export const Result = {
    Win: Symbol('win'),
    Greater: Symbol('greater'),
    Smaller: Symbol('smaller')
}

export class Game {

    score=new Score();
    state = State.Idle;

    constructor() {
        this._numberToFind = getRandomInt(1, 99);
        this._attempts = 0;
        this._endTime = 0;
        this._startTime = 0;
    }

    start() {
        this._startTime = new Date();
        this.state = State.Started;
        this._attempts = 0;
        console.log(this._numberToFind)
    } 

    end() {
        this.state = State.Ended;
        this._endTime = new Date();
    }

    makeAttempt(number) {
        this._attempts++;

        if (this.state !== State.Started) {
            if (this._startTime === 0) {
                this.start();
            } else {
                return;
            }
        }

        if (number === this._numberToFind) {
            this.end();
            UI.showUserForm()
            return Result.Win;
        }
        if (number > this._numberToFind) {
            return Result.Smaller;
        }
        else {
            return Result.Greater;
        }
    }

    totalTime() {
        return Math.round((this._endTime.getTime() - this._startTime.getTime()) / 1000);
    }

    saveScore(){
        if(UI.getUserName()!==""){
            this.score.addScore(UI.getUserName(),this._attempts);
            UI.hideUserForm()
        }
    }

    get numberToFind() {
        return this._numberToFind;
    }

    get attempts() {
        return this._attempts;
    }
}