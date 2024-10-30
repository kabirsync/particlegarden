import Empty from "@/components/simulation/materials/Empty";
import Particle from "@/components/simulation/materials/Particle";

type GridParams = { rows: number; columns: number };

export class Grid {
  rows: number;
  columns: number;
  grid: Particle[];

  constructor({ rows, columns }: GridParams) {
    this.rows = rows;
    this.columns = columns;
    this.grid = new Array(this.columns * this.rows)
      .fill(0)
      .map((_, i) => new Empty(i));
  }

  index(x: number, y: number) {
    return y * this.columns + x;
  }

  setIndex(i: number, particle: Particle) {
    this.grid[i] = particle;
    particle.index = i;
  }

  set(column: number, row: number, particle: Particle) {
    const index = this.index(column, row);
    if (column < 0 || column >= this.columns) return -1;
    if (row < 0 || row >= this.rows) return -1;
    this.setIndex(index, particle);
  }
}
