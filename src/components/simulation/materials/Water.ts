import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import {
  waterAcceleration,
  waterColor,
  waterDiagonalSpread,
  waterHorizontalSpread,
  waterInitialVelocity,
  waterMaxSpeed,
  waterVerticalSpread,
} from "@/lib/constants";
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
      maxSpeed = waterMaxSpeed,
      acceleration = waterAcceleration,
      initialVelocity = waterInitialVelocity,
      diagonalSpread = waterDiagonalSpread,
      verticalSpread = waterVerticalSpread,
      horizontalSpread = waterHorizontalSpread,
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
