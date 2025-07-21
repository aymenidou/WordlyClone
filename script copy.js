async function isWordValid(word) {
  const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
  const data = await response.json();
  return data.length > 0 && data[0].word.toLowerCase() === word.toLowerCase();
}

isWordValid("hello").then(console.log); // true
isWordValid("asdfgh").then(console.log); // false

// script.js

const secretWord = "CRANE"; // Change to randomizer later
const rows = 6, cols = 5;
let currentRow = 0;
let currentCol = 0;

const board = document.getElementById("game-board");

let grid = [];

function createGrid() {
  board.innerHTML = "";
  grid = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    const rowDiv = document.createElement("div");
    rowDiv.className = "d-flex gap-2 justify-content-center";

    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "letter-box";
      cell.setAttribute("data-row", r);
      cell.setAttribute("data-col", c);
      row.push(cell);
      rowDiv.appendChild(cell);
    }

    grid.push(row);
    board.appendChild(rowDiv);
  }
}

function updateCell(letter) {
  if (currentCol < cols && currentRow < rows) {
    const cell = grid[currentRow][currentCol];
    cell.textContent = letter;
    cell.classList.add("filled");
    currentCol++;
  }
}

function deleteLetter() {
  if (currentCol > 0) {
    currentCol--;
    const cell = grid[currentRow][currentCol];
    cell.textContent = "";
    cell.classList.remove("filled");
  }
}

function submitGuess() {
  if (currentCol < cols) return;

  const guess = grid[currentRow].map(cell => cell.textContent).join("");

  const result = getResult(guess);

  for (let i = 0; i < cols; i++) {
    grid[currentRow][i].classList.remove("filled");
    grid[currentRow][i].classList.add(result[i]);
  }

  if (guess === secretWord) {
    setTimeout(() => alert("🎉 Correct!"), 200);
    return;
  }

  currentRow++;
  currentCol = 0;

  if (currentRow === rows) {
    setTimeout(() => alert("Game Over! The word was " + secretWord), 200);
  }
}

function getResult(guess) {
  const result = Array(cols).fill("gray");
  const used = Array(cols).fill(false);

  for (let i = 0; i < cols; i++) {
    if (guess[i] === secretWord[i]) {
      result[i] = "green";
      used[i] = true;
    }
  }

  for (let i = 0; i < cols; i++) {
    if (result[i] === "green") continue;

    for (let j = 0; j < cols; j++) {
      if (!used[j] && guess[i] === secretWord[j]) {
        result[i] = "yellow";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

function handleKeyPress(event) {
  if (currentRow >= rows) return;

  const key = event.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) {
    updateCell(key);
  } else if (key === "BACKSPACE") {
    deleteLetter();
  } else if (key === "ENTER") {
    submitGuess();
  }
}

function restartGame() {
  currentRow = 0;
  currentCol = 0;
  createGrid();
}

document.addEventListener("keydown", handleKeyPress);

// Initialize the game board on load
createGrid();
