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
  smokeLife,
  smokeMaxSpeed,
  smokeVerticalSpread,
} from "@/lib/constants";
// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";

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
      life = smokeLife - smokeLife * Math.random(),
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
          chanceToCatch: 0,
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
        new LimitedLife(life - life * Math.random(), {
          onTick: (behaviour: LimitedLife, particle: Particle) => {
            void behaviour;
            void particle;
          },
          onDeath: (_, particle: Particle, grid: Grid) => {
            grid.clearIndex(particle.index);
          },
        }),
        // new Cloneable({
        //   color,
        //   material: "Smoke",
        //   maxSpeed,
        //   acceleration,
        //   initialVelocity,
        //   diagonalSpread,
        //   verticalSpread,
        //   horizontalSpread,
        // }),
        // new Destroyable(),
      ]
    );
    super(index, {
      color: varyColor(color ?? smokeColor),
      stateOfMatter: "gas",

      behaviours,
    });
  }
}
