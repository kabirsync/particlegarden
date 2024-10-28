type GridParams = { rows: number; columns: number };

export class Grid {
  rows: number;
  columns: number;
  grid: number[];

  constructor({ rows, columns }: GridParams) {
    this.rows = rows;
    this.columns = columns;
    this.grid = new Array(this.columns * this.rows).fill(0);
  }

  index(x: number, y: number) {
    return y * this.columns + x;
  }

  setIndex(i: number, particle: number) {
    this.grid[i] = particle;
    // particle.index = i;
  }

  set(column: number, row: number, particle: number) {
    const index = this.index(column, row);
    if (column < 0 || column >= this.columns) return -1;
    if (row < 0 || row >= this.rows) return -1;
    this.setIndex(index, particle);
  }
}
