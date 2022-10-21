const userFormEl = document.getElementById("user-form");
const usernameInputEl = document.getElementById("username");
const leaderBoardListEl = document.getElementById("leaderboard-list");

export class UI {
    static showUserForm() {
        userFormEl.style = "";
    }

    static hideUserForm() {
        usernameInputEl.value = "";
        userFormEl.style = "display: none";
    }

    static getUserName() {
        return usernameInputEl.value;
    }

    static populateLeaderboard(scores) {
        leaderBoardListEl.innerHTML = "";
        scores.sort((a, b) => { return a.score - b.score });

        scores.forEach(x => {
            leaderBoardListEl.innerHTML += `<li>${x.name} - ${x.score}</li>`;
        })
    }
}