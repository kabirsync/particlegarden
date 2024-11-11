import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
import { MovesVerticalAcid } from "@/components/simulation/behaviours/MovesVerticalAcid";
import Particle from "@/components/simulation/materials/Particle";
import {
  acidAcceleration,
  acidColor,
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
    }: AcidProps
  ) {
    super(index, {
      color: color,
      stateOfMatter: "liquid",
      behaviours: [
        new MovesVerticalAcid({
          maxSpeed,
          acceleration,
          initialVelocity,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
        }),
        new Cloneable({
          color,
          material: "Acid",
          maxSpeed,
          acceleration,
          initialVelocity,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
        }),
        new Destroyable(),
      ],
    });
  }
}
