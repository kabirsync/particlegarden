import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Grid } from "@/components/simulation/Grid";
import { Color } from "three";

type ParticleOptions = {
  color: Color;
  behaviours?: Behaviour[];
  stateOfMatter: StateOfMatter;
};

export type Params = {
  direction?: 1 | -1;
};

export type StateOfMatter = "solid" | "liquid" | "gas" | "empty";

// export type BehaviorConstructor<T extends Behaviour> = new (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ...args: any[]
// ) => T;

class Particle {
  index: number;
  color: Color;
  stateOfMatter: StateOfMatter;
  behaviours: Behaviour[];
  modified: boolean;
  // behaviorsLookup: Map<BehaviorConstructor<Behaviour>, Behaviour>;

  constructor(
    index: number,
    { color, stateOfMatter, behaviours = [] }: ParticleOptions
  ) {
    this.index = index;
    this.color = color;
    this.behaviours = behaviours;
    this.modified = false;
    this.stateOfMatter = stateOfMatter;
    // this.behaviorsLookup = new Map(
    //   this.behaviours.map((b) => [
    //     b.constructor as BehaviorConstructor<Behaviour>,
    //     b,
    //   ])
    // );
  }

  update(grid: Grid, params: Params) {
    this.behaviours?.forEach((behaviour) =>
      behaviour.update(this, grid, params)
    );
  }

  // getBehaviour<T extends Behaviour>(
  //   behaviorClass: BehaviorConstructor<T>
  // ): T | undefined {
  //   return this.behaviorsLookup.get(behaviorClass) as T | undefined;
  // }
}

export default Particle;
