"use strict";

const playerOne = document.getElementById("current--0");
const playerTow = document.getElementById("current--1");
let img = document.querySelector(".dice");
img.style.display = "none";
let playerTurn = document.querySelector(".player--active").classList[1];

document.querySelector(".btn--roll").addEventListener("click", () => {
  let randNumber = Math.floor(Math.random() * 6 + 1);
  img.style.display = "block";
  img.src = `https://raw.githubusercontent.com/Rabil-Ibraiel/pig-game/main/images/dice-${randNumber}.png`;

  let total = 0;

  if (randNumber == 1) {
    howIsPlaying()[0].innerHTML = 0;
    howIsPlaying()[1].innerHTML = 0;
    nextPlayerTurn();
  } else {
    total += randNumber;
    score(total);
  }
});

document.querySelector(".btn--hold").addEventListener("click", () => {
  if (playerTurn == "player--0") {
    document.getElementById("score--0").innerHTML = playerOne.innerHTML;
    nextPlayerTurn();
  } else {
    document.getElementById("score--1").innerHTML = playerTow.innerHTML;
    nextPlayerTurn();
  }
});

function score(total) {
  if (playerTurn == "player--0") {
    playerOne.innerHTML = Number(playerOne.innerHTML) + Number(total);
    winCheck(playerOne.innerHTML);
  } else {
    playerTow.innerHTML = Number(playerTow.innerHTML) + Number(total);
    winCheck(playerTow.innerHTML);
  }
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
  playerOne.innerHTML = 0;
  playerTow.innerHTML = 0;
  document.getElementById("score--0").innerHTML = 0;
  document.getElementById("score--1").innerHTML = 0;
  if (playerTurn == "player--1") {
    nextPlayerTurn();
  }

  // Countrine here
}

document.querySelector(".btn--new").addEventListener("click", newGame);

function winCheck(total) {
  if (total >= 100) {
    console.log(total);

    document.querySelectorAll(".btn").forEach((item) => {
      item.setAttribute("disabled", "");
    });

    if (playerTurn == "player--0") {
      document.getElementById("score--0").innerHTML = total;
    } else {
      document.getElementById("score--1").innerHTML = total;
    }

    document.querySelector(".player--winner").style.display = "flex";
    document.getElementById("winner-name").innerHTML = `${
      playerTurn == "player--0" ? "Player 1" : "Player 2"
    } Win the game!`;
  }
}

function howIsPlaying() {
  if (playerTurn == "player--0") {
    return [document.getElementById("score--0"), playerOne];
  } else {
    return [document.getElementById("score--1"), playerTow];
  }
}
