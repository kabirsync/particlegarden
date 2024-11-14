import { FireMovement } from "@/components/simulation/behaviours/FireMovement";
import Particle from "@/components/simulation/materials/Particle";
import {
  fireAcceleration,
  fireColor,
  fireDiagonalSpread,
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
};

export class Fire extends Particle {
  constructor(
    index: number,
    {
      color = fireColor,
      life = fireLife - fireLife * Math.random(),
      maxSpeed = fireMaxSpeed,
      acceleration = fireAcceleration,
      initialVelocity = fireInitialVelocity,
      diagonalSpread = fireDiagonalSpread,
      verticalSpread = fireVerticalSpread,
      horizontalSpread = fireHorizontalSpread,
      smokeColor = fireSmokeColor,
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
  }
}
