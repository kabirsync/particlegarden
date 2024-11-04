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
    const totalCells = rows * columns;
    this.grid = new Array(totalCells);

    // Initialize the grid with Empty particles
    for (let i = 0; i < totalCells; i++) {
      this.grid[i] = new Empty(i);
    }
  }

  index(x: number, y: number): number {
    return y * this.columns + x;
  }

  setIndex(i: number, particle: Particle): void {
    this.grid[i] = particle;
    particle.index = i;
  }

  set(column: number, row: number, particle: Particle): number {
    if (column < 0 || column >= this.columns) return -1;
    if (row < 0 || row >= this.rows) return -1;
    const index = this.index(column, row);
    this.setIndex(index, particle);
    return index;
  }

  clear(): void {
    const totalCells = this.rows * this.columns;
    for (let i = 0; i < totalCells; i++) {
      this.grid[i] = new Empty(i);
    }
  }

  updateWithParams(params: Params): void {
    const direction = params.direction || 1;
    const startRow = direction > 0 ? this.rows - 1 : 0;
    const endRow = direction > 0 ? -1 : this.rows;
    const rowStep = direction > 0 ? -1 : 1;

    const leftToRight = Math.random() > 0.5; // Decide once per call
    const columns = this.columns; // Cache columns
    const grid = this.grid; // Cache grid reference

    for (let row = startRow; row !== endRow; row += rowStep) {
      const rowOffset = row * columns;

      if (leftToRight) {
        for (let col = 0; col < columns; col++) {
          const index = rowOffset + col;
          const particle = grid[index];

          if (particle.stateOfMatter === "empty") continue;

          particle.update(this, params);
        }
      } else {
        for (let col = columns - 1; col >= 0; col--) {
          const index = rowOffset + col;
          const particle = grid[index];

          if (particle.stateOfMatter === "empty") continue;

          particle.update(this, params);
        }
      }
    }
  }

  update(): void {
    // Update particles moving upwards and downwards
    this.updateWithParams({ direction: -1 });
    this.updateWithParams({ direction: 1 });
  }

  swap(a: number, b: number): void {
    if (
      a < 0 ||
      a >= this.grid.length ||
      b < 0 ||
      b >= this.grid.length ||
      (this.grid[a].stateOfMatter === "empty" &&
        this.grid[b].stateOfMatter === "empty")
    ) {
      return;
    }

    const temp = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp;

    this.grid[a].index = a;
    this.grid[b].index = b;
  }

  clearIndex(i: number) {
    this.setIndex(i, new Empty(i));
  }
}
