import Particle from "@/components/simulation/materials/Particle";
import { transparentColor } from "@/lib/constants";

class Empty extends Particle {
  constructor(index: number) {
    super(index, { color: transparentColor, stateOfMatter: "empty" });
  }
}

export default Empty;
