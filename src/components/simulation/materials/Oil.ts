import { OilMovement } from "@/components/simulation/behaviours/OilMovement";
import Particle from "@/components/simulation/materials/Particle";
import {
  oilAcceleration,
  oilChanceToCatch,
  oilColor,
  oilDiagonalSpread,
  oilFuel,
  oilHorizontalSpread,
  oilInitialVelocity,
  oilMaxSpeed,
  oilSmokeColor,
  oilVerticalSpread,
} from "@/lib/constants";

import { Color } from "three";

type OilProps = {
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
};

class Oil extends Particle {
  life: number;
  chanceToCatch: number;
  //   chanceToMelt: number;
  smokeColor: Color;
  burningMaterial: "LiquidFire";

  constructor(
    index: number,
    {
      color = oilColor,
      maxSpeed = oilMaxSpeed,
      acceleration = oilAcceleration,
      initialVelocity = oilInitialVelocity,
      diagonalSpread = oilDiagonalSpread,
      verticalSpread = oilVerticalSpread,
      horizontalSpread = oilHorizontalSpread,
      life = oilFuel,
      chanceToCatch = oilChanceToCatch,
      //   chanceToMelt = oilC,
      smokeColor = oilSmokeColor,
    }: OilProps
  ) {
    super(index, {
      color: color,
      stateOfMatter: "liquid",
      behaviour: new OilMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        // life,
        // smokeColor,
      }),
    });
    this.life = life;
    this.chanceToCatch = chanceToCatch;
    // this.chanceToMelt = chanceToMelt;
    this.smokeColor = smokeColor;
    this.burningMaterial = "LiquidFire";
  }
}

export default Oil;
