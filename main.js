const display = document.querySelector(".text");
const restartBtn = document.querySelector(".restart");
const diffcultyBtn = document.querySelector(".difficulty");
const modalContainer = document.querySelector('.modal-container');
const modalLevel = document.querySelector('.modal-level');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let STEP = 100;
let WIDTH = 300;
let HEIGHT = 300;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let POP_SOUND=new Audio("./sounds/pop.mp3");
let WIN_SOUND=new Audio("./sounds/win.mp3");
POP_SOUND.volume=0.1;
WIN_SOUND.volume=0.1;

let board = new Board();

addEventListeners(canvas, handleMouseEvent);
addEventListeners(restartBtn, handleGameSet);
addEventListeners(diffcultyBtn, handleGameSet);
addEventListeners(modalContainer, handleGameSet);
addEventListeners(modalLevel, handleGameSet);

update();

function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    board.drawBoardGrid()
    board.drawBoardCells();

    if (board.puzzleComplete) {
        // display.textContent = "Puzzle Complete!";
        // WIN_SOUND.play();
        showPuzzleCompleteAnimation();
        cancelAnimationFrame(update);
    } else {
        requestAnimationFrame(update);
    }
}

function showPuzzleCompleteAnimation() {
    display.style.display = "block";
    display.textContent = "Puzzle Complete!";
    WIN_SOUND.play();
    display.classList.add('animate-puzzle-complete');
}