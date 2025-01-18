import { Grid } from "@/components/simulation/Grid";
import { Fire } from "@/components/simulation/materials/Fire";
import Gas from "@/components/simulation/materials/Gas";
import { LiquidFire } from "@/components/simulation/materials/LiquidFire";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import Oil from "@/components/simulation/materials/Oil";
import Particle from "@/components/simulation/materials/Particle";
import Wood from "@/components/simulation/materials/Wood";
import { varyColor } from "@/lib/colors";
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
  _skipColorVariation?: boolean;
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
      _skipColorVariation = false,
    }: StaticFireProps
  ) {
    super(index, {
      name: "StaticFire",
      color: _skipColorVariation ? color : varyColor(color),
      stateOfMatter: "solid",
    });
    this.smokeColor = smokeColor;
    this.index = index;
    this.life = life;
    this.remainingLife = life - life * Math.random();
    this.extinguishMaterial = extinguishMaterial;
  }
  canSetFireTo(particle: Particle): particle is Wood | Oil | Gas {
    return (
      particle instanceof Wood ||
      particle instanceof Oil ||
      particle instanceof Gas
    );
  }

  update(grid: Grid): void {
    const i = this.index;
    const row = Math.floor(i / grid.columns);

    const neighbourTop = this.index - grid.columns;
    const neighbourRight = this.index + 1;
    const neighbourLeft = this.index - 1;
    const neighbourBottom = this.index + grid.columns;
    const neighbourLeftRow = Math.floor(neighbourLeft / grid.columns);
    const neighbourRightRow = Math.floor(neighbourRight / grid.columns);

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

    if (
      this.canSetFireTo(neighbourLeftParticle) &&
      neighbourLeft < this.index &&
      neighbourLeftRow === row
    ) {
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
    if (
      this.canSetFireTo(neighbourRightParticle) &&
      neighbourRight > this.index &&
      neighbourRightRow === row
    ) {
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
        const liquidFire = new LiquidFire(this.index, {
          smokeColor: this.smokeColor,
        });
        grid.setIndex(this.index, liquidFire);
      }
    }
    this.remainingLife = Math.floor(this.remainingLife - 1);

    this.color = fireColors[Math.round(Math.random() * fireColors.length)];
  }
}
