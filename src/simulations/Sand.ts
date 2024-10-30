import { sandColor } from "@/lib/colors";
import Particle from "@/simulations/Particle";

class Sand extends Particle {
  constructor(index: number) {
    super(index, { color: sandColor });
  }
}

export default Sand;
