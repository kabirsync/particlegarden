import { sandColor, varyColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "pixi.js";
import { MovesVertical } from "@/components/simulation/behaviours/MovesVertical";

type SandProps = {
  color?: Color;
};

class Sand extends Particle {
  constructor(index: number, { color = sandColor }: SandProps) {
    super(index, {
      color: varyColor(color),
      behaviours: [
        new MovesVertical({ maxSpeed: 9, acceleration: -0.4, velocity: -0.1 }),
      ],
    });
  }
}

export default Sand;
