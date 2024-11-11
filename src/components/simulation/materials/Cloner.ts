import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { clonerColor } from "@/lib/constants";
import { Color } from "three";

type ClonerProps = {
  color?: Color;
};

class Cloner extends Particle {
  constructor(index: number, { color = clonerColor }: ClonerProps) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
      behaviours: [],
    });
  }
}

export default Cloner;
