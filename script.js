const cell = document.querySelectorAll(".cell");
const resetbtn = document.getElementById("Reset");
const result = document.getElementById("Result");

let turnDisplay = document.getElementById("Turn"); // NEW
let scoreX = document.getElementById("scoreX"); // NEW
let scoreO = document.getElementById("scoreO"); // NEW
let scoreDraw = document.getElementById("scoreDraw"); // NEW

let currentplayer = "X";
let moves = [];
let gameOver = false;

let Xwins = 0;
let Owins = 0;
let Draws = 0;

const winpatten = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// --------- PLAY SOUNDS (OPTIONAL)---------
const playSound = (type) => {
  const audio = new Audio(
    type === "win" ? "win.mp3" : type === "draw" ? "draw.mp3" : "click.mp3"
  );
  audio.play();
};

// --------------------- CHECK WINNER ---------------------
const checkwinner = () => {
  for (let pattern of winpatten) {
    if (
      moves[pattern[0]] === currentplayer &&
      moves[pattern[1]] === currentplayer &&
      moves[pattern[2]] === currentplayer
    ) {
      highlightWinner(pattern); // NEW FEATURE
      return true;
    }
  }
  return false;
};

// ---------- HIGHLIGHT WINNING CELLS (NEW) ----------
const highlightWinner = (pattern) => {
  pattern.forEach((i) => {
    cell[i].style.backgroundColor = "#00c853";
    cell[i].style.color = "#fff";
    cell[i].style.transform = "scale(1.1)";
  });
};

// --------------------- CLICK FUNCTION ---------------------
const Btnclick = (index) => {
  if (gameOver) return;
  if (moves[index] === "X" || moves[index] === "O") return;

  moves[index] = currentplayer;
  cell[index].innerHTML = currentplayer;
  cell[index].classList.add("pop"); // animation

  playSound("click");

  // ✔ CHECK WIN
  if (checkwinner()) {
    result.innerHTML = `"${currentplayer}" Wins!`;
    gameOver = true;

    if (currentplayer === "X") Xwins++;
    else Owins++;

    updateScore();
    playSound("win");
    return;
  }

  // ✔ CHECK DRAW
  if (moves.filter(Boolean).length === 9) {
    result.innerHTML = "Match Draw!";
    Draws++;
    updateScore();
    gameOver = true;
    playSound("draw");
    return;
  }

  // ✔ SWITCH PLAYER
  currentplayer = currentplayer === "X" ? "O" : "X";
  turnDisplay.innerHTML = `Turn: ${currentplayer}`;
};

// --------------------- UPDATE SCOREBOARD ---------------------
const updateScore = () => {
  scoreX.innerHTML = Xwins;
  scoreO.innerHTML = Owins;
  scoreDraw.innerHTML = Draws;
};

// --------------------- RESET GAME ---------------------
function Resetgame() {
  cell.forEach((c) => {
    c.textContent = "";
    c.style.backgroundColor = "#eaeaea";
    c.style.color = "black";
    c.style.transform = "scale(1)";
    c.classList.remove("pop");
  });

  moves = [];
  currentplayer = "X";
  gameOver = false;
  result.innerHTML = "";
  turnDisplay.innerHTML = "Turn: X";
}

// Assign click events
cell.forEach((box, index) => {
  box.addEventListener("click", () => Btnclick(index));
});

resetbtn.addEventListener("click", Resetgame);

// Start fresh
Resetgame();
updateScore();
