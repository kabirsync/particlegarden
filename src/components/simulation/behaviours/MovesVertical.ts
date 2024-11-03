import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "../Grid";
import Particle, { Params } from "@/components/simulation/materials/Particle";

export class MovesVertical extends Behaviour {
  maxSpeed: number;
  acceleration: number;
  velocity: number;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
  }: {
    maxSpeed?: number;
    acceleration?: number;
    initialVelocity?: number;
  }) {
    super();
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.velocity = initialVelocity;
  }

  updateVelocity() {
    const newVelocity =
      Math.sign(this.velocity + this.acceleration) *
      Math.min(Math.abs(this.velocity + this.acceleration), this.maxSpeed);
    this.velocity = newVelocity;
  }

  resetVelocity() {
    this.velocity = 0;
  }

  nextVelocity() {
    if (this.maxSpeed === 0) return 0;
    return (
      Math.sign(this.velocity + this.acceleration) *
      Math.min(Math.abs(this.velocity + this.acceleration), this.maxSpeed)
    );
  }

  getUpdateCount() {
    const floored = Math.floor(Math.abs(this.velocity));
    return (
      floored + (Math.random() < Math.abs(this.velocity) - floored ? 1 : 0)
    );
    // return floored + 1;
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

  shouldUpdate({ direction }: { direction?: number }) {
    return direction === Math.sign(this.nextVelocity());
  }

  applyMovement(particle: Particle, grid: Grid) {
    let index = particle.index;
    const updateCount = this.getUpdateCount();

    for (let v = 0; v < updateCount; v++) {
      const newIndex = this.moveParticle(particle, grid);
      if (newIndex === index) {
        this.resetVelocity();
        break;
      }
      index = newIndex;
      particle.index = newIndex;
    }
  }

  canPassThrough(particle: Particle) {
    return particle?.isEmpty ?? false;
  }

  moveParticle(particle: Particle, grid: Grid): number {
    const i = particle.index;
    const column = i % grid.columns;
    const nextDelta = Math.sign(this.velocity) * grid.columns;
    const nextVertical = i + nextDelta;
    const nextVerticalLeft = nextVertical - 1;
    const nextVerticalRight = nextVertical + 1;

    if (this.canPassThrough(grid.grid[nextVertical])) {
      grid.swap(i, nextVertical);
      return nextVertical;
    }

    if (column > 0 && this.canPassThrough(grid.grid[nextVerticalLeft])) {
      grid.swap(i, nextVerticalLeft);
      return nextVerticalLeft;
    }

    if (
      column < grid.columns - 1 &&
      this.canPassThrough(grid.grid[nextVerticalRight])
    ) {
      grid.swap(i, nextVerticalRight);
      return nextVerticalRight;
    }

    return i;
  }
}
