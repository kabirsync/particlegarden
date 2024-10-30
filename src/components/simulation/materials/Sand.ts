import { sandColor } from "@/lib/colors";
import Particle from "@/components/simulation/materials/Particle";
import { Color } from "pixi.js";

type SandProps = {
  color?: Color;
};

class Sand extends Particle {
  constructor(index: number, { color = sandColor }: SandProps) {
    super(index, { color });
  }
}

export default Sand;
