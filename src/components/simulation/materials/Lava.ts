// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
import { LavaMovement } from "@/components/simulation/behaviours/LavaMovement";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import Particle from "@/components/simulation/materials/Particle";
import {
  lavaAcceleration,
  lavaColor,
  lavaDiagonalSpread,
  lavaFuel,
  lavaHorizontalSpread,
  lavaInitialVelocity,
  lavalExtinguishMaterial,
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
  extinguishMaterial?: MaterialOptionsType;
};

class Lava extends Particle {
  extinguishMaterial: MaterialOptionsType;
  smokeColor: Color;

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
      life = lavaFuel,
      smokeColor = lavaSmokeColor,
      extinguishMaterial = lavalExtinguishMaterial,
    }: LavaProps
  ) {
    super(index, {
      name: "Lava",
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
    this.smokeColor = smokeColor;

    this.extinguishMaterial = extinguishMaterial;
  }
}

export default Lava;
