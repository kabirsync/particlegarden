import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";

export class SandMovement extends MovesVertical {
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
      // TODO: pass in liquid viscocity?
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
