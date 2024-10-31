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

    for (let row = startRow; row !== endRow; row += rowStep) {
      const rowOffset = row * this.columns;
      const leftToRight = Math.random() > 0.5;
      for (let i = 0; i < this.columns; i++) {
        const columnOffset = leftToRight ? i : -i - 1 + this.columns;
        const index = rowOffset + columnOffset;

        if (this.isEmpty(index)) {
          continue;
        }
        // index = this.modifyIndexHook(index, params);
        const particle = this.grid[index];
        particle.update(this, params);
      }
    }
  }

  update() {
    // Update particles moving downwards
    this.updateWithParams({ direction: 1 });
    // Update particles moving upwards
    this.updateWithParams({ direction: -1 });
  }
}
