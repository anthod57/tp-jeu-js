import { getRandomInt } from "./functions.js";

export class Game {
    attempts = 0;
    endTime = 0;

    constructor() {
        this._numberToFind = getRandomInt(1, 99);
        this._startTime = Date.now();
    }

    get numberToFind() {
        return this._numberToFind;
    }

    get startTime() {
        return this._startTime;
    }
}