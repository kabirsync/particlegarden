// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
// import { Flammable } from "@/components/simulation/behaviours/Flammable";
// import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
import { FireMovement } from "@/components/simulation/behaviours/FireMovement";
// import { LavaMovement } from "@/components/simulation/behaviours/LavaMovement";
import Particle from "@/components/simulation/materials/Particle";
import {
  fireAcceleration,
  fireColor,
  fireDiagonalSpread,
  fireHorizontalSpread,
  fireInitialVelocity,
  fireLife,
  fireMaxSpeed,
  fireSmokeColor,
  fireVerticalSpread,
} from "@/lib/constants";
import { Color } from "three";

type FlameProps = {
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

export class Flame extends Particle {
  // static addProbability = 0.25;

  constructor(
    index: number,
    {
      color = fireColor,
      life = fireLife - fireLife * Math.random(),
      maxSpeed = fireMaxSpeed,
      acceleration = fireAcceleration,
      initialVelocity = fireInitialVelocity,
      diagonalSpread = fireDiagonalSpread,
      verticalSpread = fireVerticalSpread,
      horizontalSpread = fireHorizontalSpread,
      smokeColor = fireSmokeColor,
    }: FlameProps
  ) {
    super(index, {
      color,
      stateOfMatter: "gas",
      behaviour: new FireMovement({
        maxSpeed,
        acceleration,
        initialVelocity,
        diagonalSpread,
        verticalSpread,
        horizontalSpread,
        life,
        smokeColor,
      }),
      // behaviours: [
      //   // new Flammable({
      //   //   burning: true,
      //   //   fuel: life,
      //   //   chanceToCatch: 0,
      //   //   smokeColor,
      //   // }),
      //   new MovesVerticalWater({
      //     maxSpeed,
      //     acceleration,
      //     initialVelocity,
      //     diagonalSpread,
      //     verticalSpread,
      //     horizontalSpread,
      //   }),
      //   // new Cloneable({
      //   //   color,
      //   //   material: "Fire",
      //   //   maxSpeed,
      //   //   acceleration,
      //   //   initialVelocity,
      //   //   diagonalSpread,
      //   //   verticalSpread,
      //   //   horizontalSpread,
      //   //   fuel: life,
      //   //   smokeColor,
      //   // }),
      //   // new Destroyable(),
      // ],
    });
  }
}
