import Particle from "@/components/simulation/materials/Particle";
import { varyColor, woodColor } from "@/lib/colors";
import { Color } from "three";

type WoodProps = {
  color?: Color;
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
