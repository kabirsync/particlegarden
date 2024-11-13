// import { Cloneable } from "@/components/simulation/behaviours/Cloneable";
// import { Destroyable } from "@/components/simulation/behaviours/Destroyable";
// import { Flammable } from "@/components/simulation/behaviours/Flammable";
// import { MovesVerticalWater } from "@/components/simulation/behaviours/MovesVerticalWater";
// import { FireMovement } from "@/components/simulation/behaviours/FireMovement";
// import { LavaMovement } from "@/components/simulation/behaviours/LavaMovement";
import { Grid } from "@/components/simulation/Grid";
import { Flame } from "@/components/simulation/materials/Flame";
import Particle from "@/components/simulation/materials/Particle2";
import Wood from "@/components/simulation/materials/Wood";
import {
  // fireAcceleration,
  fireColor,
  fireColors,
  fireLife,
} from "@/lib/constants";
import { Color } from "three";

type FireProps = {
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

export class Fire extends Particle {
  // static addProbability = 0.25;
  remainingLife: number;
  index: number;

  constructor(
    index: number,

    {
      life = fireLife - fireLife * Math.random(),
      color = fireColor,
    }: // maxSpeed = fireMaxSpeed,
    // acceleration = fireAcceleration,
    // initialVelocity = fireInitialVelocity,
    // diagonalSpread = fireDiagonalSpread,
    // verticalSpread = fireVerticalSpread,
    // horizontalSpread = fireHorizontalSpread,
    // smokeColor = fireSmokeColor,
    // life = fireLife - fireLife * Math.random(),

    FireProps
  ) {
    super(index, {
      color,
      stateOfMatter: "gas",
    });
    this.index = index;
    this.remainingLife = life;
  }

  update(grid: Grid): void {
    const neighbourTop = this.index - grid.columns;
    const neighbourRight = this.index + 1;
    const neighbourLeft = this.index - 1;
    const neighbourBottom = this.index + grid.columns;

    if (Math.random() < 0.01 && grid.grid[neighbourTop] instanceof Wood) {
      grid.setIndex(neighbourTop, new Fire(neighbourTop, {}));
    }
    if (Math.random() < 0.01 && grid.grid[neighbourRight] instanceof Wood) {
      grid.setIndex(neighbourRight, new Fire(neighbourRight, {}));
    }
    if (Math.random() < 0.01 && grid.grid[neighbourLeft] instanceof Wood) {
      grid.setIndex(neighbourLeft, new Fire(neighbourLeft, {}));
    }
    if (Math.random() < 0.01 && grid.grid[neighbourBottom] instanceof Wood) {
      grid.setIndex(neighbourBottom, new Fire(neighbourBottom, {}));
    }
    if (this.remainingLife < 0) {
      if (Math.random() < 1) {
        const flame = new Flame(this.index, {
          // burning: Math.random() < 0.1,
          // color: smokeColor,
        });
        grid.setIndex(this.index, flame);
      }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    this.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }
}
