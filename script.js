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
const newGameBtn = document.getElementById('newGameBtn')
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

beginGame();

newGameBtn.addEventListener('click', beginGame)

function beginGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show')
}

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

function gameOver(tie) {
  if (tie) {
      winningMessageTextElement.innerText = 'Tie!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Won!`;
  }
  winningMessageElement.classList.add("show");
}

function isTie() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function winCheck(currentClass) {
  return WINNING_COMBOS.some(combos => {
    return combos.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
