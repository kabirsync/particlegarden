import { Behaviour2 } from "@/components/simulation/behaviours/Behaviour2";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "three";

type ParticleOptions = {
  color: Color;
  behaviour?: Behaviour2;
  stateOfMatter: StateOfMatter;
};

export type Params = {
  direction?: 1 | -1;
};

export type StateOfMatter = "solid" | "liquid" | "gas" | "empty";

class Particle2 {
  index: number;
  color: Color;
  stateOfMatter: StateOfMatter;
  behaviour?: Behaviour2;
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
    // this.behaviours?.forEach((behaviour) =>
    //   behaviour.update(this, grid, params)
    // );
    this.behaviour?.update(this, grid, params);
  }
}

export default Particle2;
