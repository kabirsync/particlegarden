import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import {
  woodChanceToCatch,
  woodChanceToMelt,
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
  _skipColorVariation?: boolean; // Add this
};

class Wood extends Particle {
  life: number;
  chanceToCatch: number;
  chanceToMelt: number;
  smokeColor: Color;
  burningMaterial: "StaticFire";

  constructor(
    index: number,
    {
      color = woodColor,
      life = woodFuel,
      chanceToCatch = woodChanceToCatch,
      chanceToMelt = woodChanceToMelt,
      smokeColor = woodSmokeColor,
      _skipColorVariation = false,
    }: WoodProps
  ) {
    super(index, {
      name: "Wood",
      color: _skipColorVariation ? color : varyColor(color),
      stateOfMatter: "solid",
    });

    this.life = life;
    this.chanceToCatch = chanceToCatch;
    this.chanceToMelt = chanceToMelt;
    this.smokeColor = smokeColor;
    this.burningMaterial = "StaticFire";
  }
}

export default Wood;
