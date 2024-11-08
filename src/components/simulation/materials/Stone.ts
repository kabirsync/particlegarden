import Particle from "@/components/simulation/materials/Particle";
import { varyColor } from "@/lib/colors";
import { stoneColor } from "@/lib/constants";
import { Color } from "three";

type StoneProps = {
  color?: Color;
  fuel?: number;
  chanceToCatch?: number;
};

class Stone extends Particle {
  constructor(index: number, { color = stoneColor }: StoneProps) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
    });
  }
}

export default Stone;
