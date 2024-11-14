import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";

export type LimitedLifeProps = {
  onTick?: (behaviour: LimitedLife, particle: Particle) => void;
  onDeath?: (behaviour: LimitedLife, particle: Particle, grid: Grid) => void;
};

export class LimitedLife extends Behaviour {
  lifetime: number;
  remainingLife: number;
  onTick: (behaviour: LimitedLife, particle: Particle) => void;
  onDeath: (behaviour: LimitedLife, particle: Particle, grid: Grid) => void;

  constructor(
    lifetime: number,
    { onTick = () => {}, onDeath = () => {} }: LimitedLifeProps = {}
  ) {
    super();
    this.lifetime = lifetime;
    this.remainingLife = this.lifetime;
    this.onTick = onTick;
    this.onDeath = onDeath;
  }

  update(particle: Particle, grid: Grid) {
    if (this.remainingLife <= 0) {
      this.onDeath(this, particle, grid);
    } else {
      this.remainingLife = Math.floor(this.remainingLife - 1);
    }

    this.onTick(this, particle);
  }
}
