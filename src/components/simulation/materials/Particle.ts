import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Color } from "three";

type ParticleOptions = {
  color: Color;
  behaviour?: Behaviour;
  stateOfMatter: StateOfMatter;
  name: MaterialOptionsType;
};

export type Params = {
  direction?: 1 | -1;
};

export type StateOfMatter = "solid" | "liquid" | "gas" | "empty";

class Particle {
  name: MaterialOptionsType;
  index: number;
  color: Color;
  stateOfMatter: StateOfMatter;
  behaviour?: Behaviour;
  modified: boolean;

  constructor(
    index: number,
    { name, color, stateOfMatter, behaviour }: ParticleOptions
  ) {
    this.index = index;
    this.name = name;
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
