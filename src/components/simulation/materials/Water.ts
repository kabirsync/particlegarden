import { WaterMovement } from "@/components/simulation/behaviours/WaterMovement";
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
      color: color,
      stateOfMatter: "liquid",
      behaviour: new WaterMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
      }),
    });
  }
}

export default Water;
