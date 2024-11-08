import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { LimitedLife } from "@/components/simulation/behaviours/LimitedLife";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { Grid } from "@/components/simulation/Grid";
import Particle from "@/components/simulation/materials/Particle";
import { gasColor } from "@/lib/constants";
import { Color } from "three";

type GasProps = {
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

class Gas extends Particle {
  constructor(
    index: number,
    {
      color = gasColor,
      // maxSpeed = 10,
      // acceleration = -0.5,
      // initialVelocity = -0.1,
      diagonalSpread = 1,
      verticalSpread = 1,
      horizontalSpread = 1,
      fuel = 300 + 100 * Math.random(),
      chanceToCatch = 0.1,
    }: GasProps
  ) {
    super(index, {
      // color: Math.random() < 0.5 ? lightenThreeColor(color, 0.1) : color,
      color,
      stateOfMatter: "liquid",
      behaviours: [
        new MovesVerticalWater({
          maxSpeed: 0.4,
          acceleration: -0.5,
          initialVelocity: -0.1,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
        }),
        new Flammable({
          fuel,
          chanceToCatch,
        }),
        new LimitedLife(4000 - 400 * Math.random(), {
          // onTick: (behaviour: LimitedLife, particle: Particle) => {
          //   void behaviour;
          //   void particle;
          // },
          onDeath: (_, particle: Particle, grid: Grid) => {
            grid.clearIndex(particle.index);
          },
        }),
      ],
    });
  }
}

export default Gas;
