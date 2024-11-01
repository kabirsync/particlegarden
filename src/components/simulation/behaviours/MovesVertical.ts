import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "../Grid";
import Particle, { Params } from "@/components/simulation/materials/Particle";

export class MovesVertical extends Behaviour {
  maxSpeed: number;
  acceleration: number;
  velocity: number;

  constructor({
    maxSpeed,
    acceleration,
    velocity,
  }: {
    maxSpeed?: number;
    acceleration?: number;
    velocity?: number;
  }) {
    super();
    this.maxSpeed = maxSpeed ?? 0;
    this.acceleration = acceleration ?? 0;
    this.velocity = velocity ?? 0;
  }

  updateVelocity() {
    let newVelocity = this.velocity + this.acceleration;
    if (Math.abs(newVelocity) > this.maxSpeed) {
      newVelocity = Math.sign(newVelocity) * this.maxSpeed;
    }
    this.velocity = newVelocity;
  }

  resetVelocity() {
    this.velocity = 0;
  }

  nextVelocity() {
    if (this.maxSpeed === 0) {
      return 0;
    }
    let newVelocity = this.velocity + this.acceleration;

    if (Math.abs(newVelocity) > this.maxSpeed) {
      newVelocity = Math.sign(newVelocity) * this.maxSpeed;
    }
    return newVelocity;
  }

  getUpdateCount() {
    const abs = Math.abs(this.velocity);
    const floored = Math.floor(abs);
    const mod = abs - floored;
    return floored + (Math.random() < mod ? 1 : 0);
  }

  update(particle: Particle, grid: Grid, params: Params) {
    if (!this.shouldUpdate(params)) {
      return;
    }
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

  shouldUpdate({ direction }: { direction?: number }) {
    return direction === Math.sign(this.nextVelocity());
  }

  applyMovement(particle: Particle, grid: Grid) {
    let index = particle.index;
    for (let v = 0; v < this.getUpdateCount(); v++) {
      const newIndex = this.moveParticle(particle, grid);
      if (newIndex !== index) {
        index = newIndex;
        particle.index = newIndex;
      } else {
        this.resetVelocity();
        break;
      }
    }
  }

  canPassThrough(particle: Particle) {
    return particle?.isEmpty ?? false;
  }
  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;

    // Determine movement direction based on velocity sign (up or down)
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical = i + nextDelta;
    const nextVerticalLeft = nextVertical - 1;
    const nextVerticalRight = nextVertical + 1;

    // Try moving vertically in the current direction
    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    // Try diagonal movement
    if (
      this.canPassThrough(grid.grid[nextVerticalLeft]) &&
      Math.abs((nextVerticalLeft % grid.columns) - column) === 1
    ) {
      grid.swap(i, nextVerticalLeft);
      return nextVerticalLeft;
    }

    if (
      this.canPassThrough(grid.grid[nextVerticalRight]) &&
      Math.abs((nextVerticalRight % grid.columns) - column) === 1
    ) {
      grid.swap(i, nextVerticalRight);
      return nextVerticalRight;
    }

    return i; // No movement possible
  }
}
