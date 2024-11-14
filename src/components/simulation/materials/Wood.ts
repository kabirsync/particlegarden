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
  life?: number;
  chanceToCatch?: number;
  chanceToMelt?: number;
  smokeColor?: Color;
};

class Wood extends Particle {
  life: number;
  chanceToCatch: number;
  chanceToMelt: number;
  smokeColor: Color;

  constructor(
    index: number,
    {
      color = woodColor,
      life = woodFuel,
      chanceToCatch = woodChanceToCatch,
      chanceToMelt = 0.01,
      smokeColor = woodSmokeColor,
    }: WoodProps
  ) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
    });

    this.life = life;
    this.chanceToCatch = chanceToCatch;
    this.chanceToMelt = chanceToMelt;
    this.smokeColor = smokeColor;
  }
}

export default Wood;
