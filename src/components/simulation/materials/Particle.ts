import { Color } from "pixi.js";

type ParticleOptions = {
  color: Color;
  isEmpty?: boolean;
};

class Particle {
  index: number;
  color: Color;
  isEmpty: boolean;

  constructor(index: number, { color, isEmpty = false }: ParticleOptions) {
    this.index = index;
    this.color = color;
    this.isEmpty = isEmpty;
  }
}

export default Particle;
