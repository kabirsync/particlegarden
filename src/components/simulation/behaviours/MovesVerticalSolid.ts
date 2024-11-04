import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Particle from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";

export class MovesVerticalSolid extends MovesVertical {
  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
  }: MovesVerticalProps) {
    super({ maxSpeed, acceleration, initialVelocity });
  }

  canPassThrough(particle: Particle) {
    return (
      particle?.stateOfMatter === "empty" ||
      (Math.random() < 0.5 ? particle?.stateOfMatter === "liquid" : false)
    );
  }

  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical = i + nextDelta;
    const nextVerticalLeft = nextVertical - 1;
    const nextVerticalRight = nextVertical + 1;

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    // Decide which direction to check first
    const firstCheck =
      Math.random() < 0.5 ? nextVerticalLeft : nextVerticalRight;
    const secondCheck =
      firstCheck === nextVerticalLeft ? nextVerticalRight : nextVerticalLeft;

    if (
      column > 0 &&
      column < grid.columns - 1 &&
      this.canPassThrough(grid.grid[firstCheck])
    ) {
      grid.swap(i, firstCheck);
      return firstCheck;
    } else if (
      column > 0 &&
      column < grid.columns - 1 &&
      this.canPassThrough(grid.grid[secondCheck])
    ) {
      grid.swap(i, secondCheck);
      return secondCheck;
    }

    return i;
  }
}
