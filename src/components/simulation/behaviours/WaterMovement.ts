import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Fire } from "@/components/simulation/materials/Fire";
import Lava from "@/components/simulation/materials/Lava";
import { MaterialMapping } from "@/components/simulation/materials/Material";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import { StaticFire } from "@/components/simulation/materials/StaticFire";
import { Grid } from "../Grid";
import Void from "@/components/simulation/materials/Void";
import Empty from "@/components/simulation/materials/Empty";
import Cloner from "@/components/simulation/materials/Cloner";
import Water from "@/components/simulation/materials/Water";
import { Color } from "three";
import { waterColor } from "@/lib/constants";
import { Acid } from "@/components/simulation/materials/Acid";
import Oil from "@/components/simulation/materials/Oil";

export type WaterMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  color: Color;
};

export class WaterMovement extends MovesVertical {
  diagonalSpread: number;
  verticalSpread: number;
  horizontalSpread: number;
  color: Color;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
    diagonalSpread = 1,
    verticalSpread = 1,
    horizontalSpread = 1,
    color = waterColor,
  }: WaterMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
    this.color = color;
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
  }

  canPassThrough(particle: Particle) {
    if (!particle) return false;
    return (
      particle?.stateOfMatter === "empty" ||
      (particle?.stateOfMatter === "gas" && !(particle instanceof Fire)) ||
      (particle?.stateOfMatter === "liquid" &&
        !(particle instanceof Oil) &&
        Math.random() < 0.1)
    );
  }

  canExtinguish(particle: Particle): particle is Fire | StaticFire | Lava {
    return (
      particle instanceof Fire ||
      particle instanceof StaticFire ||
      particle instanceof Lava
    );
  }

  isVoid(particle: Particle) {
    return particle instanceof Void;
  }

  isCloner(particle: Particle) {
    return particle instanceof Cloner;
  }

  canNeutralize(particle: Particle) {
    return particle instanceof Acid;
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
    const previousVertical = i - grid.columns;

    const nextVerticalParticle = grid.grid[nextVertical];
    const nextVerticalLeftParticle = grid.grid[nextVerticalLeft];
    const nextVerticalRightParticle = grid.grid[nextVerticalRight];

    const nextRightParticle = grid.grid[nextRight];
    const nextLeftParticle = grid.grid[nextLeft];

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
          new Water(i, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextVertical)) {
        grid.setIndex(
          nextVertical,
          new Water(nextVertical, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
          })
        );
      }

      if (Math.random() < 1 && grid.isEmpty(nextRight)) {
        grid.setIndex(
          nextRight,
          new Water(nextRight, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
          })
        );
      }
      if (Math.random() < 1 && grid.isEmpty(nextLeft)) {
        grid.setIndex(
          nextLeft,
          new Water(nextLeft, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
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
    if (this.canExtinguish(nextVerticalParticle)) {
      if (Math.random() < 1) {
        const MaterialClass =
          MaterialMapping[nextVerticalParticle.extinguishMaterial];

        grid.setIndex(
          nextVertical,
          new MaterialClass(nextVertical, {
            smokeColor: nextVerticalParticle.smokeColor,
          })
        );
      }
    }

    if (this.canNeutralize(nextVerticalParticle)) {
      if (Math.random() < 0.01) {
        grid.setIndex(
          nextVertical,
          new Water(nextVertical, {
            maxSpeed: this.maxSpeed,
            initialVelocity: this.initialVelocity,
            acceleration: this.acceleration,
            diagonalSpread: this.diagonalSpread,
            verticalSpread: this.verticalSpread,
            horizontalSpread: this.horizontalSpread,
            // life: this.life,
            color: this.color,
          })
        );
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextVerticalLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canNeutralize(nextVerticalLeftParticle)) {
        if (Math.random() < 0.01) {
          grid.setIndex(
            nextVerticalLeft,
            new Water(nextVerticalLeft, {
              maxSpeed: this.maxSpeed,
              initialVelocity: this.initialVelocity,
              acceleration: this.acceleration,
              diagonalSpread: this.diagonalSpread,
              verticalSpread: this.verticalSpread,
              horizontalSpread: this.horizontalSpread,
              // life: this.life,
              color: this.color,
            })
          );
        }
      }
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(nextVerticalLeftParticle)
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
      if (this.canExtinguish(nextVerticalLeftParticle)) {
        if (Math.random() < 1) {
          const MaterialClass =
            MaterialMapping[nextVerticalLeftParticle.extinguishMaterial];

          grid.setIndex(
            nextVerticalLeft,
            new MaterialClass(nextVerticalLeft, {
              smokeColor: nextVerticalLeftParticle.smokeColor,
            })
          );
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextVerticalRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canNeutralize(nextVerticalRightParticle)) {
        if (Math.random() < 0.01) {
          grid.setIndex(
            nextVerticalRight,
            new Water(nextVerticalRight, {
              maxSpeed: this.maxSpeed,
              initialVelocity: this.initialVelocity,
              acceleration: this.acceleration,
              diagonalSpread: this.diagonalSpread,
              verticalSpread: this.verticalSpread,
              horizontalSpread: this.horizontalSpread,
              // life: this.life,
              color: this.color,
            })
          );
        }
      }
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(nextVerticalRightParticle)
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }
      if (this.canExtinguish(nextVerticalRightParticle)) {
        if (Math.random() < 1) {
          const MaterialClass =
            MaterialMapping[nextVerticalRightParticle.extinguishMaterial];

          grid.setIndex(
            nextVerticalRight,
            new MaterialClass(nextVerticalRight, {
              smokeColor: nextVerticalRightParticle.smokeColor,
            })
          );
        }
      }
    }

    if (Math.random() < 0.5) {
      if (this.isVoid(grid.grid[nextLeft])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canNeutralize(nextLeftParticle)) {
        if (Math.random() < 0.01) {
          grid.setIndex(
            nextLeft,
            new Water(nextLeft, {
              maxSpeed: this.maxSpeed,
              initialVelocity: this.initialVelocity,
              acceleration: this.acceleration,
              diagonalSpread: this.diagonalSpread,
              verticalSpread: this.verticalSpread,
              horizontalSpread: this.horizontalSpread,
              // life: this.life,
              color: this.color,
            })
          );
        }
      }
      if (
        column > 0 + this.horizontalSpread - 1 &&
        this.canPassThrough(nextLeftParticle)
      ) {
        grid.swap(i, nextLeft);
        return nextLeft;
      }
      if (this.canExtinguish(nextLeftParticle)) {
        if (Math.random() < 1) {
          const MaterialClass =
            MaterialMapping[nextLeftParticle.extinguishMaterial];

          grid.setIndex(
            nextLeft,
            new MaterialClass(nextLeft, {
              smokeColor: nextLeftParticle.smokeColor,
            })
          );
        }
      }
    } else {
      if (this.isVoid(grid.grid[nextRight])) {
        grid.setIndex(i, new Empty(i));
      }
      if (this.canNeutralize(nextRightParticle)) {
        if (Math.random() < 0.01) {
          grid.setIndex(
            nextRight,
            new Water(nextRight, {
              maxSpeed: this.maxSpeed,
              initialVelocity: this.initialVelocity,
              acceleration: this.acceleration,
              diagonalSpread: this.diagonalSpread,
              verticalSpread: this.verticalSpread,
              horizontalSpread: this.horizontalSpread,
              // life: this.life,
              color: this.color,
            })
          );
        }
      }
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(nextRightParticle)
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
      if (this.canExtinguish(nextRightParticle)) {
        if (Math.random() < 1) {
          const MaterialClass =
            MaterialMapping[nextRightParticle.extinguishMaterial];

          grid.setIndex(
            nextRight,
            new MaterialClass(nextRight, {
              smokeColor: nextRightParticle.smokeColor,
            })
          );
        }
      }
    }

    return i;
  }
}
