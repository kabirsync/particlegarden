import { sandColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";

class Sand extends Particle {
  constructor(index: number) {
    super(index, { color: sandColor });
  }
}

export default Sand;
