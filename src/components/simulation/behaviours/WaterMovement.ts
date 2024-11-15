import {
  MovesVertical,
  MovesVerticalProps,
} from "@/components/simulation/behaviours/MovesVertical";
import Empty from "@/components/simulation/materials/Empty";
import { Fire } from "@/components/simulation/materials/Fire";
import Particle, { Params } from "@/components/simulation/materials/Particle";
import { Grid } from "../Grid";
import { StaticFire } from "@/components/simulation/materials/StaticFire";
import Lava from "@/components/simulation/materials/Lava";
import { MaterialMapping } from "@/components/simulation/materials/Material";

export type WaterMovementProps = MovesVerticalProps & {
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;
  //   life?: number;
  //   smokeColor?: Color;
};

export class WaterMovement extends MovesVertical {
  diagonalSpread: number;
  verticalSpread: number;
  horizontalSpread: number;
  //   life: number;
  //   smokeColor: Color;
  //   remainingLife: number;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
    diagonalSpread = 1,
    verticalSpread = 1,
    horizontalSpread = 1,
  }: // life = lavaFuel,
  // smokeColor = lavaSmokeColor,
  WaterMovementProps) {
    super({ maxSpeed, acceleration, initialVelocity });
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
    // this.life = life;
    // this.smokeColor = smokeColor;
    // this.remainingLife = Math.random() * life;
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

    // if (this.remainingLife < 0) {
    //   if (Math.random() < 0.9) {
    //     const smoke = new Smoke(particle.index, {
    //       burning: Math.random() < 0.1,
    //       color: this.smokeColor,
    //     });
    //     grid.setIndex(particle.index, smoke);
    //   } else {
    //     grid.setIndex(
    //       particle.index,
    //       new Fire(particle.index, {
    //         // maxSpeed: this.maxSpeed,
    //         // acceleration: this.acceleration,
    //         // initialVelocity: this.velocity,
    //         // diagonalSpread: this.diagonalSpread,
    //         // verticalSpread: this.verticalSpread,
    //         // horizontalSpread: this.horizontalSpread,
    //         smokeColor: this.smokeColor,
    //         // life: this.life,
    //       })
    //     );
    //   }
    // }
    // this.remainingLife = Math.floor(this.remainingLife - 1);
  }

  canPassThrough(particle: Particle) {
    if (!particle) return false;
    return (
      particle?.stateOfMatter === "empty" ||
      // particle instanceof Fire ||
      (particle?.stateOfMatter === "gas" && !(particle instanceof Fire)) ||
      (particle?.stateOfMatter === "liquid" && Math.random() < 0.1)
    );
  }

  canExtinguish(particle: Particle): particle is Fire | StaticFire | Lava {
    return (
      particle instanceof Fire ||
      particle instanceof StaticFire ||
      particle instanceof Lava
    );
  }

  //   canMelt(particle: Particle): particle is Sand | Wood {
  //     return particle instanceof Sand || particle instanceof Wood;
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
    if (this.canExtinguish(nextVerticalParticle)) {
      // if (Math.random() < 1) {
      //   grid.setIndex(nextVertical, new Empty(nextVertical));
      // }
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
    // if (this.canMelt(nextVerticalParticle)) {
    //   if (Math.random() < nextVerticalParticle.chanceToMelt) {
    //     grid.setIndex(
    //       nextVertical,
    //       new Smoke(nextVertical, {
    //         color: nextVerticalParticle.smokeColor,
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
      if (this.canExtinguish(nextVerticalLeftParticle)) {
        // if (Math.random() < 1) {
        //   grid.setIndex(nextVerticalLeft, new Empty(nextVerticalLeft));
        // }
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

      //   if (this.canSetFireTo(nextVerticalLeftParticle)) {
      //     if (Math.random() < nextVerticalLeftParticle.chanceToCatch) {
      //       grid.setIndex(
      //         nextVerticalLeft,
      //         new Fire(nextVerticalLeft, {
      //           smokeColor: nextVerticalLeftParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }

      //   if (this.canMelt(nextVerticalLeftParticle)) {
      //     if (Math.random() < nextVerticalLeftParticle.chanceToMelt) {
      //       grid.setIndex(
      //         nextVerticalLeft,
      //         new Smoke(nextVerticalLeft, {
      //           color: nextVerticalLeftParticle.smokeColor,
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
      //   if (this.canSetFireTo(nextVerticalRightParticle)) {
      //     if (Math.random() < nextVerticalRightParticle.chanceToCatch) {
      //       grid.setIndex(
      //         nextVerticalRight,
      //         new Fire(nextVerticalRight, {
      //           smokeColor: nextVerticalRightParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }

      //   if (this.canMelt(nextVerticalRightParticle)) {
      //     if (Math.random() < nextVerticalRightParticle.chanceToMelt) {
      //       grid.setIndex(
      //         nextVerticalRight,
      //         new Smoke(nextVerticalRight, {
      //           color: nextVerticalRightParticle.smokeColor,
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

      //   if (this.canSetFireTo(nextLeftParticle)) {
      //     if (Math.random() < nextLeftParticle.chanceToCatch) {
      //       grid.setIndex(
      //         nextLeft,
      //         new Fire(nextLeft, {
      //           smokeColor: nextLeftParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }

      //   if (this.canMelt(nextLeftParticle)) {
      //     if (Math.random() < nextLeftParticle.chanceToMelt) {
      //       grid.setIndex(
      //         nextLeft,
      //         new Smoke(nextLeft, {
      //           color: nextLeftParticle.smokeColor,
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
      //   if (this.canSetFireTo(nextRightParticle)) {
      //     if (Math.random() < nextRightParticle.chanceToCatch) {
      //       grid.setIndex(
      //         nextRight,
      //         new Fire(nextRight, {
      //           smokeColor: nextRightParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }

      //   if (this.canMelt(nextRightParticle)) {
      //     if (Math.random() < nextRightParticle.chanceToMelt) {
      //       grid.setIndex(
      //         nextRight,
      //         new Smoke(nextRight, {
      //           color: nextRightParticle.smokeColor,
      //         })
      //       );
      //     }
      //   }
    }

    return i;
  }
}
