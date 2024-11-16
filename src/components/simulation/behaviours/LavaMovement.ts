import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Fire } from "@/components/simulation/materials/Fire";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import Sand from "@/components/simulation/materials/Sand";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Wood from "@/components/simulation/materials/Wood";
import { fireColors, lavaFuel, lavaSmokeColor } from "@/lib/constants";
import { Color } from "three";
import { Grid } from "../Grid";
import Stone from "@/components/simulation/materials/Stone";
import Oil from "@/components/simulation/materials/Oil";
import Gas from "@/components/simulation/materials/Gas";
import Empty from "@/components/simulation/materials/Empty";
import Void from "@/components/simulation/materials/Void";
import Cloner from "@/components/simulation/materials/Cloner";
import Lava from "@/components/simulation/materials/Lava";

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
    this.remainingLife = life;
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
      const smoke = new Stone(particle.index, {
        // burning: Math.random() < 0.1,
        // color: this.smokeColor,
      });
      grid.setIndex(particle.index, smoke);
      // if (Math.random() < 0.9) {
      //   const smoke = new Smoke(particle.index, {
      //     burning: Math.random() < 0.1,
      //     color: this.smokeColor,
      //   });
      //   grid.setIndex(particle.index, smoke);
      // } else {
      //   grid.setIndex(
      //     particle.index,
      //     new Fire(particle.index, {
      //       // maxSpeed: this.maxSpeed,
      //       // acceleration: this.acceleration,
      //       // initialVelocity: this.velocity,
      //       // diagonalSpread: this.diagonalSpread,
      //       // verticalSpread: this.verticalSpread,
      //       // horizontalSpread: this.horizontalSpread,
      //       smokeColor: this.smokeColor,
      //       // life: this.life,
      //     })
      //   );
      // }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    particle.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }

  canPassThrough(particle: Particle) {
    if (!particle) return false;
    return (
      particle?.stateOfMatter === "empty" ||
      particle?.stateOfMatter === "gas" ||
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  canSetFireTo(particle: Particle): particle is Wood | Oil | Gas {
    return (
      particle instanceof Wood ||
      particle instanceof Oil ||
      particle instanceof Gas
    );
  }

  canMelt(particle: Particle): particle is Sand | Wood {
    return particle instanceof Sand || particle instanceof Wood;
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

    const nextRightParticle = grid.grid[nextRight];
    const nextLeftParticle = grid.grid[nextLeft];
    const previousVertical = i - grid.columns;

    // need to randomise order of operations (check sand)

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
          new Lava(i, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextVertical)) {
        grid.setIndex(
          nextVertical,
          new Lava(nextVertical, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }

      if (Math.random() < 1 && grid.isEmpty(nextRight)) {
        grid.setIndex(
          nextRight,
          new Lava(nextRight, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextLeft)) {
        grid.setIndex(
          nextLeft,
          new Lava(nextLeft, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
    }

    if (this.isVoid(grid.grid[nextVertical])) {
      grid.setIndex(i, new Empty(i));
    }
    if (this.canPassThrough(nextVerticalParticle)) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }
    if (this.canSetFireTo(nextVerticalParticle)) {
      if (Math.random() < nextVerticalParticle.chanceToCatch) {
        grid.setIndex(
          nextVertical,
          new Fire(nextVertical, {
            smokeColor: nextVerticalParticle.smokeColor,
          })
        );
      }
    }
    if (this.canMelt(nextVerticalParticle)) {
      if (Math.random() < nextVerticalParticle.chanceToMelt) {
        grid.setIndex(
          nextVertical,
          new Smoke(nextVertical, {
            color: nextVerticalParticle.smokeColor,
          })
        );
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(nextVerticalLeftParticle)
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }

      if (this.canSetFireTo(nextVerticalLeftParticle)) {
        if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
          grid.setIndex(
            nextVerticalLeft,
            new Fire(nextVerticalLeft, {
              smokeColor: nextVerticalLeftParticle.smokeColor,
            })
          );
        }
      }

      if (this.canMelt(nextVerticalLeftParticle)) {
        if (Math.random() < nextVerticalLeftParticle.chanceToMelt) {
          grid.setIndex(
            nextVerticalLeft,
            new Smoke(nextVerticalLeft, {
              color: nextVerticalLeftParticle.smokeColor,
            })
          );
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextVerticalRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(nextVerticalRightParticle)
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }

      if (this.canSetFireTo(nextVerticalRightParticle)) {
        if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
          grid.setIndex(
            nextVerticalRight,
            new Fire(nextVerticalRight, {
              smokeColor: nextVerticalRightParticle.smokeColor,
            })
          );
        }
      }

      if (this.canMelt(nextVerticalRightParticle)) {
        if (Math.random() < nextVerticalRightParticle.chanceToMelt) {
          grid.setIndex(
            nextVerticalRight,
            new Smoke(nextVerticalRight, {
              color: nextVerticalRightParticle.smokeColor,
            })
          );
        }
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        column > 0 + this.horizontalSpread - 1 &&
        this.canPassThrough(nextLeftParticle)
      ) {
        grid.swap(i, nextLeft);
        return nextLeft;
      }

      if (this.canSetFireTo(nextLeftParticle)) {
        if (Math.random() < nextLeftParticle.chanceToCatch) {
          grid.setIndex(
            nextLeft,
            new Fire(nextLeft, {
              smokeColor: nextLeftParticle.smokeColor,
            })
          );
        }
      }

      if (this.canMelt(nextLeftParticle)) {
        if (Math.random() < nextLeftParticle.chanceToMelt) {
          grid.setIndex(
            nextLeft,
            new Smoke(nextLeft, {
              color: nextLeftParticle.smokeColor,
            })
          );
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(nextRightParticle)
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
      if (this.canSetFireTo(nextRightParticle)) {
        if (Math.random() < nextRightParticle.chanceToCatch) {
          grid.setIndex(
            nextRight,
            new Fire(nextRight, {
              smokeColor: nextRightParticle.smokeColor,
            })
          );
        }
      }

      if (this.canMelt(nextRightParticle)) {
        if (Math.random() < nextRightParticle.chanceToMelt) {
          grid.setIndex(
            nextRight,
            new Smoke(nextRight, {
              color: nextRightParticle.smokeColor,
            })
          );
        }
      }
    }

    return i;
  }
}
