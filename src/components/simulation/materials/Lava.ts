import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import Stone from "@/components/simulation/materials/Stone";
import {
  lavaAcceleration,
  lavaColor,
  lavaDiagonalSpread,
  lavaFuel,
  lavaHorizontalSpread,
  lavaInitialVelocity,
  lavaMaxSpeed,
  lavaSmokeColor,
  lavaVerticalSpread,
} from "@/lib/constants";
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
  smokeColor?: Color;
};

class Lava extends Particle {
  constructor(
    index: number,
    {
      color = lavaColor,
      maxSpeed = lavaMaxSpeed,
      acceleration = lavaAcceleration,
      initialVelocity = lavaInitialVelocity,
      diagonalSpread = lavaDiagonalSpread,
      verticalSpread = lavaVerticalSpread,
      horizontalSpread = lavaHorizontalSpread,
      fuel = lavaFuel + lavaFuel * Math.random(),
      smokeColor = lavaSmokeColor,
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
          chanceToCatch: 0,
          smokeColor,
          //   chanceToCatch,
          burning: true,
          onDeath: (_, particle, grid) => {
            grid.setIndex(particle.index, new Stone(particle.index, {}));
          },
        }),
      ],
    });
  }
}

export default Lava;
