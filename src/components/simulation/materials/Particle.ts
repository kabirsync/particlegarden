import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "pixi.js";

type ParticleOptions = {
  color: Color;
  isEmpty?: boolean;
  behaviours?: Behaviour[];
};

export type Params = {
  direction?: 1 | -1;
};

class Particle {
  index: number;
  color: Color;
  isEmpty: boolean;
  behaviours: Behaviour[];

  constructor(
    index: number,
    { color, isEmpty = false, behaviours = [] }: ParticleOptions
  ) {
    this.index = index;
    this.color = color;
    this.isEmpty = isEmpty;
    this.behaviours = behaviours;
  }

  // Default update method, which can be overridden by subclasses
  update(grid: Grid, params: Params) {
    console.log("particle update");
    this.behaviours?.forEach((behaviour) =>
      behaviour.update(this, grid, params)
    );
    // Base particle doesn't have movement or behavior by default
  }
}

export default Particle;
