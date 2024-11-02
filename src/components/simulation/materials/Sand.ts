import { sandColor, varyColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "three";
import { MovesVertical } from "@/components/simulation/behaviours/MovesVertical";

type SandProps = {
  color?: Color;
};

class Sand extends Particle {
  constructor(index: number, { color = sandColor }: SandProps) {
    super(index, {
      color: varyColor(color),
      behaviours: [
        new MovesVertical({
          maxSpeed: 100,
          acceleration: 0.00001,
          velocity: 0.04,
        }),
      ],
    });
  }
}

export default Sand;
