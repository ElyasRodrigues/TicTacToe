const gameRegions = document.querySelectorAll(".btnPlay");
let gameArray = [];
let turnPlayer = "";
let scorePlayer1 = 0
let scorePlayer2 = 0


function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById("turnPlayer").innerText = playerInput.value;

  const btn = document.getElementById("startGame")
  btn.innerText = "Jogar novamente!"
  btn.style.fontSize = "18px"
  btn.style.width = "170px"

}

function initializeGame() {
  gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";

  document.querySelector("h2").innerHTML =
    "Vez de: <span id='turnPlayer'></span>";
  updateTitle();

  gameRegions.forEach((btn) => {
    btn.classList.remove("win");
    btn.innerText = "";
    btn.classList.add("cursorPointer");
    btn.addEventListener("click", handleGameClick);
    btn.removeAttribute("disabled")
  });

  document.getElementById("player1").setAttribute("disabled", "true")
  document.getElementById("player2").setAttribute("disabled", "true")
}

function getWinRegions() {
  const winRegions = []
  if (gameArray[0][0] && gameArray[0][0] === gameArray[0][1] && gameArray[0][0] === gameArray[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (gameArray[1][0] && gameArray[1][0] === gameArray[1][1] && gameArray[1][0] === gameArray[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (gameArray[2][0] && gameArray[2][0] === gameArray[2][1] && gameArray[2][0] === gameArray[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (gameArray[0][0] && gameArray[0][0] === gameArray[1][0] && gameArray[0][0] === gameArray[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (gameArray[0][1] && gameArray[0][1] === gameArray[1][1] && gameArray[0][1] === gameArray[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (gameArray[0][2] && gameArray[0][2] === gameArray[1][2] && gameArray[0][2] === gameArray[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (gameArray[0][0] && gameArray[0][0] === gameArray[1][1] && gameArray[0][0] === gameArray[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (gameArray[0][2] && gameArray[0][2] === gameArray[1][1] && gameArray[0][2] === gameArray[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

function handleWin(regions){
  regions.forEach((region) => {
    document.querySelector("[data-region='" + region + "']").classList.add("win")
  })

  const playerName = document.getElementById(turnPlayer).value
  document.querySelector("h2").innerText = playerName + " venceu!!"

  if(turnPlayer === "player1"){
    scorePlayer1++
    const newScore = scorePlayer1
    document.getElementById("player1Score").innerText = newScore
  } else {
    scorePlayer2++
    const newScore = scorePlayer2
    document.getElementById("player2Score").innerText = newScore
  }

  gameRegions.forEach((btn) => {
    btn.setAttribute("disabled", "true")
    btn.classList.remove('cursorPointer')
  })

}

function disableRegion(element){
  element.classList.remove('cursorPointer')
  element.removeEventListener('click', handleGameClick)
  element.setAttribute("disabled", "true")
}

function handleGameClick(ev){
  const btn = ev.currentTarget;
  const region = btn.dataset.region;
  const rowColumnPair = region.split(".");
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];

  if (turnPlayer === "player1") {
    btn.innerText = "X";
    gameArray[row][column] = "X";
  } else {
    btn.innerText = "O";
    gameArray[row][column] = "O";
  }

  console.clear()
  console.table(gameArray)
  
  disableRegion(btn);

  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (gameArray.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle()
  } else {
    document.querySelector("h2").innerText = "Empate!!";
  }
}

document.getElementById('startGame').addEventListener('click', initializeGame)