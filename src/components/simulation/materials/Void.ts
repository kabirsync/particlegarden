import Particle from "@/components/simulation/materials/Particle";
import { voidColor } from "@/lib/constants";
import { Color } from "three";

type VoidProps = {
  color?: Color;
};

class Void extends Particle {
  constructor(index: number, { color = voidColor }: VoidProps) {
    super(index, {
      color: color,
      stateOfMatter: "solid",
      behaviours: [],
    });
  }
}

export default Void;
