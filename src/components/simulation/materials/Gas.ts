import { GasMovement } from "@/components/simulation/behaviours/GasMovement";
import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import {
  gasAcceleration,
  gasChanceToCatch,
  gasColor,
  gasDiagonalSpread,
  gasFuel,
  gasHorizontalSpread,
  gasInitialVelocity,
  gasMaxSpeed,
  gasSmokeColor,
  gasVerticalSpread,
} from "@/lib/constants";

import { Color } from "three";

type GasProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  smokeColor?: Color;
  life?: number;
  chanceToCatch?: number;
  _skipColorVariation?: boolean;
};

class Gas extends Particle {
  life: number;
  chanceToCatch: number;
  smokeColor: Color;
  burningMaterial: "Fire";

  constructor(
    index: number,
    {
      color = gasColor,
      maxSpeed = gasMaxSpeed,
      acceleration = gasAcceleration,
      initialVelocity = gasInitialVelocity,
      diagonalSpread = gasDiagonalSpread,
      verticalSpread = gasVerticalSpread,
      horizontalSpread = gasHorizontalSpread,
      life = gasFuel,
      chanceToCatch = gasChanceToCatch,
      smokeColor = gasSmokeColor,
      _skipColorVariation = false,
    }: GasProps
  ) {
    super(index, {
      name: "Gas",
      color: _skipColorVariation ? color : varyColor(color),
      stateOfMatter: "gas",
      behaviour: new GasMovement({
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
    this.life = life;
    this.chanceToCatch = chanceToCatch;
    this.smokeColor = smokeColor;
    this.burningMaterial = "Fire";
  }
}

export default Gas;
