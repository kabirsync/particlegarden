import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import {
  stoneChanceToCatch,
  stoneChanceToMelt,
  stoneColor,
  stoneSmokeColor,
} from "@/lib/constants";

import { Color } from "three";

type StoneProps = {
  color?: Color;
  chanceToCatch?: number;
  chanceToMelt?: number;
  smokeColor?: Color;
};

class Stone extends Particle {
  chanceToCatch: number;
  chanceToMelt: number;
  smokeColor: Color;

  constructor(
    index: number,
    {
      color = stoneColor,
      chanceToCatch = stoneChanceToCatch,
      chanceToMelt = stoneChanceToMelt,
      smokeColor = stoneSmokeColor,
    }: StoneProps
  ) {
    super(index, {
      name: "Stone",
      color: varyColor(color),
      stateOfMatter: "solid",
    });
    this.chanceToCatch = chanceToCatch;
    this.chanceToMelt = chanceToMelt;
    this.smokeColor = smokeColor;
  }
}

export default Stone;
