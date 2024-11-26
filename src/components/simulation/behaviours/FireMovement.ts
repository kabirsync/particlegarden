import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Empty from "@/components/simulation/materials/Empty";
import { MaterialMapping } from "@/components/simulation/materials/Material";
import Oil from "@/components/simulation/materials/Oil";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Wood from "@/components/simulation/materials/Wood";
import { fireColors, fireLife, fireSmokeColor } from "@/lib/constants";
import { Color } from "three";
import { Grid } from "../Grid";
import Gas from "@/components/simulation/materials/Gas";
import Void from "@/components/simulation/materials/Void";
import Cloner from "@/components/simulation/materials/Cloner";
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
      if (Math.random() < 0.5) {
        const smoke = new Smoke(particle.index, {
          color: this.smokeColor,
          cloneable: false,
        });
        grid.setIndex(particle.index, smoke);
      } else {
        grid.setIndex(particle.index, new Empty(particle.index));
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

  canSetFireTo(particle: Particle): particle is Wood | Oil | Gas {
    return (
      particle instanceof Wood ||
      particle instanceof Oil ||
      particle instanceof Gas
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
    const row = Math.floor(i / grid.columns);
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVerticalIndex =
      i + nextDelta * Math.ceil(this.verticalSpread * Math.random());

    const nextVerticalLeftIndex =
      nextVerticalIndex - Math.ceil(Math.random() * this.diagonalSpread);
    const nextVerticalRightIndex =
      nextVerticalIndex + Math.ceil(Math.random() * this.diagonalSpread);

    const nextVerticalLeftRow = Math.floor(
      nextVerticalLeftIndex / grid.columns
    );
    const nextVerticalRightRow = Math.floor(
      nextVerticalRightIndex / grid.columns
    );
    const nextLeftIndex = i - Math.ceil(Math.random() * this.horizontalSpread);
    const nextRightIndex = i + Math.ceil(Math.random() * this.horizontalSpread);
    const nextLeftRow = Math.floor(nextLeftIndex / grid.columns);
    const nextRightRow = Math.floor(nextRightIndex / grid.columns);

    const previousVerticalIndex = i - nextDelta;
    const previousVerticalParticle = grid.grid[previousVerticalIndex];

    const nextVerticalParticle = grid.grid[nextVerticalRightIndex];
    const nextVerticalLeftParticle = grid.grid[nextVerticalLeftIndex];
    const nextVerticalRightParticle = grid.grid[nextVerticalRightIndex];

    const nextRightParticle = grid.grid[nextRightIndex];
    const nextLeftParticle = grid.grid[nextLeftIndex];

    if (
      this.isCloner(nextVerticalParticle) ||
      this.isCloner(nextVerticalLeftParticle) ||
      this.isCloner(nextVerticalRightParticle) ||
      this.isCloner(nextLeftParticle) ||
      this.isCloner(nextRightParticle) ||
      this.isCloner(previousVerticalParticle)
    ) {
      if (grid.isEmpty(previousVerticalIndex)) {
        grid.setIndex(
          previousVerticalIndex,
          new Fire(previousVerticalIndex, {
            life: this.life,
            maxSpeed: this.maxSpeed,
            initialVelocity: this.velocity,
            acceleration: this.acceleration,
          })
        );
      }
      if (grid.isEmpty(nextVerticalLeftIndex)) {
        grid.setIndex(
          nextVerticalLeftIndex,
          new Fire(nextVerticalLeftIndex, {
            life: this.life,
            maxSpeed: this.maxSpeed,
            initialVelocity: this.velocity,
            acceleration: this.acceleration,
          })
        );
      }
      if (grid.isEmpty(nextVerticalRightIndex)) {
        grid.setIndex(
          nextVerticalRightIndex,
          new Fire(nextVerticalRightIndex, {
            life: this.life,
            maxSpeed: this.maxSpeed,
            initialVelocity: this.velocity,
            acceleration: this.acceleration,
          })
        );
      }
    }

    if (this.canSetFireTo(previousVerticalParticle)) {
      if (Math.random() < previousVerticalParticle.chanceToCatch) {
        const MaterialClass =
          MaterialMapping[previousVerticalParticle.burningMaterial];

        grid.setIndex(
          previousVerticalIndex,
          new MaterialClass(previousVerticalIndex, {
            smokeColor: previousVerticalParticle.smokeColor,
            chanceToCatch: previousVerticalParticle.chanceToCatch,
            life: previousVerticalParticle.life,
          })
        );
      }
    }

    if (this.isVoid(grid.grid[nextVerticalIndex])) {
      grid.setIndex(i, new Empty(i));
    }

    if (this.canSetFireTo(nextVerticalParticle)) {
      if (Math.random() < nextVerticalParticle.chanceToCatch) {
        if (Math.random() < nextVerticalParticle.chanceToCatch) {
          const MaterialClass =
            MaterialMapping[nextVerticalParticle.burningMaterial];

          grid.setIndex(
            nextVerticalIndex,
            new MaterialClass(nextVerticalIndex, {
              smokeColor: nextVerticalParticle.smokeColor,
              chanceToCatch: nextVerticalParticle.chanceToCatch,
              life: nextVerticalParticle.life,
            })
          );
        }
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeftIndex])) {
        grid.setIndex(i, new Empty(i));
      }

      if (
        this.canSetFireTo(nextVerticalLeftParticle) &&
        nextVerticalLeftIndex < i &&
        nextVerticalLeftRow === row
      ) {
        if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
          if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextVerticalLeftParticle.burningMaterial];

            grid.setIndex(
              nextVerticalLeftIndex,
              new MaterialClass(nextVerticalLeftIndex, {
                smokeColor: nextVerticalLeftParticle.smokeColor,
                chanceToCatch: nextVerticalLeftParticle.chanceToCatch,
                life: nextVerticalLeftParticle.life,
              })
            );
          }
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextVerticalRightIndex])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        this.canSetFireTo(nextVerticalRightParticle) &&
        nextVerticalRightIndex > i &&
        nextVerticalRightRow === row
      ) {
        if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
          if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextVerticalRightParticle.burningMaterial];

            grid.setIndex(
              nextVerticalRightIndex,
              new MaterialClass(nextVerticalRightIndex, {
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
      if (this.isVoid(grid.grid[nextRightIndex])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        this.canSetFireTo(nextRightParticle) &&
        nextRightIndex > i &&
        nextRightRow === row
      ) {
        if (Math.random() < nextRightParticle.chanceToCatch) {
          if (Math.random() < nextRightParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextRightParticle.burningMaterial];

            grid.setIndex(
              nextRightIndex,
              new MaterialClass(nextRightIndex, {
                smokeColor: nextRightParticle.smokeColor,
                chanceToCatch: nextRightParticle.chanceToCatch,
                life: nextRightParticle.life,
              })
            );
          }
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextLeftIndex])) {
        grid.setIndex(i, new Empty(i));
      }
      if (
        this.canSetFireTo(nextLeftParticle) &&
        nextLeftIndex < i &&
        nextLeftRow === row
      ) {
        if (Math.random() < nextLeftParticle.chanceToCatch) {
          if (Math.random() < nextLeftParticle.chanceToCatch) {
            const MaterialClass =
              MaterialMapping[nextLeftParticle.burningMaterial];

            grid.setIndex(
              nextLeftIndex,
              new MaterialClass(nextLeftIndex, {
                smokeColor: nextLeftParticle.smokeColor,
                chanceToCatch: nextLeftParticle.chanceToCatch,
                life: nextLeftParticle.life,
              })
            );
          }
        }
      }
    }

    if (
      Math.random() < 0.9 &&
      this.canPassThrough(grid.grid[nextVerticalIndex])
    ) {
      grid.swap(i, nextVerticalIndex);
      return nextVerticalIndex;
    }

    if (Math.random() < 0.5) {
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(grid.grid[nextVerticalLeftIndex])
      ) {
        grid.swap(i, nextVerticalLeftIndex);
        return nextVerticalLeftIndex;
      }
    } else {
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(grid.grid[nextVerticalRightIndex])
      ) {
        grid.swap(i, nextVerticalRightIndex);
        return nextVerticalRightIndex;
      }
    }

    if (Math.random() < 0.5) {
      if (
        column > 0 + this.horizontalSpread - 1 &&
        this.canPassThrough(grid.grid[nextLeftIndex])
      ) {
        grid.swap(i, nextLeftIndex);
        return nextLeftIndex;
      }
    } else {
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(grid.grid[nextRightIndex])
      ) {
        grid.swap(i, nextRightIndex);
        return nextRightIndex;
      }
    }

    return i;
  }
}
