import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import { lavaColor } from "@/lib/constants";
import { Color } from "three";

type LavaProps = {
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

class Lava extends Particle {
  constructor(
    index: number,
    {
      color = lavaColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
      diagonalSpread = 3,
      verticalSpread = 1,
      horizontalSpread = 3,
      fuel = 30000 + 100 * Math.random(),
    }: //   chanceToCatch = 0.01,
    LavaProps
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
          //   chanceToCatch,
          burning: true,
        }),
      ],
    });
  }
}

export default Lava;
