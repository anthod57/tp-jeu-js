import { getRandomInt } from "./functions.js";

export const State = {
    Idle: Symbol("idle"),
    Started: Symbol("started"),
    Ended: Symbol("ended")
}
export const Result={
    Win : Symbol('win'),
    Greater : Symbol('greater'),
    Smaller : Symbol('smaller')
}

export class Game {
    state = State.Idle;

    constructor() {
        this._numberToFind = getRandomInt(1, 99);
        this._attempts = 0;
        this._endTime = 0;
    }

    start() {
        if (this.state === State.Ended) return;

        this._startTime = new Date();
        this.state = State.Started;
    }

    end() {
        this.state = State.Ended;
        this._endTime = new Date();
    }

    makeAttempt(number) {
        this._attempts++;

        if (this.state !== State.Started) this.start();

        if (number === this._numberToFind) {
            this.end();
            return Result.Win;
        }
        if(number>this._numberToFind){
            return Result.Smaller;
        }
        else{
            return Result.Greater;
        }
    }

    totalTime() {
        return Math.round((this._endTime.getTime() - this._startTime.getTime()) / 1000);
    }

    get numberToFind() {
        return this._numberToFind;
    }

    get attempts() {
        return this._attempts;
    }
}