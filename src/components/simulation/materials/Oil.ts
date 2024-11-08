import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import { oilColor } from "@/lib/constants";
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
};

class Oil extends Particle {
  constructor(
    index: number,
    {
      color = oilColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
      diagonalSpread = 3,
      verticalSpread = 1,
      horizontalSpread = 3,
      fuel = 300 + 100 * Math.random(),
      chanceToCatch = 0.01,
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
        }),
      ],
    });
  }
}

export default Oil;
