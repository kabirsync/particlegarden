import { Color } from "three";
import { Grid } from "../Grid";
import { LimitedLife } from "./LimitedLife";
import Particle from "@/components/simulation/materials/Particle";
import Empty from "@/components/simulation/materials/Empty";
import { fireColors, smokeMaterialColor } from "@/lib/constants";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Water from "@/components/simulation/materials/Water";
import { Behaviour } from "@/components/simulation/behaviours/Behaviour";

export type FlammableProps = {
  fuel?: number;
  burning?: boolean;
  chanceToCatch: number;
  chanceToSpread?: number | ((behavior: Flammable) => number);
  smokeColor?: Color;
  onDeath?: (behaviour: LimitedLife, particle: Particle, grid: Grid) => void;
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
    fuel = 10000,
    burning = false,
    chanceToCatch,
    chanceToSpread = () => 1,
    smokeColor = smokeMaterialColor,
    onDeath,
  }: FlammableProps) {
    fuel = fuel + fuel * Math.random();

    const defaultOnDeath = (_: Behaviour, particle: Particle, grid: Grid) => {
      if (Math.random() < 0.3) {
        const smoke = new Smoke(particle.index, {
          burning: Math.random() < 0.1,
          color: smokeColor,
        });
        grid.setIndex(particle.index, smoke);
      } else {
        grid.setIndex(particle.index, new Empty(particle.index));
      }
    };

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
      onDeath: onDeath ?? defaultOnDeath,
    });
    this.colors = fireColors;
    this.burning = burning;
    this.chanceToCatch = chanceToCatch;
    this.chancesToCatch = 0;
    this.chanceToSpread = chanceToSpread;
    this.smokeColor = smokeColor;
  }

  update(particle: Particle, grid: Grid) {
    if (this.burning) {
      // Check for water above
      // Possibly extract this so different liquids can be passed into Flammable
      const aboveIndex = particle.index - grid.columns;
      const leftIndex = particle.index - 1;
      const rightIndex = particle.index + 1;
      const column = particle.index % grid.columns;
      const isLeftEdge = column === 0;
      const isRightEdge = column === grid.columns - 1;

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
      const flammable = p?.behaviours.find(
        (behaviour) => behaviour instanceof Flammable
      );
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
