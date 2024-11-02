import Particle from "@/components/simulation/materials/Particle";
import { varyColor, woodColor } from "@/lib/colors";
import { Color } from "three";

type WoodProps = {
  color?: Color;
};

class Wood extends Particle {
  constructor(
    index: number,
    {
      color = woodColor,
    }: //   maxVelocity = 10,
    //   acceleration = 0.5,
    //   initialVelocity = 0.1,
    WoodProps
  ) {
    super(index, {
      color: varyColor(color),
    });
  }
}

export default Wood;
