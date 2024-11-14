import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import {
  fireColors,
  fireLife,
  fireSmokeColor,
  smokeColor,
} from "@/lib/constants";
import { Color } from "three";
import { Grid } from "../Grid";
import { Smoke } from "@/components/simulation/materials/Smoke";
import { StaticFire } from "@/components/simulation/materials/StaticFire";
import Wood from "@/components/simulation/materials/Wood";
import { Fire } from "@/components/simulation/materials/Fire";

export type FireMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  life?: number;
  smokeColor?: Color;
};

export class FireMovement extends MovesVertical {
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
    life = fireLife,
    smokeColor = fireSmokeColor,
  }: FireMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
    this.life = life;
    this.smokeColor = smokeColor;
    this.remainingLife = life - life * Math.random();
  }

  update(particle: Particle, grid: Grid, params: Params) {
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
    if (this.remainingLife < 0) {
      if (Math.random() < 0.9) {
        const smoke = new Smoke(particle.index, {
          burning: Math.random() < 0.1,
          color: smokeColor,
        });
        grid.setIndex(particle.index, smoke);
      } else {
        grid.setIndex(
          particle.index,
          new Fire(particle.index, {
            maxSpeed: this.maxSpeed,
            acceleration: this.acceleration,
            initialVelocity: this.velocity,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            smokeColor: this.smokeColor,
            life: this.life,
          })
        );
      }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    particle.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }

  canPassThrough(particle: Particle) {
    if (!particle) return false;
    return (
      particle?.stateOfMatter === "empty" ||
      (particle?.stateOfMatter === "gas" && Math.random() < 0.1)
    );
  }

  //  canSetFireTo(particle: Particle): particle is Wood | Oil | Gas {
  //   return particle instanceof Wood || particle instanceof Oil || particle instanceof Gas;
  // }

  canSetFireTo(particle: Particle): particle is Wood {
    return particle instanceof Wood;
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

    // const neighbourTop = i - grid.columns;
    // const neighbourRight = i + 1;
    // const neighbourLeft = i - 1;
    // const neighbourBottom = i + grid.columns;

    // need to randomise order of operations (check sand)
    const previousVertical = i - 1;

    if (Math.random() < 0.8 && this.canSetFireTo(grid.grid[previousVertical])) {
      const FlammableParticle = grid.grid[previousVertical] as Wood;
      grid.setIndex(
        previousVertical,
        new StaticFire(previousVertical, {
          life: FlammableParticle.life,
        })
      );
    }
    if (Math.random() < 0.01 && this.canSetFireTo(grid.grid[nextVertical])) {
      const FlammableParticle = grid.grid[nextVertical] as Wood;
      grid.setIndex(
        nextVertical,
        new StaticFire(nextVertical, {
          life: FlammableParticle.life,
        })
      );
    }
    if (
      Math.random() < 0.01 &&
      this.canSetFireTo(grid.grid[nextVerticalLeft])
    ) {
      const FlammableParticle = grid.grid[nextVerticalLeft] as Wood;
      grid.setIndex(
        nextVerticalLeft,
        new StaticFire(nextVerticalLeft, {
          life: FlammableParticle.life,
        })
      );
    }
    if (
      Math.random() < 0.01 &&
      this.canSetFireTo(grid.grid[nextVerticalRight])
    ) {
      const FlammableParticle = grid.grid[nextVerticalRight] as Wood;
      grid.setIndex(
        nextVerticalRight,
        new StaticFire(nextVerticalRight, {
          life: FlammableParticle.life,
        })
      );
    }

    if (Math.random() < 0.01 && this.canSetFireTo(grid.grid[nextRight])) {
      const FlammableParticle = grid.grid[nextRight] as Wood;
      grid.setIndex(
        nextRight,
        new StaticFire(nextRight, {
          life: FlammableParticle.life,
        })
      );
    }

    if (Math.random() < 0.01 && this.canSetFireTo(grid.grid[nextLeft])) {
      const FlammableParticle = grid.grid[nextLeft] as Wood;
      grid.setIndex(
        nextLeft,
        new StaticFire(nextLeft, {
          life: FlammableParticle.life,
        })
      );
    }

    if (Math.random() < 0.9 && this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
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
