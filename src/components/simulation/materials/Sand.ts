import { sandColor, varyColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "three";
import { MovesVertical } from "@/components/simulation/behaviours/MovesVertical";

type SandProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  velocity?: number;
};

class Sand extends Particle {
  constructor(
    index: number,
    {
      color = sandColor,
      maxSpeed = 100,
      acceleration = 0.5,
      velocity = 0.1,
    }: SandProps
  ) {
    super(index, {
      color: varyColor(color),
      behaviours: [
        new MovesVertical({
          maxSpeed,
          acceleration,
          velocity,
        }),
      ],
    });
  }
}

export default Sand;
