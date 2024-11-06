import { Flammable } from "@/components/simulation/behaviours/Flammable";
import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import Particle from "@/components/simulation/materials/Particle";
import { fireColor } from "@/lib/constants";
import { Color } from "three";

export class Fire extends Particle {
  static addProbability = 0.25;

  constructor(index: number, { color = fireColor }: { color?: Color }) {
    super(index, {
      color,
      stateOfMatter: "gas",
      behaviours: [
        new Flammable({
          burning: true,
        }),
        new MovesVerticalWater({
          maxSpeed: 0.4,
          acceleration: -0.5,
          initialVelocity: -0.1,
        }),
      ],
    });
  }
}
