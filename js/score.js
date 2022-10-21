

export class Score{
    scores=[];

    constructor(){

    }

    addScore(nom,score){
        console.log('add')
        this.scores.push({'name':nom,'score':score})
        this.save();
    }
    save(){
        console.log('save')
        localStorage.setItem('scores',JSON.stringify(this.scores));
    }
    load(){
        let scores= JSON.parse(localStorage.getItem('scores'));
        if(scores){
            console.log('existing_scores')
            scores.forEach(elem=> {
                console.log(elem)
                this.scores.push(elem);
            });
        }
        console.log(scores)
    }
}