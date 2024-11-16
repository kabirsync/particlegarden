import { varyColor } from "@/lib/colors";
import { SandMovement } from "@/components/simulation/behaviours/SandMovement";
import Particle from "@/components/simulation/materials/Particle";
import { sandColor, woodSmokeColor } from "@/lib/constants";
import { Color } from "three";

type SandProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  chanceToMelt?: number;
  smokeColor?: Color;
};

class Sand extends Particle {
  chanceToMelt: number;
  smokeColor: Color;
  constructor(
    index: number,
    {
      color = sandColor,
      maxSpeed = 10,
      acceleration = 0.5,
      initialVelocity = 0.1,
      chanceToMelt = 0.01,
      smokeColor = woodSmokeColor,
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
    this.chanceToMelt = chanceToMelt;
    this.smokeColor = smokeColor;
  }
}

export default Sand;
