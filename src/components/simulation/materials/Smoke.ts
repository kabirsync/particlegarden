import { Color } from "three";
import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { LimitedLife } from "@/components/simulation/behaviours/LimitedLife";
import { varyColor } from "@/lib/colors";
import { Flammable } from "@/components/simulation/behaviours/Flammable";
import {
  smokeAcceleration,
  smokeColor,
  smokeDiagonalSpread,
  smokeHorizontalSpread,
  smokeInitialVelocity,
  smokeMaxSpeed,
  smokeVerticalSpread,
} from "@/lib/constants";

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
      burning = false,
      color = smokeColor,
      life = 400 - 400 * Math.random(),
      maxSpeed = smokeMaxSpeed,
      acceleration = smokeAcceleration,
      initialVelocity = smokeInitialVelocity,
      diagonalSpread = smokeDiagonalSpread,
      verticalSpread = smokeVerticalSpread,
      horizontalSpread = smokeHorizontalSpread,
    }: SmokeProps
  ) {
    const behaviours = [];

    if (burning) {
      behaviours.push(
        new Flammable({
          fuel: life,
          chanceToSpread: (behaviour: Flammable) =>
            (0.5 * behaviour.remainingLife) / behaviour.lifetime,
          burning: true,
        })
      );
    }

    behaviours.push(
      ...[
        new MovesVerticalWater({
          maxSpeed,
          acceleration,
          initialVelocity,
          diagonalSpread,
          verticalSpread,
          horizontalSpread,
        }),
        new LimitedLife(life, {
          onTick: (behaviour: LimitedLife, particle: Particle) => {
            void behaviour;
            void particle;
          },
          onDeath: (_, particle: Particle, grid: Grid) => {
            grid.clearIndex(particle.index);
          },
        }),
      ]
    );
    super(index, {
      color: varyColor(color ?? smokeColor),
      stateOfMatter: "gas",

      behaviours,
    });
  }
}
