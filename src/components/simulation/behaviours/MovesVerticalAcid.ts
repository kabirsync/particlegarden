import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Particle from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";
import Empty from "@/components/simulation/materials/Empty";
import { Smoke } from "@/components/simulation/materials/Smoke";
import { Color } from "three";
import { smokeColor } from "@/lib/constants";

export type MovesVerticalAcidProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
};

export class MovesVerticalAcid extends MovesVertical {
  diagonalSpread: number;
  verticalSpread: number;
  horizontalSpread: number;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
    diagonalSpread = 1,
    verticalSpread = 1,
    horizontalSpread = 1,
  }: MovesVerticalAcidProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
  }

  canPassThrough(particle: Particle) {
    return (
      particle?.stateOfMatter === "empty" ||
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  canDissolve(particle: Particle) {
    const dissolvableParticles = ["Stone", "Wood"];
    return dissolvableParticles.includes(particle?.constructor.name);
  }

  moveParticle(particle: Particle, grid: Grid): number {
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
    if (this.canDissolve(grid.grid[nextVertical])) {
      console.log("dissolve");
      if (Math.random() < 0.5)
        grid.setIndex(particle.index, new Empty(particle.index));
      grid.setIndex(
        nextVertical,
        Math.random() < 0.2
          ? new Smoke(nextVertical, {
              color: new Color().lerpColors(particle.color, smokeColor, 0.95),
            })
          : new Empty(nextVertical)
      );
    }

    if (Math.random() < 0.5) {
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(grid.grid[nextVerticalLeft])
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
    } else {
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(grid.grid[nextVerticalRight])
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
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
    } else {
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(grid.grid[nextRight])
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
    }

    return i;
  }
}
