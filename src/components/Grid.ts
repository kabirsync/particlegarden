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
}
