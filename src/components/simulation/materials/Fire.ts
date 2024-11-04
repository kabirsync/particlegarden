import { Flammable } from "@/components/simulation/behaviours/Flammable";
import Particle from "@/components/simulation/materials/Particle";
import { fireColor } from "@/lib/colors";
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
      ],
    });
  }
}
