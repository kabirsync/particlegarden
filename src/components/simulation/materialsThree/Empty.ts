import { transparentColor } from "@/lib/colorsThree";
import Particle from "@/components/simulation/materialsThree/Particle";

class Empty extends Particle {
  constructor(index: number) {
    super(index, { isEmpty: true, color: transparentColor });
  }
}

export default Empty;
