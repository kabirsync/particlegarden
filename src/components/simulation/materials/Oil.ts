import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
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
  fuel?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

class Oil extends Particle {
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
      fuel = oilFuel + oilFuel * Math.random(),
      chanceToCatch = oilChanceToCatch,
      smokeColor = oilSmokeColor,
    }: OilProps
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
        new Flammable({
          fuel,
          chanceToCatch,
          smokeColor,
        }),
        new Cloneable({
          color,
          material: "Oil",
          maxSpeed,
          acceleration,
          initialVelocity,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
          fuel,
          smokeColor,
        }),
      ],
    });
  }
}

export default Oil;
