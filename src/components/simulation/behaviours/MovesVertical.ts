import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "../Grid";
import Particle2, { Params } from "@/components/simulation/materials/Particle";

export type MovesVerticalProps = {
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
};
export abstract class MovesVertical extends Behaviour {
  maxSpeed: number;
  acceleration: number;
  velocity: number;

  constructor({
    maxSpeed = 0,
    acceleration = 0,
    initialVelocity = 0,
  }: MovesVerticalProps) {
    super();
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.velocity = initialVelocity;
  }

  updateVelocity() {
    this.velocity =
      (this.velocity + this.acceleration > 0 ? 1 : -1) *
      Math.min(Math.abs(this.velocity + this.acceleration), this.maxSpeed);
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

  update(particle: Particle2, grid: Grid, params: Params) {
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

  applyMovement(particle: Particle2, grid: Grid) {
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

  canPassThrough(particle: Particle2) {
    return particle?.stateOfMatter === "empty";
  }

  abstract moveParticle(particle: Particle2, grid: Grid): number;
}
