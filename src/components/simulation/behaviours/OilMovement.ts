import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import { Fire } from "@/components/simulation/materials/Fire";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";

export type OilMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
};

export class OilMovement extends MovesVertical {
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
  }: OilMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
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
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  //   canExtinguish(particle: Particle): particle is Fire | StaticFire | Lava {
  //     return (
  //       particle instanceof Fire ||
  //       particle instanceof StaticFire ||
  //       particle instanceof Lava
  //     );
  //   }

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

    // need to randomise order of operations (check sand)

    if (this.canPassThrough(nextVerticalParticle)) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }
    // if (this.canExtinguish(nextVerticalParticle)) {
    //   if (Math.random() < 1) {
    //     const MaterialClass =
    //       MaterialMapping[nextVerticalParticle.extinguishMaterial];

    //     grid.setIndex(
    //       nextVertical,
    //       new MaterialClass(nextVertical, {
    //         smokeColor: nextVerticalParticle.smokeColor,
    //       })
    //     );
    //   }
    // }

    if (Math.random() < 0.5) {
      if (
        column > this.diagonalSpread - 1 &&
        this.canPassThrough(nextVerticalLeftParticle)
      ) {
        grid.swap(i, nextVerticalLeft);
        return nextVerticalLeft;
      }
      //   if (this.canExtinguish(nextVerticalLeftParticle)) {
      //     if (Math.random() < 1) {
      //       const MaterialClass =
      //         MaterialMapping[nextVerticalLeftParticle.extinguishMaterial];

      //       grid.setIndex(
      //         nextVerticalLeft,
      //         new MaterialClass(nextVerticalLeft, {
      //           smokeColor: nextVerticalLeftParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }
    } else {
      if (
        column < grid.columns - this.diagonalSpread &&
        this.canPassThrough(nextVerticalRightParticle)
      ) {
        grid.swap(i, nextVerticalRight);
        return nextVerticalRight;
      }
      //   if (this.canExtinguish(nextVerticalRightParticle)) {
      //     if (Math.random() < 1) {
      //       const MaterialClass =
      //         MaterialMapping[nextVerticalRightParticle.extinguishMaterial];

      //       grid.setIndex(
      //         nextVerticalRight,
      //         new MaterialClass(nextVerticalRight, {
      //           smokeColor: nextVerticalRightParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }
    }

    if (Math.random() < 0.5) {
      if (
        column > 0 + this.horizontalSpread - 1 &&
        this.canPassThrough(nextLeftParticle)
      ) {
        grid.swap(i, nextLeft);
        return nextLeft;
      }
      //   if (this.canExtinguish(nextLeftParticle)) {
      //     if (Math.random() < 1) {
      //       const MaterialClass =
      //         MaterialMapping[nextLeftParticle.extinguishMaterial];

      //       grid.setIndex(
      //         nextLeft,
      //         new MaterialClass(nextLeft, {
      //           smokeColor: nextLeftParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }
    } else {
      if (
        column < grid.columns - 2 - this.horizontalSpread &&
        this.canPassThrough(nextRightParticle)
      ) {
        grid.swap(i, nextRight);
        return nextRight;
      }
      //   if (this.canExtinguish(nextRightParticle)) {
      //     if (Math.random() < 1) {
      //       const MaterialClass =
      //         MaterialMapping[nextRightParticle.extinguishMaterial];

      //       grid.setIndex(
      //         nextRight,
      //         new MaterialClass(nextRight, {
      //           smokeColor: nextRightParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }
    }

    return i;
  }
}
