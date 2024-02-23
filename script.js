"use strict";

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
let playerTurn = document.querySelector(".player--active").classList[1];

let img = document.querySelector(".dice");
img.style.display = "none";

let total = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

document.querySelector(".btn--roll").addEventListener("click", () => {
  let randNumber = Math.floor(Math.random() * 6 + 1);
  img.style.display = "block";
  img.src = `https://raw.githubusercontent.com/Rabil-Ibraiel/pig-game/main/images/dice-${randNumber}.png`;

  if (randNumber == 1) {
    total = 0;
    if (playerTurn == "player--0") {
      playerOneScore = 0;
      current0.textContent = 0;
    } else {
      playerTwoScore = 0;
      current1.textContent = 0;
    }
    nextPlayerTurn();
  } else {
    total = randNumber;
    score(total);
  }
});

document.querySelector(".btn--hold").addEventListener("click", () => {
  if (playerTurn == "player--0") {
    score0.textContent = playerOneScore;
    nextPlayerTurn();
  } else {
    score1.textContent = playerTwoScore;
    nextPlayerTurn();
  }
  total = 0;
});

function score(total) {
  if (playerTurn == "player--0") {
    playerOneScore += total;
    current0.textContent = playerOneScore;
    winCheck(playerOneScore);
  } else {
    playerTwoScore += total;
    current1.textContent = playerTwoScore;
    winCheck(playerTwoScore);
  }
  total = 0;
}

function nextPlayerTurn() {
  const playerOneSection = document.querySelector(".player--0");
  const playerTwoSection = document.querySelector(".player--1");
  if (playerTurn == "player--0") {
    playerOneSection.classList.remove("player--active");
    playerTwoSection.classList.add("player--active");
    playerTurn = document.querySelector(".player--active").classList[1];
  } else {
    playerTwoSection.classList.remove("player--active");
    playerOneSection.classList.add("player--active");
    playerTurn = document.querySelector(".player--active").classList[1];
  }
}

function newGame() {
  current0.innerHTML = 0;
  current1.innerHTML = 0;
  score0.innerHTML = 0;
  score1.innerHTML = 0;
  total = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  if (playerTurn == "player--1") {
    nextPlayerTurn();
  }
}

document.querySelector(".btn--new").addEventListener("click", newGame);

function winCheck(total) {
  if (total >= 100) {
    console.log(total);

    document.querySelectorAll(".btn").forEach((item) => {
      item.setAttribute("disabled", "");
    });

    if (playerTurn == "player--0") {
      score0.innerHTML = total;
    } else {
      score1.innerHTML = total;
    }

    document.querySelector(".player--winner").style.display = "flex";
    document.getElementById("winner-name").innerHTML = `${
      playerTurn == "player--0" ? "Player 1" : "Player 2"
    } Win the game!`;
  }
}
