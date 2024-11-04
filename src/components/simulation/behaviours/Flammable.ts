import { Color } from "three";
import { Grid } from "../Grid";
// import { Empty } from "../Materials/Empty";
// import { Particle } from "../Materials/Particle";
// import { Smoke } from "../Materials/Smoke";
// import { Water } from "../Materials/Water";
import { LimitedLife } from "./LimitedLife";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Water from "@/components/simulation/materials/Water";
import Particle from "@/components/simulation/materials/Particle";
import Empty from "@/components/simulation/materials/Empty";

export type FlammableProps = {
  fuel?: number;
  burning?: boolean;
  chanceToCatch?: number;
  chanceToSpread?: number | ((behavior: Flammable) => number);
  smokeColor?: Color;
};

export class Flammable extends LimitedLife {
  colors: Color[];
  burning: boolean;
  chanceToCatch: number;
  chanceToSpread: number | ((behavior: Flammable) => number);
  originalColor?: Color;
  chancesToCatch: number;
  smokeColor?: Color;

  constructor({
    fuel,
    burning,
    chanceToCatch,
    chanceToSpread,
    smokeColor,
  }: FlammableProps) {
    fuel = fuel ?? 10 + 100 * Math.random();
    const colors = [
      new Color("#541e1e"),
      new Color("#ff1f1f"),
      new Color("#ea5a00"),
      new Color("#ff6900"),
      new Color("#eecc09"),
    ];
    super(fuel, {
      onTick: (behavior, particle) => {
        if (this.originalColor && Math.random() < 0.5) {
          particle.color = this.originalColor;
          return;
        }
        const colors = this.colors;
        const frequency = Math.sqrt(behavior.lifetime / behavior.remainingLife);
        const period = frequency * colors.length;
        particle.color =
          colors[Math.floor(behavior.remainingLife / period) % colors.length];
      },
      onDeath: (_, particle, grid) => {
        const smoke = new Smoke(particle.index, {
          burning: Math.random() < 0.1,
          color: smokeColor,
        });
        grid.setIndex(particle.index, smoke);
      },
    });
    this.colors = colors;
    this.burning = burning ?? false;
    this.chanceToCatch = chanceToCatch ?? 0;
    this.chancesToCatch = 0;
    this.chanceToSpread = chanceToSpread ?? (() => 1.0);
    this.smokeColor = smokeColor;
  }

  update(particle: Particle, grid: Grid) {
    if (this.burning) {
      // Check for water above
      const aboveIndex = particle.index - grid.columns;
      const leftIndex = particle.index - 1;
      const rightIndex = particle.index + 1;

      const column = particle.index % grid.columns;
      const isLeftEdge = column === 0;
      const isRightEdge = column === grid.columns - 1;

      // Redo this logic
      if (
        (aboveIndex >= 0 && grid.grid[aboveIndex] instanceof Water) ||
        (!isLeftEdge && grid.grid[leftIndex] instanceof Water) ||
        (!isRightEdge && grid.grid[rightIndex] instanceof Water)
      ) {
        this.extinguish(particle, grid);
        return;
      }

      super.update(particle, grid);
      this.tryToSpread(particle, grid);
    } else if (this.chancesToCatch > 0) {
      const chanceToSpreadValue =
        typeof this.chanceToSpread === "function"
          ? this.chanceToSpread(this)
          : this.chanceToSpread;

      const totalChance =
        chanceToSpreadValue * this.chancesToCatch * this.chanceToCatch;

      if (Math.random() < totalChance) {
        this.burning = true;
      }
      this.chancesToCatch = 0;
    }
  }

  extinguish(particle: Particle, grid: Grid) {
    this.burning = false;
    grid.setIndex(particle.index, new Empty(particle.index));
  }

  tryToSpread(particle: Particle, grid: Grid) {
    const candidates = this.getSpreadCandidates(particle, grid);
    candidates.forEach((i) => {
      const p = grid.grid[i];
      // console.log({ p });
      const flammable = p?.getBehaviour(Flammable);
      if (flammable) {
        flammable.chancesToCatch += 0.5 + Math.random() * 0.5;
      }
    });
  }

  getSpreadCandidates(particle: Particle, grid: Grid) {
    const index = particle.index;
    const column = index % grid.columns;
    const candidates = [];
    // Each of the 8 directions
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const di = index + dx + dy * grid.columns;
        const x = di % grid.columns;
        // Make sure it's in our grid
        const inBounds = di >= 0 && di < grid.grid.length;
        // Make sure we didn't wrap to the next or previous row
        const noWrap = Math.abs(x - column) <= 1;
        if (inBounds && noWrap) {
          candidates.push(di);
        }
      }
    }
    return candidates;
  }
}
