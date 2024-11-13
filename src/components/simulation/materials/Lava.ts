// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
import { LavaMovement } from "@/components/simulation/behaviours/LavalMovement";
import Particle2 from "@/components/simulation/materials/Particle2";
import {
  lavaAcceleration,
  lavaColor,
  lavaDiagonalSpread,
  lavaFuel,
  lavaHorizontalSpread,
  lavaInitialVelocity,
  lavaMaxSpeed,
  lavaSmokeColor,
  lavaVerticalSpread,
} from "@/lib/constants";
import { Color } from "three";

type LavaProps = {
  color?: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  life?: number;
  smokeColor?: Color;
};

class Lava extends Particle2 {
  constructor(
    index: number,
    {
      color = lavaColor,
      maxSpeed = lavaMaxSpeed,
      acceleration = lavaAcceleration,
      initialVelocity = lavaInitialVelocity,
      diagonalSpread = lavaDiagonalSpread,
      verticalSpread = lavaVerticalSpread,
      horizontalSpread = lavaHorizontalSpread,
      life = lavaFuel + lavaFuel * Math.random(),
      smokeColor = lavaSmokeColor,
    }: LavaProps
  ) {
    super(index, {
      color,
      stateOfMatter: "liquid",
      behaviour: new LavaMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        life,
        smokeColor,
      }),
    });
  }
}

export default Lava;
