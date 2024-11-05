import { Color } from "three";

import { Grid } from "../Grid";
import Particle from "@/components/simulation/materials/Particle";
// import { MovesVertical } from "@/components/simulation/behaviours/MovesVertical";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { LimitedLife } from "@/components/simulation/behaviours/LimitedLife";
import { smokeColor, varyColor } from "@/lib/colors";
import { Flammable } from "@/components/simulation/behaviours/Flammable";
// import { baseSmokeColor } from "../colors";

export class Smoke extends Particle {
  static addProbability = 0.25;

  // We pass index in to all particles now,
  // so particles know where they are in
  // relation to others.
  constructor(
    index: number,
    { burning, color }: { burning?: boolean; color?: Color } = {}
    // { color }: { color?: Color } = {}
  ) {
    const life = 400 - 400 * Math.random();
    const behaviours = [];
    // const colors = varyThreeColor(color ?? Smoke.baseColor, {
    //   lightFn: () => Math.random() * 5 - 5,
    //   satFn: () => Math.random() * 10 - 5,
    // });

    if (burning) {
      behaviours.push(
        new Flammable({
          fuel: life + 1,
          chanceToSpread: (behavior: Flammable) =>
            (0.5 * behavior.remainingLife) / behavior.lifetime,
          burning: true,
          // color: colors,
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
        // new Cloneable({ material: "Smoke", color: color ?? baseSmokeColor }),

        // Fading behavior?
      ]
    );
    super(index, {
      color: varyColor(color ?? smokeColor),
      stateOfMatter: "gas",
      //   airy: true,

      behaviours,
    });
  }
}
