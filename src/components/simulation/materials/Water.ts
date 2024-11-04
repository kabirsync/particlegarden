import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import { waterColor } from "@/lib/colors";
import { Color } from "three";

type WaterProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
};

class Water extends Particle {
  constructor(
    index: number,
    {
      color = waterColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
      diagonalSpread = 3,
      verticalSpread = 1,
      horizontalSpread = 3,
    }: WaterProps
  ) {
    super(index, {
      // color: Math.random() < 0.5 ? lightenThreeColor(color, 0.1) : color,
      color,
      stateOfMatter: "liquid",
      behaviours: [
        new MovesVerticalWater({
          maxSpeed,
          acceleration,
          initialVelocity,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
        }),
      ],
    });
  }
}

export default Water;
