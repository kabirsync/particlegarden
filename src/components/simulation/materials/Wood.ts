import { Flammable } from "@/components/simulation/behaviours/Flammable";
import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import {
  woodChanceToCatch,
  woodColor,
  woodFuel,
  woodSmokeColor,
} from "@/lib/constants";
import { Color } from "three";

type WoodProps = {
  color?: Color;
  fuel?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

class Wood extends Particle {
  constructor(
    index: number,
    {
      color = woodColor,
      fuel = woodFuel + woodFuel * Math.random(),
      chanceToCatch = woodChanceToCatch,
      smokeColor = woodSmokeColor,
    }: WoodProps
  ) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
      behaviours: [
        new Flammable({
          fuel,
          chanceToCatch,
          smokeColor,
        }),
      ],
    });
  }
}

export default Wood;
