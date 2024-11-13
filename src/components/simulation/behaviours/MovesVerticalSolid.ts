import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Particle2 from "@/components/simulation/materials/Particle2";
import { Grid } from "../Grid";

export class MovesVerticalSolid extends MovesVertical {
  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
  }: MovesVerticalProps) {
    super({ maxSpeed, acceleration, initialVelocity });
  }

  canPassThrough(particle: Particle2) {
    return (
      particle?.stateOfMatter === "empty" ||
      (Math.random() < 0.5 ? particle?.stateOfMatter === "liquid" : false)
    );
  }

  moveParticle(particle: Particle2, grid: Grid): number {
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

    if (Math.random() < 0.5) {
      if (column > 0 && this.canPassThrough(grid.grid[nextVerticalLeft])) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
    } else {
      if (
        column < grid.columns - 1 &&
        this.canPassThrough(grid.grid[nextVerticalRight])
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }
    }

    return i;
  }
}
