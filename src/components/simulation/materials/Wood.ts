import { Flammable } from "@/components/simulation/behaviours/Flammable";
import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { woodColor } from "@/lib/constants";
import { Color } from "three";

type WoodProps = {
  color?: Color;
  fuel?: number;
  chanceToCatch?: number;
};

class Wood extends Particle {
  constructor(
    index: number,
    {
      color = woodColor,
      fuel = 200 + 100 * Math.random(),
      chanceToCatch = 0.005,
    }: WoodProps
  ) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
      behaviours: [
        new Flammable({
          fuel,
          chanceToCatch,
        }),
      ],
    });
  }
}

export default Wood;
