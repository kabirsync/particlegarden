import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { woodColor, woodFuel } from "@/lib/constants";
import { Color } from "three";

type WoodProps = {
  color?: Color;
  life?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

class Wood extends Particle {
  life: number;
  constructor(
    index: number,
    { color = woodColor, life = woodFuel }: WoodProps
  ) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
    });

    this.life = life;
  }
}

export default Wood;
