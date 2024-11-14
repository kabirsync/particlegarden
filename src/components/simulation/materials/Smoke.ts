import { Color } from "three";
import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import {
  smokeAcceleration,
  smokeColor,
  smokeDiagonalSpread,
  smokeHorizontalSpread,
  smokeInitialVelocity,
  smokeLife,
  smokeMaxSpeed,
  smokeVerticalSpread,
} from "@/lib/constants";
import { SmokeMovement } from "@/components/simulation/behaviours/SmokeMovement";

type SmokeProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  burning?: boolean;
  life?: number;
};

export class Smoke extends Particle {
  static addProbability = 0.25;

  constructor(
    index: number,
    {
      color = smokeColor,
      maxSpeed = smokeMaxSpeed,
      acceleration = smokeAcceleration,
      initialVelocity = smokeInitialVelocity,
      diagonalSpread = smokeDiagonalSpread,
      verticalSpread = smokeVerticalSpread,
      horizontalSpread = smokeHorizontalSpread,
      life = smokeLife - smokeLife * Math.random(),
    }: SmokeProps
  ) {
    super(index, {
      color: varyColor(color ?? smokeColor),
      stateOfMatter: "gas",
      behaviour: new SmokeMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        life,
      }),
    });
  }
}
