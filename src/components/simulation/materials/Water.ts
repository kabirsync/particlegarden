import { waterColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "three";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";

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
      color: color,
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
