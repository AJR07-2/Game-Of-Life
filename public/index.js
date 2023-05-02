class GameOfLife {
	grid = [];
	size = 4;
	iteration = 0;
	boardWidth = 100;
	started = false;

	constructor(size, boardWidth) {
		this.size = size;
		this.grid = this.initGrid();
		this.started = false;
		this.boardWidth = boardWidth;
		this.onloadGrid();
		this.trackSizeOfBoard();
		this.trackStart();
		this.iteration = 0;
	}

	run() {
		this.iteration++;
		if (!this.started) return;
		let newGrid = this.initGrid();
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				let neighbors = this.countNeighbors(i, j);
				if (this.grid[i][j]) {
					if (neighbors < 2 || neighbors > 3) {
						newGrid[i][j] = false;
					} else {
						newGrid[i][j] = true;
					}
				} else {
					if (neighbors === 3) {
						newGrid[i][j] = true;
					} else {
						newGrid[i][j] = false;
					}
				}
			}
		}
		this.grid = newGrid;
		this.onloadGrid();

		//get the counter
		let counter = document.getElementById('life-number');
		counter.innerHTML = `Day No: ${this.iteration}`;

		//get speed
		let speed = document.getElementById('speed-of-life');

		setTimeout(() => {
			this.run();
		}, speed);
	}

	countNeighbors(i, j) {
		let neighbors = 0;
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				if (x === 0 && y === 0) continue;
				let newI = i + x;
				let newJ = j + y;
				if (newI < 0 || newI >= this.size || newJ < 0 || newJ >= this.size) continue;
				if (this.grid[newI][newJ]) neighbors++;
			}
		}
		return neighbors;
	}

	trackStart() {
		let element = document.getElementById('start-button');
		element.onclick = () => {
			this.started = !this.started;
			element.innerHTML = this.started ? '■ Stop' : '▶ Start';
			if (this.started)
				this.run();
			this.onloadGrid();
		}
	}

	trackSizeOfBoard() {
		let element = document.getElementById('size-of-board');
		element.onchange = () => {
			this.size = element.value;
			this.grid = this.initGrid();
			this.onloadGrid();
		}
	}

	initGrid() {
		let grid = [];
		for (let i = 0; i < this.size; i++) {
			grid.push([]);
			for (let j = 0; j < this.size; j++) {
				grid[i][j] = false;
			}
		}
		return grid;
	}

	onloadGrid() {
		let element = document.getElementById('simul');
		while (element.firstChild) {
			element.removeChild(element.lastChild);
		}
		let grid = this.grid;
		for (let i = 0; i < this.size; i++) {
			let row = document.createElement('div');
			row.className = 'row';
			element.appendChild(row);
			for (let j = 0; j < this.size; j++) {
				let cell = document.createElement('div');
				cell.className = 'cell';
				cell.id = i + '-' + j;
				cell.style.width = `${8 * this.boardWidth / this.size}px`;
				cell.style.height = `${8 * this.boardWidth / this.size}px`;
				cell.style.border = `${0.01 * this.boardWidth / this.size}px solid lime`;

				if (!this.started) {
					cell.onclick = () => { grid[i][j] = !grid[i][j]; this.onloadGrid() };
					cell.classList.add('hover');
				}
				if (grid[i][j]) cell.classList.add('alive');
				row.appendChild(cell);
			}
		}
	}
}

let gameOfLife = new GameOfLife(5, 100);