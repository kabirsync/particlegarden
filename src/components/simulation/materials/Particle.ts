import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "three";

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
  modified: boolean;

  constructor(
    index: number,
    { color, isEmpty = false, behaviours = [] }: ParticleOptions
  ) {
    this.index = index;
    this.color = color;
    this.isEmpty = isEmpty;
    this.behaviours = behaviours;
    this.modified = false;
  }

  update(grid: Grid, params: Params) {
    this.behaviours?.forEach((behaviour) =>
      behaviour.update(this, grid, params)
    );
  }
}

export default Particle;
