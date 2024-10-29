import { Color } from "pixi.js";

type ParticleOptions = {
  color: Color;
};

class Particle {
  index: number;
  color: Color;

  constructor(index: number, { color }: ParticleOptions) {
    this.index = index;
    this.color = color;
  }
}

export default Particle;
