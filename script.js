const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const newGameBtn = document.getElementById("newGameBtn");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

// Start Game
beginGame();

// Starting or restarting click listener
newGameBtn.addEventListener("click", beginGame);

// Clears previous game and sets fresh grid
function beginGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

// Determines whether game was won, or a draw, then sets turn accordingly
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (winCheck(currentClass)) {
    gameOver(false);
  } else if (isTie()) {
    gameOver(true);
  } else {
    switchTurn();
    setBoardHoverClass();
  }
}

// X Win, O Win, or Tie display message
function gameOver(tie) {
  if (tie) {
    winningMessageTextElement.innerText = "Tie!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Won!`;
  }
  winningMessageElement.classList.add("show");
}

// Recognizes grid cells are all filled-in
function isTie() {
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// X's or O's
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// New player turn based on results
function switchTurn() {
  circleTurn = !circleTurn;
}

// Hover effects based on player X or Circle's turn
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// Deciphers winning combinations
function winCheck(currentClass) {
  return WINNING_COMBOS.some(combos => {
    return combos.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
