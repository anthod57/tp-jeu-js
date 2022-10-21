import { UI } from "./ui.js";
let score = []
export class Score {

    constructor() {

    }

    addScore(nom, scores) {
        score.push({ 'name': nom, 'score': scores })
        this.save();
    }

    save() {
        localStorage.setItem('scores', JSON.stringify(score));
        UI.populateLeaderboard(score)
    }

    load() {
        let scores = JSON.parse(localStorage.getItem('scores'));
        if (scores) {
            scores.forEach(elem => {
                score.push(elem);
            });
            UI.populateLeaderboard(score)
        }
    }

    resetScore() {
        localStorage.clear();
        score=[];
        UI.populateLeaderboard(score);
    }

    searchByName(name) {
        let res = score.find(e => {
            return e.name == name;
        })
        return res
    }
}