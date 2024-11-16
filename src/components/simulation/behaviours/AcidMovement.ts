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
  acidColor,
  acidDefaultStrength,
  acidDiagonalSpread,
  acidHorizontalSpread,
  acidInitialVelocity,
  acidMaxSpeed,
  acidVerticalSpread,
  smokeColor,
} from "@/lib/constants";
import Stone from "@/components/simulation/materials/Stone";
import Wood from "@/components/simulation/materials/Wood";
import Sand from "@/components/simulation/materials/Sand";
import Void from "@/components/simulation/materials/Void";
import Cloner from "@/components/simulation/materials/Cloner";
import { Acid } from "@/components/simulation/materials/Acid";

export type AcidMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  acidStrength?: number;
  color?: Color;
};

export class AcidMovement extends MovesVertical {
  diagonalSpread: number;
  verticalSpread: number;
  horizontalSpread: number;
  acidStrength: number;
  color: Color;

  constructor({
    color = acidColor,
    maxSpeed = acidMaxSpeed,
    acceleration = acidAcceleration,
    initialVelocity = acidInitialVelocity,
    diagonalSpread = acidDiagonalSpread,
    verticalSpread = acidVerticalSpread,
    horizontalSpread = acidHorizontalSpread,
    acidStrength = acidDefaultStrength,
  }: AcidMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
    this.acidStrength = acidStrength;
    this.color = color;
  }

  canPassThrough(particle: Particle) {
    return (
      particle?.stateOfMatter === "empty" ||
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  canDissolve(particle: Particle) {
    return (
      particle instanceof Stone ||
      particle instanceof Wood ||
      particle instanceof Sand
    );
  }

  dissolveParticle(particle: Particle, nextParticleIndex: number, grid: Grid) {
    if (Math.random() < this.acidStrength) {
      grid.setIndex(
        nextParticleIndex,
        Math.random() < 0.2
          ? new Smoke(nextParticleIndex, {
              color: new Color().lerpColors(particle.color, smokeColor, 0.95),
            })
          : new Empty(nextParticleIndex)
      );
    }
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
    const nextVertical =
      i + nextDelta * Math.ceil(this.verticalSpread * Math.random());
    const nextVerticalLeft =
      nextVertical - Math.ceil(Math.random() * this.diagonalSpread);
    const nextVerticalRight =
      nextVertical + Math.ceil(Math.random() * this.diagonalSpread);

    const nextLeft = i - Math.ceil(Math.random() * this.horizontalSpread);
    const nextRight = i + Math.ceil(Math.random() * this.horizontalSpread);
    const nextVerticalParticle = grid.grid[nextVertical];
    const nextVerticalLeftParticle = grid.grid[nextVerticalLeft];
    const nextVerticalRightParticle = grid.grid[nextVerticalRight];
    const previousVertical = i - grid.columns;

    const nextRightParticle = grid.grid[nextRight];
    const nextLeftParticle = grid.grid[nextLeft];

    if (
      this.isCloner(nextVerticalParticle) ||
      this.isCloner(nextVerticalLeftParticle) ||
      this.isCloner(nextVerticalRightParticle) ||
      this.isCloner(nextLeftParticle) ||
      this.isCloner(nextRightParticle)
    ) {
      if (Math.random() < 1 && grid.isEmpty(previousVertical)) {
        grid.setIndex(
          i,
          new Acid(i, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
            acidStrength: this.acidStrength,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextVertical)) {
        grid.setIndex(
          nextVertical,
          new Acid(nextVertical, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
            acidStrength: this.acidStrength,
          })
        );
      }

      if (Math.random() < 1 && grid.isEmpty(nextRight)) {
        grid.setIndex(
          nextRight,
          new Acid(nextRight, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
            acidStrength: this.acidStrength,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextLeft)) {
        grid.setIndex(
          nextLeft,
          new Acid(nextLeft, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
            acidStrength: this.acidStrength,
          })
        );
      }
    }

    if (this.isVoid(grid.grid[nextVertical])) {
      grid.setIndex(i, new Empty(i));
    }

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    if (this.canDissolve(grid.grid[nextVertical])) {
      this.dissolveParticle(particle, nextVertical, grid);
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeft])) {
        grid.setIndex(i, new Empty(i));
      }
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
      if (this.isVoid(grid.grid[nextVerticalRight])) {
        grid.setIndex(i, new Empty(i));
      }
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
      if (this.isVoid(grid.grid[nextLeft])) {
        grid.setIndex(i, new Empty(i));
      }
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
      if (this.isVoid(grid.grid[nextRight])) {
        grid.setIndex(i, new Empty(i));
      }
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
