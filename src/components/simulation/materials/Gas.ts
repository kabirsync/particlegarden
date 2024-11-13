// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { LimitedLife } from "@/components/simulation/behaviours/LimitedLife";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { Grid } from "@/components/simulation/Grid";
import Particle from "@/components/simulation/materials/Particle";
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
  fuel?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

class Gas extends Particle {
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
      fuel = gasFuel + gasFuel * Math.random(),
      chanceToCatch = gasChanceToCatch,
      smokeColor = gasSmokeColor,
    }: GasProps
  ) {
    super(index, {
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
        new LimitedLife(4000 - 400 * Math.random(), {
          onDeath: (_, particle: Particle, grid: Grid) => {
            grid.clearIndex(particle.index);
          },
        }),
        // new Cloneable({
        //   color,
        //   material: "Gas",
        //   maxSpeed,
        //   acceleration,
        //   initialVelocity,
        //   diagonalSpread,
        //   verticalSpread,
        //   horizontalSpread,
        //   fuel,
        //   smokeColor,
        // }),
        // new Destroyable(),
      ],
    });
  }
}

export default Gas;
