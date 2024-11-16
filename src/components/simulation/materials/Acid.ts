// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
import { AcidMovement } from "@/components/simulation/behaviours/AcidMovement";
import Particle from "@/components/simulation/materials/Particle";
import {
  acidAcceleration,
  acidColor,
  acidDefaultStrength,
  acidDiagonalSpread,
  acidHorizontalSpread,
  acidInitialVelocity,
  acidMaxSpeed,
  acidVerticalSpread,
} from "@/lib/constants";
import { Color } from "three";

type AcidProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  acidStrength?: number;
};

export class Acid extends Particle {
  constructor(
    index: number,
    {
      color = acidColor,
      maxSpeed = acidMaxSpeed,
      acceleration = acidAcceleration,
      initialVelocity = acidInitialVelocity,
      diagonalSpread = acidDiagonalSpread,
      verticalSpread = acidVerticalSpread,
      horizontalSpread = acidHorizontalSpread,
      acidStrength = acidDefaultStrength,
    }: AcidProps
  ) {
    super(index, {
      color: color,
      stateOfMatter: "liquid",
      behaviour: new AcidMovement({
        color,
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        acidStrength,
      }),
    });
  }
}
