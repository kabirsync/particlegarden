import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";
import Void from "@/components/simulation/materials/Void";
import Empty from "@/components/simulation/materials/Empty";
import Cloner from "@/components/simulation/materials/Cloner";
import Sand from "@/components/simulation/materials/Sand";

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

  isVoid(particle: Particle) {
    return particle instanceof Void;
  }

  isCloner(particle: Particle) {
    return particle instanceof Cloner;
  }

  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const previousVertical = i - grid.columns;
    const nextVertical = i + nextDelta;
    const nextVerticalLeft = nextVertical - 1;
    const nextVerticalRight = nextVertical + 1;

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }
    if (this.isVoid(grid.grid[nextVertical])) {
      grid.setIndex(i, new Empty(i));
    }

    if (this.isCloner(grid.grid[nextVertical])) {
      grid.setIndex(
        previousVertical,
        new Sand(previousVertical, {
          maxSpeed: this.maxSpeed,
          initialVelocity: this.velocity,
          acceleration: this.acceleration,
        })
      );
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (column > 0 && this.canPassThrough(grid.grid[nextVerticalLeft])) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
    } else {
      if (this.isVoid(grid.grid[nextVerticalRight])) {
        grid.setIndex(i, new Empty(i));
      }
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
