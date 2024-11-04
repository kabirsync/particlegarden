import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import { lightenThreeColor, waterColor } from "@/lib/colors";
import { Color } from "three";

type WaterProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
};

class Water extends Particle {
  constructor(
    index: number,
    {
      color = waterColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
    }: WaterProps
  ) {
    super(index, {
      color: Math.random() < 0.5 ? lightenThreeColor(color, 0.1) : color,
      stateOfMatter: "liquid",
      behaviours: [
        new MovesVerticalWater({
          maxSpeed,
          acceleration,
          initialVelocity,
        }),
      ],
    });
  }
}

export default Water;
