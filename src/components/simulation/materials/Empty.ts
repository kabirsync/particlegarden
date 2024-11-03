import { transparentColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";

class Empty extends Particle {
  constructor(index: number) {
    super(index, { color: transparentColor, stateOfMatter: "empty" });
  }
}

export default Empty;
