import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
//   import Particle from "@/components/simulation/materials/Particle";
import Lava from "@/components/simulation/materials/Lava";
import Particle2, { Params } from "@/components/simulation/materials/Particle2";
import Sand from "@/components/simulation/materials/Sand";
import { fireColors, lavaFuel, lavaSmokeColor } from "@/lib/constants";
import { Color } from "three";
import { Grid } from "../Grid";
import Empty from "@/components/simulation/materials/Empty";

export type LavaMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  life?: number;
  smokeColor?: Color;
};

export class LavaMovement extends MovesVertical {
  diagonalSpread: number;
  verticalSpread: number;
  horizontalSpread: number;
  life: number;
  smokeColor: Color;
  remainingLife: number;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
    diagonalSpread = 1,
    verticalSpread = 1,
    horizontalSpread = 1,
    life = lavaFuel,
    smokeColor = lavaSmokeColor,
  }: LavaMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
    this.life = life;
    this.smokeColor = smokeColor;
    this.remainingLife = Math.random() * life;
  }

  update(particle: Particle2, grid: Grid, params: Params) {
    if (!this.shouldUpdate(params)) return;

    if (this.maxSpeed === 0) {
      particle.modified = false;
      return;
    }

    this.updateVelocity();
    particle.modified = this.velocity !== 0;

    if (particle.modified) {
      this.applyMovement(particle, grid);
    }
    if (this.remainingLife === 0) {
      grid.setIndex(particle.index, new Empty(particle.index));
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    particle.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }

  canPassThrough(particle: Particle2) {
    if (!particle) return false;
    return (
      particle?.stateOfMatter === "empty" ||
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  canSetFireTo(particle: Particle2) {
    return particle instanceof Sand;
  }
  moveParticle(particle: Particle2, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    // const row = i % grid.rows;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical =
      i + nextDelta * Math.ceil(this.verticalSpread * Math.random());
    const nextVerticalLeft =
      nextVertical - Math.ceil(Math.random() * this.diagonalSpread);
    const nextVerticalRight =
      nextVertical + Math.ceil(Math.random() * this.diagonalSpread);

    const nextLeft = i - Math.ceil(Math.random() * this.horizontalSpread);
    const nextRight = i + Math.ceil(Math.random() * this.horizontalSpread);

    // need to randomise order of operations (check sand)

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }
    if (Math.random() < 0.1 && this.canSetFireTo(grid.grid[nextVertical])) {
      grid.setIndex(nextVertical, new Lava(nextVertical, {}));
    }

    if (Math.random() < 0.5) {
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(grid.grid[nextVerticalLeft])
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
      if (
        Math.random() < 0.1 &&
        this.canSetFireTo(grid.grid[nextVerticalLeft])
      ) {
        grid.setIndex(nextVertical, new Lava(nextVerticalLeft, {}));
      }
    } else {
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(grid.grid[nextVerticalRight])
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }
      if (
        Math.random() < 0.1 &&
        this.canSetFireTo(grid.grid[nextVerticalRight])
      ) {
        grid.setIndex(nextVertical, new Lava(nextVerticalRight, {}));
      }
    }

    if (Math.random() < 0.5) {
      if (
        column > 0 + this.horizontalSpread - 1 &&
        this.canPassThrough(grid.grid[nextLeft])
      ) {
        grid.swap(i, nextLeft);
        return nextLeft;
      }
      if (Math.random() < 0.1 && this.canSetFireTo(grid.grid[nextLeft])) {
        grid.setIndex(nextVertical, new Lava(nextLeft, {}));
      }
    } else {
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(grid.grid[nextRight])
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
      if (Math.random() < 0.1 && this.canSetFireTo(grid.grid[nextRight])) {
        grid.setIndex(nextVertical, new Lava(nextRight, {}));
      }
    }

    return i;
  }
}
