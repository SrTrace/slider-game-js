class Cell {
    constructor(num, index) {
        this.num = num;
        this.indexOnGrid = index;

        this.coord = [];
        this.correctPlace = false;

        this.#setCoord(this.indexOnGrid);
    }

    #setCoord(index) {
        let x = 0;
        let y = 0;
        if (index !== 0) {
            x = index % (WIDTH/STEP);
            y = Math.floor(index / (WIDTH/STEP));
        }
        this.coord = [x * STEP, y * STEP];
    }
}