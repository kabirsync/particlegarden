import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { clonerColor } from "@/lib/constants";

import { Color } from "three";

type ClonerProps = {
  color?: Color;
  _skipColorVariation?: boolean;
};

class Cloner extends Particle {
  constructor(
    index: number,
    { color = clonerColor, _skipColorVariation = false }: ClonerProps
  ) {
    super(index, {
      name: "Cloner",
      color: _skipColorVariation ? color : varyColor(color),
      stateOfMatter: "solid",
    });
  }
}

export default Cloner;
