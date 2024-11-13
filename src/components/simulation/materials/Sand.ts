import { varyColor } from "@/lib/colors";
// import Particle from "@/components/simulation/materials/Particle";
import { Color } from "three";
import { MovesVerticalSolid } from "@/components/simulation/behaviours/MovesVerticalSolid";
import { sandColor } from "@/lib/constants";
import Particle2 from "@/components/simulation/materials/Particle2";
import { SandMovement } from "@/components/simulation/behaviours/SandMovement";
// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";

type SandProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
};

class Sand extends Particle2 {
  constructor(
    index: number,
    {
      color = sandColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
    }: SandProps
  ) {
    super(index, {
      color: varyColor(color),
      stateOfMatter: "solid",
      behaviour: new SandMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
      }),
    });
  }
}

export default Sand;
