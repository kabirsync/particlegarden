import { MovesVertical } from "@/components/simulation/behaviours/MovesVertical";
import Particle from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";

export class MovesVerticalWater extends MovesVertical {
  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
  }: {
    maxSpeed?: number;
    acceleration?: number;
    initialVelocity?: number;
  }) {
    super({ maxSpeed, acceleration, initialVelocity });
  }

  canPassThrough(particle: Particle) {
    return particle?.stateOfMatter === "empty";
  }

  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical = i + nextDelta;
    const nextVerticalLeft = nextVertical - 1;
    const nextVerticalRight = nextVertical + 1;

    // Allow user to change this
    const spread = 4;

    const nextLeft = i - Math.ceil(Math.random() * spread);
    const nextRight = i + Math.ceil(Math.random() * spread);

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    if (column > 0 && this.canPassThrough(grid.grid[nextVerticalLeft])) {
      grid.swap(i, nextVerticalLeft);
      return nextVerticalLeft;
    }

    if (
      column < grid.columns - 1 &&
      this.canPassThrough(grid.grid[nextVerticalRight])
    ) {
      grid.swap(i, nextVerticalRight);
      return nextVerticalRight;
    }

    if (
      Math.random() >= 0.5 &&
      column > 0 + spread &&
      this.canPassThrough(grid.grid[nextLeft])
    ) {
      grid.swap(i, nextLeft);
      return nextLeft;
    }

    if (
      Math.random() < 0.5 &&
      column < grid.columns - 1 - spread &&
      this.canPassThrough(grid.grid[nextRight])
    ) {
      grid.swap(i, nextRight);
      return nextRight;
    }

    return i;
  }
}
