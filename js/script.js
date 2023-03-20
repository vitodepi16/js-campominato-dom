const formLevel = document.getElementById("formLevel");
formLevel.addEventListener("submit", play);
var counterVal = 0;

//  FUNZIONE PER CREARE CELLE

function drawSquare(index, numSquare) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `calc(100% / ${numSquare}) `;
  square.style.height = square.style.width;
  square.innerHTML = index;
  return square;
}

//  FUNZIONE PER GENERARE L'ARRAY DELLE BOMBE

function generateBombs(numBomb, numSquare) {
  const bombs = [];
  while (bombs.length < numBomb) {
    const bomb = getRndNumber(1, numSquare);
    if (bombs.indexOf(bomb) === -1) {
      bombs.push(bomb);
    }
  }
  return bombs;
}
function showAllBombs(bombs){
    const squares = document.querySelectorAll('.square');
    for(let square of squares ){
        if (bombs.includes(parseInt(square.innerText))){
            square.classList.add('unsafe');
        }
    }
}
function setMessage(message){
    score = document.getElementById('score');
    score.innerHTML = message;
};

//  FUNZIONE PER FAR PARTIRE IL GIOCO
function play(e) {
  e.preventDefault();
  const NUM_BOMBS = 16;
  const playground = document.getElementById("playground");
  playground.innerHTML = " ";
  const numBombs = 16;
  let gameOver = false;
  //  selezione livello
  const level = document.getElementById("level").value;

  let squareNmr;

  switch (level) {
    case "easy":
      squareNmr = 100;
      break;
    case "medium":
      squareNmr = 81;
      break;
    case "hard":
      squareNmr = 49;
      break;
  }

  // celle per lato

  let squareRow = Math.sqrt(squareNmr);

  const bombs = generateBombs(NUM_BOMBS, squareNmr);
  console.log(bombs);

 
  let safeSquare = parseInt(0);
  let maxScore = squareNmr - numBombs;

  // num celle creo la cella con funzione drawSquare

  for (let i = 1; i <= squareNmr; i++) {
    const square = drawSquare(i, squareRow);
    const contentSquare = parseInt(square.innerText);

    square.addEventListener("click", function () {
        if(!gameOver){
            if (bombs.includes(contentSquare)) {
                square.classList.add("unsafe");
                alert("Hai cliccato su una bomba, HAI PERSO !!");
                gameOver = true;
                showAllBombs(bombs);
              } else {
                safeSquare++;
                message = `<h3 class=" mt-3 "> Il tuo punteggio è : ${safeSquare} </div>`;
                square.classList.add("safe");
              } setMessage(message);
        }

 
    });

    playground.appendChild(square);
  }
}
