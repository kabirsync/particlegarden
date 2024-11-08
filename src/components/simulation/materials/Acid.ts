import { MovesVerticalAcid } from "@/components/simulation/behaviours/MovesVerticalAcid";
import Particle from "@/components/simulation/materials/Particle";
import { acidColor } from "@/lib/constants";
import { Color } from "three";

export class Acid extends Particle {
  constructor(index: number, { color = acidColor }: { color?: Color }) {
    super(index, {
      color: color,
      //   liquid: true,
      stateOfMatter: "liquid",
      behaviours: [
        new MovesVerticalAcid({
          maxSpeed: 3,
          acceleration: 0.2,
          initialVelocity: 0.5,
        }),
        // new Cloneable({ material: "Acid", color: color ?? baseAcidColor }),
      ],
    });
  }
}
