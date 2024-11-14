import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { woodColor } from "@/lib/constants";
import { Color } from "three";

type WoodProps = {
  color?: Color;
  fuel?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

class Wood extends Particle {
  constructor(index: number, { color = woodColor }: WoodProps) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
    });
  }
}

export default Wood;
