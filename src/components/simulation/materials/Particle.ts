import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "three";

type ParticleOptions = {
  color: Color;
  behaviour?: Behaviour;
  stateOfMatter: StateOfMatter;
};

export type Params = {
  direction?: 1 | -1;
};

export type StateOfMatter = "solid" | "liquid" | "gas" | "empty";

class Particle {
  index: number;
  color: Color;
  stateOfMatter: StateOfMatter;
  behaviour?: Behaviour;
  modified: boolean;

  constructor(
    index: number,
    { color, stateOfMatter, behaviour }: ParticleOptions
  ) {
    this.index = index;
    this.color = color;
    this.behaviour = behaviour;
    this.modified = false;
    this.stateOfMatter = stateOfMatter;
  }

  update(grid: Grid, params: Params) {
    this.behaviour?.update(this, grid, params);
  }
}

export default Particle;
