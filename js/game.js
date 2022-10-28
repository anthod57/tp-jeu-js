import { getRandomInt } from "./functions.js";
import { Score } from "./score.js";
import { UI } from "./ui.js";

export const State = {
    Idle: Symbol("idle"),
    Started: Symbol("started"),
    Ended: Symbol("ended"),
};

export const Result = {
    Win: Symbol("win"),
    Greater: Symbol("greater"),
    Smaller: Symbol("smaller"),
    Lost: Symbol("lost"),
};

export class Game {
    _config = {
        maxAttempts: 20,
        //maxStoredScore:0,
        maxNameSize: 20,
        maxNumberToFind: 999,
        maxTime: 0,
    };

    score = new Score();
    state = State.Idle;

    constructor() {
        this._attempts = 1;
        this._endTime = 0;
        this._maxTime = 0;
        this._startTime = 0;
    }

    start() {
        this._startTime = moment();

        if (this._config.maxTime > 0) {
            this._maxTime = moment(this._startTime);
            this._maxTime.add(this._config.maxTime, "seconds");
        }

        this.state = State.Started;
        this._attempts = 1;
        this._numberToFind = getRandomInt(1, +this._config.maxNumberToFind);

        console.log(this._numberToFind);
    }

    end() {
        this.state = State.Ended;
        this._endTime = moment();
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

        if (this._attempts === this._config.maxAttempts) {
            this.end();
            return Result.Lost;
        }

        if (number === this._numberToFind) {
            this.end();
            return Result.Win;
        }
        if (number > this._numberToFind) {
            return Result.Smaller;
        } else {
            return Result.Greater;
        }
    }

    saveScore() {
        if (UI.getUserName() !== "") {
            this.score.addScore(UI.getUserName(), this._attempts);
            UI.hideUserForm();
        }
    }

    saveConfig() {
        localStorage.setItem("config", JSON.stringify(this._config));
    }

    loadConfig() {
        let config = JSON.parse(localStorage.getItem("config"));
        if (config) {
            this._config = config;
        }
    }

    set config(_config) {
        if (this.state === State.Started) {
            return;
        }

        this._config = { ...this._config, ..._config };
        this.saveConfig();
    }

    get config() {
        return this._config;
    }

    get numberToFind() {
        return this._numberToFind;
    }

    get attempts() {
        return this._attempts;
    }

    get startTime() {
        return this._startTime;
    }

    get maxTime() {
        return this._maxTime;
    }

    get endTime() {
        return this._endTime;
    }
}
