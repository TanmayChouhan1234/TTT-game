const cell = document.querySelectorAll(".cell");
const resetbtn = document.getElementById("Reset");
const result = document.getElementById("Result");
let currentplayer = "X";

let moves = [];
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

const checkwinner = () => {
  let value = winpatten.some((patten) =>
    patten.every((index) => moves[index] === currentplayer)
  );
  // console.log(value);
  return value;
};

const Btnclick = (input) => {
  if (moves[input] == "X" || moves[input] == "O") {
    return;
  }
  moves[input] = currentplayer;
  cell[input].innerHTML = currentplayer;
  if (checkwinner()) {
    alert(`${currentplayer} Wins!`);
    result.innerHTML = ` Your Result :- " ${currentplayer} " Wins!`;
  }
  if (currentplayer == "X") {
    currentplayer = "O";
  } else {
    currentplayer = "X";
  }
};

function Resetgame() {
  cell.forEach((cell) => (cell.textContent = ""));
  moves = [];

  // console.log("rdaf", Resetgame);
}
resetbtn.addEventListener("click", Resetgame);
Resetgame();
Btnclick();
