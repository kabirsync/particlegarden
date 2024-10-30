import { transparentColor } from "@/lib/colors";
import Particle from "@/simulations/Particle";

class Empty extends Particle {
  constructor(index: number) {
    super(index, { isEmpty: true, color: transparentColor });
  }
}

export default Empty;
