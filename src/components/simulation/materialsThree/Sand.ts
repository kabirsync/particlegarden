import { sandColor, varyColor } from "@/lib/colorsThree";
import Particle from "@/components/simulation/materialsThree/Particle";
import { Color } from "three";
import { MovesVertical } from "@/components/simulation/behavioursThree/MovesVertical";

type SandProps = {
  color?: Color;
};

class Sand extends Particle {
  constructor(index: number, { color = sandColor }: SandProps) {
    super(index, {
      color: varyColor(color),
      behaviours: [
        new MovesVertical({ maxSpeed: 9, acceleration: 0.4, velocity: 0.1 }),
      ],
    });
  }
}

export default Sand;
