import { UI } from "./ui.js";
export let tabScore = []
export class Score {

    constructor() {

    }

    addScore(nom, scores) {
        tabScore.push({ 'name': nom, 'score': scores })
        this.save();
    }

    save() {
        localStorage.setItem('scores', JSON.stringify(tabScore));
        UI.populateLeaderboard(tabScore)
    }

    load() {
        let scores = JSON.parse(localStorage.getItem('scores'));
        if (scores) {
            scores.forEach(elem => {
                tabScore.push(elem);
            });
            UI.populateLeaderboard(tabScore)
        }
    }

    resetScore() {
        localStorage.clear();
        tabScore = [];
        UI.populateLeaderboard(tabScore);
    }

    searchByName(name) {
        let res = tabScore.find(e => {
            return e.name.includes(name);
        })
        return res
    }
}