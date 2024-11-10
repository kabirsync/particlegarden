import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Particle from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";
import Empty from "@/components/simulation/materials/Empty";
import { Smoke } from "@/components/simulation/materials/Smoke";
import { Color } from "three";
import {
  acidAcceleration,
  acidDiagonalSpread,
  acidHorizontalSpread,
  acidInitialVelocity,
  acidMaxSpeed,
  acidVerticalSpread,
  smokeColor,
} from "@/lib/constants";
import Stone from "@/components/simulation/materials/Stone";
import Wood from "@/components/simulation/materials/Wood";

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
    maxSpeed = acidMaxSpeed,
    acceleration = acidAcceleration,
    initialVelocity = acidInitialVelocity,
    diagonalSpread = acidDiagonalSpread,
    verticalSpread = acidVerticalSpread,
    horizontalSpread = acidHorizontalSpread,
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
    return particle instanceof Stone || particle instanceof Wood;
  }

  dissolveParticle(particle: Particle, nextParticleIndex: number, grid: Grid) {
    if (Math.random() < 0.5)
      grid.setIndex(particle.index, new Empty(particle.index));
    grid.setIndex(
      nextParticleIndex,
      Math.random() < 0.2
        ? new Smoke(nextParticleIndex, {
            color: new Color().lerpColors(particle.color, smokeColor, 0.95),
          })
        : new Empty(nextParticleIndex)
    );
  }

  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical =
      i + nextDelta * Math.ceil(this.verticalSpread * Math.random());
    const nextVerticalLeft =
      nextVertical - Math.ceil(Math.random() * this.diagonalSpread);
    const nextVerticalRight =
      nextVertical + Math.ceil(Math.random() * this.diagonalSpread);

    const nextLeft = i - Math.ceil(Math.random() * this.horizontalSpread);
    const nextRight = i + Math.ceil(Math.random() * this.horizontalSpread);

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    if (this.canDissolve(grid.grid[nextVertical])) {
      this.dissolveParticle(particle, nextVertical, grid);
    }

    if (Math.random() < 0.5) {
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(grid.grid[nextVerticalLeft])
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
      if (this.canDissolve(grid.grid[nextVerticalLeft])) {
        this.dissolveParticle(particle, nextVerticalLeft, grid);
      }
    } else {
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(grid.grid[nextVerticalRight])
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }
      if (this.canDissolve(grid.grid[nextVerticalRight])) {
        this.dissolveParticle(particle, nextVerticalRight, grid);
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
      if (this.canDissolve(grid.grid[nextLeft])) {
        this.dissolveParticle(particle, nextLeft, grid);
      }
    } else {
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(grid.grid[nextRight])
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
      if (this.canDissolve(grid.grid[nextRight])) {
        this.dissolveParticle(particle, nextRight, grid);
      }
    }

    return i;
  }
}
