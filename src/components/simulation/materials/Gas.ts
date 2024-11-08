import { Color } from "three";

import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { LimitedLife } from "@/components/simulation/behaviours/LimitedLife";
import { varyColor } from "@/lib/colors";
import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { gasColor } from "@/lib/constants";

export class Gas extends Particle {
  static addProbability = 0.25;

  constructor(
    index: number,
    { burning, color }: { burning?: boolean; color?: Color } = {}
  ) {
    const fuel = 4000 - 400 * Math.random();
    const behaviours = [];

    if (burning) {
      behaviours.push(
        new Flammable({
          fuel,
          chanceToSpread: (behavior: Flammable) =>
            (0.5 * behavior.remainingLife) / behavior.lifetime,
          burning: true,
        })
      );
    }

    behaviours.push(
      ...[
        new MovesVerticalWater({
          maxSpeed: 0.4,
          acceleration: -0.5,
          initialVelocity: -0.1,
        }),
        new LimitedLife(
          // Each particle has 400 - 800 life (random)
          400 - 400 * Math.random(),
          {
            onTick: (behaviour: LimitedLife, particle: Particle) => {
              void behaviour;
              void particle;
              // let pct = behaviour.remainingLife / behaviour.lifetime;
              // particle.color?.setAlpha(Math.floor(255.0 * pct));
            },
            onDeath: (_, particle: Particle, grid: Grid) => {
              grid.clearIndex(particle.index);
            },
          }
        ),
        // new Cloneable({ material: "Gas", color: color ?? baseGasColor }),

        // Fading behavior?
      ]
    );
    super(index, {
      color: varyColor(color ?? gasColor),
      stateOfMatter: "gas",
      //   airy: true,

      behaviours,
    });
  }
}
