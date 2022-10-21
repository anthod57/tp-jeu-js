const userFormEl = document.getElementById("user-form");
const usernameInputEl = document.getElementById("username");
const leaderBoardListEl = document.getElementById("leaderboard-list");

export class UI {
    static showUserForm() {
        userFormEl.style = "";
    }

    static hideUserForm() {
        userFormEl.style = "display: none";
    }

    static getUserName() {
        return usernameInputEl.value;
    }

    static populateLeaderboard(scores) {
        scores.forEach(x => {
            leaderBoardListEl.innerHTML += `<li>${x.name} - ${x.score}</li>`;
        })
    }
}