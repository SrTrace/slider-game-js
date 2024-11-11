const eventTypes = ["mousedown", "mouseup", "mousemove", "contextmenu", "click"];
let leftBtnPressed = false;
let isCellMoving = false;

let distanceToEmptyCell = null;
let cellCoord = [];
let startPosInteractionCell = null;
let starPos = [];
let endPos = [];
let isMovable = false; 
let movableCellsIndex = []; 

function addEventListeners(element, handler) {
    eventTypes.forEach(eventType => {
        element.addEventListener(eventType, handler);
    });
}

function handleGameSet(event) {
    if (event.type === "click") {
        switch(event.target.className) {
            case "restart":
                restartGame();
                break;
            case "difficulty":
                modalContainer.style.display = "flex";
                break;
            case "modal-container":
                if (!modalLevel.contains(event.target)) {
                    closeModal();
                }
                break;
        }

        const figure = event.target.closest('.modal-figure');
        if (figure) {
            const figureNumber = figure.dataset.figure;
            setGameParame(figureNumber);
            restartGame();
            closeModal();
        }
    }
}

function restartGame() {
    display.textContent = "Slider Puzzle!";
    display.classList.remove('animate-puzzle-complete');
    board = new Board();
    update();
}

function closeModal() {
    modalContainer.style.display = "none";
}

function setGameParame(figureNumber) {
    switch (figureNumber) {
        case "3":
            canvas.width = 300;
            WIDTH = 300;
            canvas.height = 300;
            HEIGHT = 300;
            STEP = 100;
            break;
        case "4":
            canvas.width = 400; 
            WIDTH = 400;
            canvas.height = 400; 
            HEIGHT = 400;
            STEP = 100;
            break;
        case "5":
            canvas.width = 400; 
            WIDTH = 400;
            canvas.height = 400;
            HEIGHT = 400;
            STEP = 80;
            break;
        case "6":
            canvas.width = 420;
            WIDTH = 420;
            canvas.height = 420; 
            HEIGHT = 420;
            STEP = 70;
            break;
    }
}

function handleMouseEvent(event) {
    switch(event.type) {
        case "mousedown":
            handleMouseDown(event);
            break;
        case "mouseup":
            handleMouseUp(event);
            break;
        case "mousemove":
            handleMouseMove(event);
            break;
        case "contextmenu":
            event.preventDefault();
            console.log("menu")
            break;
    }
}

function handleMouseDown(event) {
    // Code to handle mouse down event
    if (event.button === 0) {
        leftBtnPressed = true;
        cellCoord = getCellCoord(event);
        isMovable = checkIsMovable(cellCoord);
        if (isMovable && !isCellMoving) {
            movableCellsIndex = getMovableCellsIndex(cellCoord, isMovable);
            isCellMoving = true;

            //set start position for active (first) movableCell
            startPosInteractionCell = getCoord(event);

            //set startPos for all  movableCells
            for (let i = 0; i < movableCellsIndex.length; i++) {
                const cellIndex = movableCellsIndex[i];
                starPos.push([...board.cells[cellIndex].coord]);
            }

            //set endPos for all movableCells
            for (let i = 0; i < movableCellsIndex.length; i++) {
                if ( i == movableCellsIndex.length - 1) {
                    endPos.push([...board.emptyCellCoord]);
                } else {
                    const nextCellIndex = movableCellsIndex[i+1];
                    endPos.push([...board.cells[nextCellIndex].coord]);
                }
            }
        }
    }
}

function handleMouseMove(event) {
    // Code to handle mouse move event
    if (leftBtnPressed && isCellMoving) {
        const axis = (isMovable === "verticalAxis") ? 1 : 0;
        const mouseAxis = getCoord(event)[axis];
        const delta = mouseAxis - startPosInteractionCell[axis];
        startPosInteractionCell[axis] = mouseAxis;

        //add delta to all movableCells
        for (let i = 0; i < movableCellsIndex.length; i++) {
            const index = movableCellsIndex[i];
            board.cells[index].coord[axis] += delta;
        }

        //calc dist from nearest to EmptyCell to EmptyCell
        distanceToEmptyCell = getDistance(board.cells[movableCellsIndex[movableCellsIndex.length-1]].coord, board.emptyCellCoord);
    
        if (distanceToEmptyCell < STEP * 0.4) {
            //set to all movableCell endPos
            for (let i = 0; i < movableCellsIndex.length; i++) {
                const index = movableCellsIndex[i];
                board.cells[index].coord = endPos[i];
            }
            board.emptyCellCoord = cellCoord;
            POP_SOUND.play();
            isCellMoving = false;
        }
    }
}

function handleMouseUp(event) {
    // Code to handle mouse up event
    leftBtnPressed = false;
    isCellMoving = false;

    if (distanceToEmptyCell >= STEP * 0.4) {
        //set to all movableCell startPos
        for (let i = 0; i < movableCellsIndex.length; i++) {
            const index = movableCellsIndex[i];
            board.cells[index].coord = starPos[i];
        }
    }
    starPos.splice(0, starPos.length);
    endPos.splice(0, endPos.length);
    
    board.checkIsPuzzleComplete();
}