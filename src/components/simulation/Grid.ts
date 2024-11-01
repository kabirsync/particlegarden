import Empty from "@/components/simulation/materials/Empty";
import Particle, { Params } from "@/components/simulation/materials/Particle";

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

  clear() {
    this.grid = new Array(this.rows * this.columns)
      .fill(0)
      .map((_, i) => new Empty(i));
  }

  isEmpty(index: number) {
    return this.grid[index]?.isEmpty ?? false;
  }

  updateWithParams(params: Params) {
    const { direction = 1 } = params;
    const startRow = direction > 0 ? this.rows - 1 : 0;
    const endRow = direction > 0 ? -1 : this.rows;
    const rowStep = direction > 0 ? -1 : 1;

    const leftToRight = Math.random() > 0.5; // Decide once per `updateWithParams` call
    for (let row = startRow; row !== endRow; row += rowStep) {
      const rowOffset = row * this.columns;

      for (let i = 0; i < this.columns; i++) {
        const columnOffset = leftToRight ? i : this.columns - 1 - i;
        const index = rowOffset + columnOffset;

        if (this.isEmpty(index)) {
          continue;
        }

        // Modify index if needed here, cache or memoize if possible for further performance
        const particle = this.grid[index];
        particle.update(this, params);
      }
    }
  }

  update() {
    // Update particles moving downwards and upwards in a single call
    this.updateWithParams({ direction: -1 });
    this.updateWithParams({ direction: 1 });
  }

  swap(a: number, b: number) {
    if (this.grid[a]?.isEmpty && this.grid[b]?.isEmpty) {
      return;
    }
    if (a >= 0 && a < this.grid.length && b >= 0 && b < this.grid.length) {
      const temp = this.grid[a];
      this.grid[a] = this.grid[b];
      this.grid[b] = temp;
      this.grid[a].index = a;
      this.grid[b].index = b;
    }
  }
}
