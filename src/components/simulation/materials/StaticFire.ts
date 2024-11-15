import { Grid } from "@/components/simulation/Grid";
import { Fire } from "@/components/simulation/materials/Fire";
import Lava from "@/components/simulation/materials/Lava";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import Particle from "@/components/simulation/materials/Particle";
import Wood from "@/components/simulation/materials/Wood";
import {
  fireColor,
  fireColors,
  fireExtinguishMaterial,
  fireLife,
  fireSmokeColor,
} from "@/lib/constants";
import { Color } from "three";

type StaticFireProps = {
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

export class StaticFire extends Particle {
  index: number;
  life: number;
  remainingLife: number;
  smokeColor: Color;
  extinguishMaterial: MaterialOptionsType;

  constructor(
    index: number,
    {
      life = fireLife,
      color = fireColor,
      smokeColor = fireSmokeColor,
      extinguishMaterial = fireExtinguishMaterial,
    }: StaticFireProps
  ) {
    super(index, {
      color,
      stateOfMatter: "solid",
    });
    this.smokeColor = smokeColor;
    this.index = index;
    this.life = life;
    this.remainingLife = life - life * Math.random();
    this.extinguishMaterial = extinguishMaterial;
  }
  canSetFireTo(particle: Particle): particle is Wood {
    return particle instanceof Wood;
  }

  update(grid: Grid): void {
    const neighbourTop = this.index - grid.columns;
    const neighbourRight = this.index + 1;
    const neighbourLeft = this.index - 1;
    const neighbourBottom = this.index + grid.columns;

    const neighbourTopParticle = grid.grid[neighbourTop];

    const neighbourRightParticle = grid.grid[neighbourRight];
    const neighbourLeftParticle = grid.grid[neighbourLeft];
    const neighbourBottomParticle = grid.grid[neighbourBottom];

    if (this.canSetFireTo(neighbourTopParticle)) {
      if (Math.random() < neighbourTopParticle.chanceToCatch) {
        grid.setIndex(
          neighbourTop,
          new StaticFire(neighbourTop, {
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
    }
    if (this.canSetFireTo(neighbourLeftParticle)) {
      if (Math.random() < neighbourLeftParticle.chanceToCatch) {
        grid.setIndex(
          neighbourLeft,
          new StaticFire(neighbourLeft, {
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
    }
    if (this.canSetFireTo(neighbourRightParticle)) {
      if (Math.random() < neighbourRightParticle.chanceToCatch) {
        grid.setIndex(
          neighbourRight,
          new StaticFire(neighbourRight, {
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
    }
    if (this.canSetFireTo(neighbourBottomParticle)) {
      if (Math.random() < neighbourBottomParticle.chanceToCatch) {
        grid.setIndex(
          neighbourBottom,
          new StaticFire(neighbourBottom, {
            life: this.life,
            smokeColor: this.smokeColor,
          })
        );
      }
    }
    if (this.remainingLife < 0) {
      if (Math.random() < 0.99) {
        const flame = new Fire(this.index, { smokeColor: this.smokeColor });
        grid.setIndex(this.index, flame);
      } else {
        const lava = new Lava(this.index, { smokeColor: this.smokeColor });
        grid.setIndex(this.index, lava);
      }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    this.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }
}
