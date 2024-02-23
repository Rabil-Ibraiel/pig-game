"use strict";

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let playerTurn = 0;
let score = [0, 0];

let img = document.querySelector(".dice");
img.style.display = "none";

let total = 0;

document.querySelector(".btn--roll").addEventListener("click", () => {
  let randNumber = Math.floor(Math.random() * 6 + 1);
  img.style.display = "block";
  img.src = `https://raw.githubusercontent.com/Rabil-Ibraiel/pig-game/main/images/dice-${randNumber}.png`;

  if (randNumber == 1) {
    total = 0;
    document.getElementById(`current--${playerTurn}`).textContent = 0;
    document.getElementById(`score--${playerTurn}`).textContent = 0;
    score[playerTurn] = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    playerTurn = playerTurn == 0 ? 1 : 0;
  } else {
    total += randNumber;
    document.getElementById(`current--${playerTurn}`).textContent = total;
    winCheck();
  }
});

document.querySelector(".btn--hold").addEventListener("click", () => {
  score[playerTurn] += total;
  score0.textContent = score[0];
  score1.textContent = score[1];

  if (score[playerTurn] >= 100) {
    document.querySelectorAll(".btn").forEach((item, index) => {
      if (index > 0) {
        item.setAttribute("disabled", "");
      }
    });
    document
      .querySelector(`.player--${playerTurn}`)
      .classList.add("player--winner");

    img.style.display = "none";
    return;
  }

  total = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  document.getElementById(`current--${playerTurn}`).textContent = 0;
  playerTurn = playerTurn == 0 ? 1 : 0;
});

function newGame() {
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  score = [0, 0];
  total = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  if (!player0.classList.contains("player--active")) {
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  }
  playerTurn = 0;
  document.querySelectorAll(".btn").forEach((item) => {
    item.removeAttribute("disabled");
  });
}

document.querySelector(".btn--new").addEventListener("click", newGame);
