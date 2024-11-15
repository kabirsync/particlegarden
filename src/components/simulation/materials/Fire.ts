import { FireMovement } from "@/components/simulation/behaviours/FireMovement";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import Particle from "@/components/simulation/materials/Particle";
import {
  fireAcceleration,
  fireColor,
  fireDiagonalSpread,
  fireExtinguishMaterial,
  fireHorizontalSpread,
  fireInitialVelocity,
  fireLife,
  fireMaxSpeed,
  fireSmokeColor,
  fireVerticalSpread,
} from "@/lib/constants";
import { Color } from "three";

type FireProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  life?: number;
  smokeColor?: Color;
  extinguishMaterial?: MaterialOptionsType;
};

export class Fire extends Particle {
  extinguishMaterial: MaterialOptionsType;
  smokeColor: Color;
  constructor(
    index: number,
    {
      color = fireColor,
      life = fireLife,
      maxSpeed = fireMaxSpeed,
      acceleration = fireAcceleration,
      initialVelocity = fireInitialVelocity,
      diagonalSpread = fireDiagonalSpread,
      verticalSpread = fireVerticalSpread,
      horizontalSpread = fireHorizontalSpread,
      smokeColor = fireSmokeColor,
      extinguishMaterial = fireExtinguishMaterial,
    }: FireProps
  ) {
    super(index, {
      color,
      stateOfMatter: "gas",
      behaviour: new FireMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        life,
        smokeColor,
      }),
    });
    this.smokeColor = smokeColor;
    this.extinguishMaterial = extinguishMaterial;
  }
}
