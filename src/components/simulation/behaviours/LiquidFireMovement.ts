import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Fire } from "@/components/simulation/materials/Fire";
import { MaterialMapping } from "@/components/simulation/materials/Material";
import Oil from "@/components/simulation/materials/Oil";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Wood from "@/components/simulation/materials/Wood";
import { fireColors, fireLife, fireSmokeColor } from "@/lib/constants";
import { Color } from "three";
import { Grid } from "../Grid";
import Empty from "@/components/simulation/materials/Empty";
import Void from "@/components/simulation/materials/Void";
import Cloner from "@/components/simulation/materials/Cloner";
import { LiquidFire } from "@/components/simulation/materials/LiquidFire";

export type LiquidFireMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  life?: number;
  smokeColor?: Color;
};

export class LiquidFireMovement extends MovesVertical {
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
  }: LiquidFireMovementProps) {
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
      if (Math.random() < 0.01) {
        grid.setIndex(
          particle.index,
          new Fire(particle.index, {
            smokeColor: this.smokeColor,
          })
        );
      } else {
        if (Math.random() < 0.3) {
          const smoke = new Smoke(particle.index, {
            color: this.smokeColor,
            cloneable: false,
          });
          grid.setIndex(particle.index, smoke);
        } else {
          grid.setIndex(particle.index, new Empty(particle.index));
        }
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

  canSetFireTo(particle: Particle): particle is Wood | Oil {
    return particle instanceof Wood || particle instanceof Oil;
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
    const row = Math.floor(i / grid.columns);
    const nextDelta = Math.sign(this.velocity) * grid.columns;

    // Only check vertical grid boundaries
    if (nextDelta < 0 && row === 0) {
      return i;
    }
    if (nextDelta > 0 && row === grid.rows - 1) {
      return i;
    }

    const nextVertical =
      i + nextDelta * Math.ceil(this.verticalSpread * Math.random());

    // Check if next vertical position would be outside grid bounds
    if (nextVertical < 0 || nextVertical >= grid.columns * grid.rows) {
      return i;
    }

    const nextVerticalLeft =
      nextVertical - Math.ceil(Math.random() * this.diagonalSpread);
    const nextVerticalRight =
      nextVertical + Math.ceil(Math.random() * this.diagonalSpread);

    // Only prevent horizontal wrapping
    const nextVerticalLeftColumn = nextVerticalLeft % grid.columns;
    const nextVerticalRightColumn = nextVerticalRight % grid.columns;

    if (
      Math.abs(nextVerticalLeftColumn - column) > this.diagonalSpread ||
      Math.abs(nextVerticalRightColumn - column) > this.diagonalSpread
    ) {
      return i;
    }

    const nextLeft = i - Math.ceil(Math.random() * this.horizontalSpread);
    const nextRight = i + Math.ceil(Math.random() * this.horizontalSpread);

    // Check horizontal boundaries for wrapping only
    const nextLeftColumn = nextLeft % grid.columns;
    const nextRightColumn = nextRight % grid.columns;

    if (
      Math.abs(nextLeftColumn - column) > this.horizontalSpread ||
      Math.abs(nextRightColumn - column) > this.horizontalSpread
    ) {
      return i;
    }

    // Rest of the existing movement logic
    const previousVertical = i - 1;
    const previousVerticalParticle = grid.grid[previousVertical];
    const nextVerticalParticle = grid.grid[nextVerticalRight];
    const nextVerticalLeftParticle = grid.grid[nextVerticalLeft];
    const nextVerticalRightParticle = grid.grid[nextVerticalRight];
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
          new LiquidFire(i, {
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
          new LiquidFire(nextVertical, {
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
          new LiquidFire(nextRight, {
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
          new LiquidFire(nextLeft, {
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

    if (this.canSetFireTo(previousVerticalParticle)) {
      if (Math.random() < previousVerticalParticle.chanceToCatch) {
        const MaterialClass =
          MaterialMapping[previousVerticalParticle.burningMaterial];

        grid.setIndex(
          previousVertical,
          new MaterialClass(previousVertical, {
            smokeColor: previousVerticalParticle.smokeColor,
            chanceToCatch: previousVerticalParticle.chanceToCatch,
            life: previousVerticalParticle.life,
          })
        );
      }
    }

    if (this.isVoid(grid.grid[nextVertical])) {
      grid.setIndex(i, new Empty(i));
    }

    if (this.canSetFireTo(nextVerticalParticle)) {
      if (Math.random() < nextVerticalParticle.chanceToCatch) {
        if (Math.random() < nextVerticalParticle.chanceToCatch) {
          const MaterialClass =
            MaterialMapping[nextVerticalParticle.burningMaterial];

          grid.setIndex(
            nextVertical,
            new MaterialClass(nextVertical, {
              smokeColor: nextVerticalParticle.smokeColor,
              chanceToCatch: nextVerticalParticle.chanceToCatch,
              life: nextVerticalParticle.life,
            })
          );
        }
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canSetFireTo(nextVerticalLeftParticle)) {
        if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
          if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextVerticalLeftParticle.burningMaterial];

            grid.setIndex(
              nextVerticalLeft,
              new MaterialClass(nextVerticalLeft, {
                smokeColor: nextVerticalLeftParticle.smokeColor,
                chanceToCatch: nextVerticalLeftParticle.chanceToCatch,
                life: nextVerticalLeftParticle.life,
              })
            );
          }
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextVerticalRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canSetFireTo(nextVerticalRightParticle)) {
        if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
          if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextVerticalRightParticle.burningMaterial];

            grid.setIndex(
              nextVerticalRight,
              new MaterialClass(nextVerticalRight, {
                smokeColor: nextVerticalRightParticle.smokeColor,
                chanceToCatch: nextVerticalRightParticle.chanceToCatch,
                life: nextVerticalRightParticle.life,
              })
            );
          }
        }
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canSetFireTo(nextRightParticle)) {
        if (Math.random() < nextRightParticle.chanceToCatch) {
          if (Math.random() < nextRightParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextRightParticle.burningMaterial];

            grid.setIndex(
              nextRight,
              new MaterialClass(nextRight, {
                smokeColor: nextRightParticle.smokeColor,
                chanceToCatch: nextRightParticle.chanceToCatch,
                life: nextRightParticle.life,
              })
            );
          }
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canSetFireTo(nextLeftParticle)) {
        if (Math.random() < nextLeftParticle.chanceToCatch) {
          if (Math.random() < nextLeftParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextLeftParticle.burningMaterial];

            grid.setIndex(
              nextLeft,
              new MaterialClass(nextLeft, {
                smokeColor: nextLeftParticle.smokeColor,
                chanceToCatch: nextLeftParticle.chanceToCatch,
                life: nextLeftParticle.life,
              })
            );
          }
        }
      }
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
