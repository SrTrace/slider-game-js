//aлгоритм тасування Фішера-Єйтса.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // випадковий індекс від 0 до i
        // поміняти елементи місцями
        // те ж саме можна записати як:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getMovableCellsIndex(cellCoord, movableAxis) {
    let movableCellsIndex = [];
    let numMovableCell = null;
    switch(movableAxis) {
        case 'verticalAxis':
            numMovableCell = Math.abs((board.emptyCellCoord[1] - cellCoord[1])) / STEP; 
            if (board.emptyCellCoord[1] > cellCoord[1]) {
                //move down
                movableCellsIndex = findAllMovableCells(numMovableCell, cellCoord, 'down');
            }
            if (board.emptyCellCoord[1] < cellCoord[1]) {
                //move up
                movableCellsIndex = findAllMovableCells(numMovableCell, cellCoord, 'up');
            }
            break;
        case 'horizontalAxis':
            numMovableCell = Math.abs((board.emptyCellCoord[0] - cellCoord[0])) / STEP;
            if (board.emptyCellCoord[0] > cellCoord[0]) {
                //move to right
                movableCellsIndex = findAllMovableCells(numMovableCell, cellCoord, 'right');
            }
            if (board.emptyCellCoord[0] < cellCoord[0]) {
                //move to left
                movableCellsIndex = findAllMovableCells(numMovableCell, cellCoord, 'left');
            }
            break;
    }
    return movableCellsIndex;
}

function findAllMovableCells(numMovableCell, cellCoord, direction, movableCellsIndex = []) {
    const cellIndex = board.cells.findIndex(cell => cell.coord[0] === cellCoord[0] && cell.coord[1] === cellCoord[1])
    movableCellsIndex.push(cellIndex);

    if (numMovableCell == 1) {
        return movableCellsIndex;
    } else {
        let [x,y] = [...cellCoord];
        switch(direction) {
            case 'down':
                y = y + STEP;
                break;
            case 'up':
                y = y - STEP;
                break;
            case 'right':
                x = x + STEP;
                break;
            case 'left':
                x = x - STEP;
                break;
        }
        return findAllMovableCells(numMovableCell - 1, [x, y], direction, movableCellsIndex);
    }
}

function checkIsMovable(cellCoord) {
    if (cellCoord[0] === board.emptyCellCoord[0]) {
        return 'verticalAxis';
    }
    if (cellCoord[1] === board.emptyCellCoord[1]) {
        return 'horizontalAxis';
    }
    return false;
}

function getCellCoord(event) {
    const [mouseX, mouseY] = getCoord(event);
    // Calculate cell coordinates
    const cellX = Math.floor(mouseX / STEP) * STEP;
    const cellY = Math.floor(mouseY / STEP) * STEP;

    return [cellX, cellY];
}

function getCoord(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    return [mouseX, mouseY];
}

function getDistance(p1, p2) {
   let sqDist = 0;
   for (let i = 0; i < p1.length; i++) {
      sqDist += (p1[i] - p2[i]) ** 2;
   }
   return Math.sqrt(sqDist);
}