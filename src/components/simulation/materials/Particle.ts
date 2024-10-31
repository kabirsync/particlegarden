import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import { Color } from "pixi.js";

type ParticleOptions = {
  color: Color;
  isEmpty?: boolean;
  behaviours?: Behaviour[];
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
}

export default Particle;
