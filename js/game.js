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
  };

  score = new Score();
  state = State.Idle;

  constructor() {
    this._numberToFind = getRandomInt(1, 99);
    this._attempts = 1;
    this._endTime = 0;
    this._startTime = 0;
  }

  start() {
    this._startTime = new Date();
    this.state = State.Started;
    this._attempts = 1;
    console.log(this._numberToFind);
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

    if (this._attempts === this._config.maxAttempts) {
      this.end();
      return Result.Lost;
    }
    if (number === this._numberToFind) {
      this.end();
      UI.showUserForm();
      return Result.Win;
    }
    if (number > this._numberToFind) {
      return Result.Smaller;
    } else {
      return Result.Greater;
    }
  }

  totalTime() {
    return Math.round(
      (this._endTime.getTime() - this._startTime.getTime()) / 1000
    );
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
  load() {
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
}
