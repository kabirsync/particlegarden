import { sandColor, varyColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "pixi.js";
import { Behaviour } from "@/components/simulation/behaviours/Behaviour";

type SandProps = {
  color?: Color;
};

class Sand extends Particle {
  constructor(index: number, { color = sandColor }: SandProps) {
    super(index, { color: varyColor(color), behaviours: [new Behaviour()] });
  }
}

export default Sand;
