class Board {
    constructor() {
        const numberOfCells = (WIDTH/STEP)*(HEIGHT/STEP);

        this.cells = this.#createArrayOfCells(numberOfCells);
        this.emptyCellCoord = this.#setCoordToEmptyCell();

        this.gridNumbers = new Array(this.cells.length+1);

        
        this.drawBoardGrid();
        this.drawBoardCells();
        
        this.numCorrectPlacedCells = null;
        this.puzzleComplete = false;

        this.checkIsPuzzleComplete();
    }

    checkIsPuzzleComplete() {
        this.#checkIsCellOnCorrectPlace();
        this.#countCorrectPlacedCells();
        if (this.numCorrectPlacedCells === this.cells.length) {
            // console.log("Puzzle Complete!");
            this.puzzleComplete = true;
            return true;
        } else {
            return false;
        }
    }

    #checkIsCellOnCorrectPlace() {
      for (const cell of this.cells) {
        const gridIndexForCell = cell.coord[0]/STEP + cell.coord[1]/STEP*WIDTH/STEP;
        cell.indexOnGrid = gridIndexForCell;
        
        cell.correctPlace = (cell.num - 1 === cell.indexOnGrid) ? true : false;
      }
    }

    #countCorrectPlacedCells() {
        let numOfCorrectCells = 0;
       for (const cell of this.cells) {
           if (cell.correctPlace) {
               numOfCorrectCells++;
            }
        }
        this.numCorrectPlacedCells = numOfCorrectCells;
    }

    #setCoordToEmptyCell() {
        const x = this.cells.at(-1).coord[0] + STEP;
        const y = this.cells.at(-1).coord[1];
        return [x, y];
    }

    #createArrayOfCells(numberOfCells) {
        const numbers = [];
        const cells = new Array(numberOfCells-1);
        for (let i = 0; i < numberOfCells-1; i++) {
            numbers.push(i + 1);
        }
        shuffle(numbers);
        for (let i = 0; i < cells.length; i++) {
            const cellNum = numbers[i];
            const cell = new Cell(cellNum, i);
            cells[i] = cell;
        }
        return cells;
    }

    drawBoardGrid() {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "gray";
            for (let i = STEP; i < WIDTH; i+=STEP) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, HEIGHT);
                
            }
            for (let j = STEP; j < HEIGHT; j+=STEP) {
                ctx.moveTo(0, j);
                ctx.lineTo(WIDTH, j);
            }
            ctx.stroke();
        
        this.#drawBoardNumbers();  
    }

    #drawBoardNumbers() {
        ctx.font = "22px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#e83c39";
        ctx.globalAlpha = 0.2;
    
        const numbers= new Array(this.cells.length+1).fill(0);
        let num = 1;
        let x = 0;
        let y = 0;
    
        for (let i = 0; i < numbers.length; i++) {
            if (i !== 0 && i % (WIDTH/STEP) === 0) {
                y++;
                x = 0;
            }
            ctx.fillText(`${num}`, STEP/2 + x * STEP, STEP/2 + y * STEP);

            this.gridNumbers[i] = num;

            x++;
            num++;
        }
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
    }

    drawBoardCells() {
        for (let i = 0; i < this.cells.length; i++) {
            const x = this.cells[i].coord[0];
            const y = this.cells[i].coord[1];
            const num = this.cells[i].num;

            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x, y, STEP, STEP);
            ctx.fillStyle = "green";
            ctx.fillRect(x, y, STEP, STEP);
            ctx.fillStyle = "darkgreen";
            ctx.fillRect(x+5, y+5, STEP-10, STEP-10);
            ctx.fillStyle = "green";
            ctx.fillRect(x+10, y+10, STEP-20, STEP-20);
            ctx.font = "36px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.5;
            ctx.fillText(`${num}`, STEP/2 + x, STEP/2 + y);
            ctx.globalAlpha = 1;
        }
    }
    
}