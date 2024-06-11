let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "orange", "blue"];
let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0; // Initialize highest score from local storage or default to 0
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore");

// Function to update highest score
function updateHighestScore(score) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore); // Store highest score in local storage
    highScoreDisplay.innerText = `Highest Score: ${highestScore}`;
}

// Update highest score display initially
updateHighestScore(highestScore);

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length); // Adjusted random index to the length of btns array
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            levelUp();
        }
        console.log("same value");
    } else {
        h2.innerHTML = `Game Over: Your score was <b>${level}</b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; // Corrected misspelling of backgroundColor
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        // Check if the current score beats the highest score
        if (level > highestScore) {
            updateHighestScore(level); // Update highest score if current score is higher
        }
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
