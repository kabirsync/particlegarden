import { Grid } from "@/components/simulation/Grid";
import { Fire } from "@/components/simulation/materials/Fire";
import Lava from "@/components/simulation/materials/Lava";
import Particle from "@/components/simulation/materials/Particle";
import Wood from "@/components/simulation/materials/Wood";
import { fireColor, fireColors, fireLife } from "@/lib/constants";
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
};

export class StaticFire extends Particle {
  index: number;
  life: number;
  remainingLife: number;

  constructor(
    index: number,
    { life = fireLife, color = fireColor }: StaticFireProps
  ) {
    super(index, {
      color,
      stateOfMatter: "solid",
    });
    this.index = index;
    this.life = life;
    this.remainingLife = life - life * Math.random();
  }

  update(grid: Grid): void {
    const neighbourTop = this.index - grid.columns;
    const neighbourRight = this.index + 1;
    const neighbourLeft = this.index - 1;
    const neighbourBottom = this.index + grid.columns;

    if (Math.random() < 0.01 && grid.grid[neighbourTop] instanceof Wood) {
      grid.setIndex(
        neighbourTop,
        new StaticFire(neighbourTop, { life: this.life })
      );
    }
    if (Math.random() < 0.01 && grid.grid[neighbourRight] instanceof Wood) {
      grid.setIndex(
        neighbourRight,
        new StaticFire(neighbourRight, { life: this.life })
      );
    }
    if (Math.random() < 0.01 && grid.grid[neighbourLeft] instanceof Wood) {
      grid.setIndex(
        neighbourLeft,
        new StaticFire(neighbourLeft, { life: this.life })
      );
    }
    if (Math.random() < 0.01 && grid.grid[neighbourBottom] instanceof Wood) {
      grid.setIndex(
        neighbourBottom,
        new StaticFire(neighbourBottom, { life: this.life })
      );
    }
    if (this.remainingLife < 0) {
      if (Math.random() < 0.99) {
        const flame = new Fire(this.index, {});
        grid.setIndex(this.index, flame);
      } else {
        const lava = new Lava(this.index, {});
        grid.setIndex(this.index, lava);
      }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    this.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }
}
