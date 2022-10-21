import { UI } from "./ui.js";
const score=[]
export class Score{

    constructor(){

    }

    addScore(nom,scores){
        score.push({'name':nom,'score':scores})
        this.save();
    }
    save(){
        localStorage.setItem('scores',JSON.stringify(score));
        UI.populateLeaderboard(score)
    }
    load(){
        let scores= JSON.parse(localStorage.getItem('scores'));
        if(scores){
            scores.forEach(elem=> {
                score.push(elem);
            });
            UI.populateLeaderboard(score)
        }
    }
}