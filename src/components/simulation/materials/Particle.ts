import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "three";

type ParticleOptions = {
  color: Color;
  isEmpty?: boolean;
  behaviours?: Behaviour[];
  stateOfMatter: StateOfMatter;
};

export type Params = {
  direction?: 1 | -1;
};

export type StateOfMatter = "solid" | "liquid" | "gas";

class Particle {
  index: number;
  color: Color;
  isEmpty: boolean;
  stateOfMatter: StateOfMatter;
  behaviours: Behaviour[];
  modified: boolean;

  constructor(
    index: number,
    { color, stateOfMatter, isEmpty = false, behaviours = [] }: ParticleOptions
  ) {
    this.index = index;
    this.color = color;
    this.isEmpty = isEmpty;
    this.behaviours = behaviours;
    this.modified = false;
    this.stateOfMatter = stateOfMatter;
  }

  update(grid: Grid, params: Params) {
    this.behaviours?.forEach((behaviour) =>
      behaviour.update(this, grid, params)
    );
  }
}

export default Particle;
