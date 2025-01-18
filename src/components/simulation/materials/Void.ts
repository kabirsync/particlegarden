import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { voidColor } from "@/lib/constants";

import { Color } from "three";

type VoidProps = {
  color?: Color;
  _skipColorVariation?: boolean;
};

class Void extends Particle {
  constructor(
    index: number,
    { color = voidColor, _skipColorVariation = false }: VoidProps
  ) {
    super(index, {
      name: "Void",
      color: _skipColorVariation ? color : varyColor(color),
      stateOfMatter: "solid",
    });
  }
}

export default Void;
