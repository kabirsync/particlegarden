import { Acid } from "@/components/simulation/materials/Acid";
import Cloner from "@/components/simulation/materials/Cloner";
import { Fire } from "@/components/simulation/materials/Fire";
import Gas from "@/components/simulation/materials/Gas";
import Lava from "@/components/simulation/materials/Lava";
import { LiquidFire } from "@/components/simulation/materials/LiquidFire";
import Oil from "@/components/simulation/materials/Oil";
import { Smoke } from "@/components/simulation/materials/Smoke";
import { StaticFire } from "@/components/simulation/materials/StaticFire";
import Stone from "@/components/simulation/materials/Stone";
import Void from "@/components/simulation/materials/Void";
import Water from "@/components/simulation/materials/Water";
import Wood from "@/components/simulation/materials/Wood";
import {
  acidAcceleration,
  acidColor,
  acidDiagonalSpread,
  acidHorizontalSpread,
  acidInitialVelocity,
  acidMaxSpeed,
  acidVerticalSpread,
  clonerColor,
  fireAcceleration,
  fireColor,
  fireDiagonalSpread,
  fireExtinguishMaterial,
  fireHorizontalSpread,
  fireInitialVelocity,
  fireLife,
  fireMaxSpeed,
  fireSmokeColor,
  fireVerticalSpread,
  gasAcceleration,
  gasChanceToCatch,
  gasColor,
  gasDiagonalSpread,
  gasHorizontalSpread,
  gasInitialVelocity,
  gasMaxSpeed,
  gasSmokeColor,
  gasVerticalSpread,
  lavaAcceleration,
  lavaColor,
  lavaDiagonalSpread,
  lavaExtinguishMaterial,
  lavaHorizontalSpread,
  lavaInitialVelocity,
  lavaMaxSpeed,
  lavaSmokeColor,
  lavaVerticalSpread,
  oilAcceleration,
  oilBurningMaterial,
  oilChanceToCatch,
  oilColor,
  oilDiagonalSpread,
  oilHorizontalSpread,
  oilInitialVelocity,
  oilMaxSpeed,
  oilSmokeColor,
  oilVerticalSpread,
  sandAcceleration,
  sandColor,
  sandInitialVelocity,
  sandMaxSpeed,
  smokeAcceleration,
  smokeColor,
  smokeDiagonalSpread,
  smokeHorizontalSpread,
  smokeInitialVelocity,
  smokeLife,
  smokeMaxSpeed,
  smokeVerticalSpread,
  stoneChanceToCatch,
  stoneChanceToMelt,
  stoneColor,
  stoneSmokeColor,
  transparentColor,
  voidColor,
  waterAcceleration,
  waterColor,
  waterDiagonalSpread,
  waterHorizontalSpread,
  waterInitialVelocity,
  waterMaxSpeed,
  waterVerticalSpread,
  woodChanceToCatch,
  woodChanceToMelt,
  woodColor,
  woodSmokeColor,
} from "@/lib/constants";
import { Circle } from "lucide-react";
import { Color } from "three";
import Empty from "./Empty";
import Sand from "./Sand";

export interface MaterialProperties {
  // Basic properties
  color?: Color;
  name?: string;
  stateOfMatter?: "solid" | "liquid" | "gas";

  // Movement properties
  maxSpeed?: number;
  initialVelocity?: number;
  acceleration?: number;
  gravityDirection?: number;

  // Spread properties
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;

  // Life properties
  life?: number;

  // Fire properties
  chanceToCatch?: number;
  chanceToMelt?: number;
  smokeColor?: Color;
  extinguishMaterial?: MaterialOptionsType;
  burningMaterial?: MaterialOptionsType;

  // Acid properties
  acidStrength?: number;

  // Internal properties
  _skipColorVariation?: boolean;
}

export type MaterialPropertyKey = keyof MaterialProperties;

// New materials must be added here and at [3] points

// ------- Make sure to add case to handleSelectMaterialChange -----

// [1] New materials must be added here
type MaterialClasses =
  | Empty
  | Sand
  | Lava
  | Fire
  | Smoke
  | Wood
  | Water
  | Stone
  | Oil
  | LiquidFire
  | StaticFire
  | Gas
  | Void
  | Cloner
  | Acid;

// [2] New materials must be added here

export const materialOptions = [
  "Empty",
  "Sand",
  "Wood",
  "Water",
  "Smoke",
  "Fire",
  "Oil",
  "Gas",
  "Lava",
  "Stone",
  "Acid",
  "Cloner",
  "Void",
  "LiquidFire",
  "StaticFire",
] as const;

export const selectableMaterialOptions = [
  "Empty",
  "Sand",
  "Wood",
  "Water",
  "Smoke",
  "Fire",
  "Oil",
  "Gas",
  "Lava",
  "Stone",
  "Void",
  "Cloner",
  "Acid",
] as const;
export type MaterialOptionsType = (typeof materialOptions)[number];

type MaterialProps = {
  color?: Color;
  maxSpeed?: number;
  initialVelocity?: number;
  acceleration?: number;
  diagonalSpread?: number;
  verticalSpread?: number;
  horizontalSpread?: number;
  life?: number;
  chanceToCatch?: number;
  chanceToMelt?: number;
  smokeColor?: Color;
  extinguishMaterial?: MaterialOptionsType;
  acidStrength?: number;
  _skipColorVariation?: boolean;
};

export type SelectableMaterials = Exclude<
  MaterialOptionsType,
  "StaticFire" | "LiquidFire"
>;

export const getMaterialIcon = (
  material: MaterialOptionsType,
  theme?: "light" | "dark"
) => {
  switch (material) {
    case "Empty":
      return <Circle className="h-3 w-3" />;
    case "Sand":
      return <img src="/icons/sand.png" alt="sand" className="h-5 w-5" />;
    case "Wood":
      return <img src="/icons/wood.png" alt="wood" className="h-5 w-5" />;
    case "Water":
      return <img src="/icons/water.png" alt="water" className="h-5 w-5" />;
    case "Smoke":
      return <img src="/icons/smoke.png" alt="smoke" className="h-5 w-5" />;
    case "Fire":
      return <img src="/icons/fire.png" alt="fire" className="h-5 w-5" />;
    case "Oil":
      return <img src="/icons/oil.png" alt="oil" className="h-5 w-5" />;
    case "Gas":
      return <img src="/icons/gas.png" alt="gas" className="h-5 w-5" />;
    case "Lava":
      return <img src="/icons/lava.png" alt="lava" className="h-5 w-5" />;
    case "Stone":
      return <img src="/icons/stone.png" alt="stone" className="h-5 w-5" />;
    case "Acid":
      return theme === "light" ? (
        <img src="/icons/acid-light.png" alt="acid" className="h-5 w-5" />
      ) : (
        <img src="/icons/acid.png" alt="acid" className="h-5 w-5" />
      );
    case "Cloner":
      return <img src="/icons/cloner.png" alt="cloner" className="h-5 w-5" />;
    case "Void":
      return <img src="/icons/void.png" alt="void" className="h-5 w-5" />;
    default:
      return null;
  }
};

export const MaterialMapping: Record<
  MaterialOptionsType,
  {
    new (
      index: number,
      {
        color,
        maxSpeed,
        initialVelocity,
        acceleration,
        life,
        chanceToCatch,
        chanceToMelt,
        smokeColor,
        extinguishMaterial,
        acidStrength,
        _skipColorVariation,
      }: MaterialProps
    ): MaterialClasses;
  }
> = {
  // [3] New materials must be added here
  Empty,
  Sand,
  Wood,
  Water,
  Smoke,
  Fire,
  Oil,
  StaticFire,
  Gas,
  Lava,
  Stone,
  LiquidFire,
  Acid,
  Cloner,
  Void,
};

export const materialConfigs: Record<SelectableMaterials, MaterialProperties> =
  {
    Sand: {
      color: sandColor,
      maxSpeed: sandMaxSpeed,
      acceleration: sandAcceleration,
      initialVelocity: sandInitialVelocity,
      stateOfMatter: "solid",
    },
    Acid: {
      color: acidColor,
      stateOfMatter: "liquid",
      acceleration: acidAcceleration,
      maxSpeed: acidMaxSpeed,
      initialVelocity: acidInitialVelocity,
      horizontalSpread: acidHorizontalSpread,
      verticalSpread: acidVerticalSpread,
      diagonalSpread: acidDiagonalSpread,
    },
    Wood: {
      color: woodColor,
      stateOfMatter: "solid",
      chanceToCatch: woodChanceToCatch,
      chanceToMelt: woodChanceToMelt,
      smokeColor: woodSmokeColor,
      _skipColorVariation: true,
    },
    Water: {
      color: waterColor,
      stateOfMatter: "liquid",
      acceleration: waterAcceleration,
      initialVelocity: waterInitialVelocity,
      maxSpeed: waterMaxSpeed,
      horizontalSpread: waterHorizontalSpread,
      verticalSpread: waterVerticalSpread,
      diagonalSpread: waterDiagonalSpread,
    },
    Smoke: {
      color: smokeColor,
      stateOfMatter: "gas",
      maxSpeed: smokeMaxSpeed,
      acceleration: smokeAcceleration,
      initialVelocity: smokeInitialVelocity,
      horizontalSpread: smokeHorizontalSpread,
      verticalSpread: smokeVerticalSpread,
      diagonalSpread: smokeDiagonalSpread,
      life: smokeLife,
    },
    Fire: {
      color: fireColor,
      stateOfMatter: "gas",
      maxSpeed: fireMaxSpeed,
      acceleration: fireAcceleration,
      initialVelocity: fireInitialVelocity,
      horizontalSpread: fireHorizontalSpread,
      verticalSpread: fireVerticalSpread,
      diagonalSpread: fireDiagonalSpread,
      life: fireLife,
      smokeColor: fireSmokeColor,
      extinguishMaterial: fireExtinguishMaterial,
    },
    Oil: {
      color: oilColor,
      stateOfMatter: "liquid",
      maxSpeed: oilMaxSpeed,
      acceleration: oilAcceleration,
      initialVelocity: oilInitialVelocity,
      horizontalSpread: oilHorizontalSpread,
      verticalSpread: oilVerticalSpread,
      diagonalSpread: oilDiagonalSpread,
      chanceToCatch: oilChanceToCatch,
      smokeColor: oilSmokeColor,
      burningMaterial: oilBurningMaterial,
    },
    Gas: {
      color: gasColor,
      stateOfMatter: "gas",
      maxSpeed: gasMaxSpeed,
      acceleration: gasAcceleration,
      initialVelocity: gasInitialVelocity,
      horizontalSpread: gasHorizontalSpread,
      verticalSpread: gasVerticalSpread,
      diagonalSpread: gasDiagonalSpread,
      chanceToCatch: gasChanceToCatch,
      smokeColor: gasSmokeColor,
    },
    Lava: {
      color: lavaColor,
      stateOfMatter: "liquid",
      maxSpeed: lavaMaxSpeed,
      acceleration: lavaAcceleration,
      initialVelocity: lavaInitialVelocity,
      horizontalSpread: lavaHorizontalSpread,
      verticalSpread: lavaVerticalSpread,
      diagonalSpread: lavaDiagonalSpread,
      smokeColor: lavaSmokeColor,
      extinguishMaterial: lavaExtinguishMaterial,
    },
    Stone: {
      color: stoneColor,
      stateOfMatter: "solid",
      chanceToCatch: stoneChanceToCatch,
      chanceToMelt: stoneChanceToMelt,
      smokeColor: stoneSmokeColor,
    },
    Void: {
      color: voidColor,
      stateOfMatter: "solid",
    },
    Cloner: {
      color: clonerColor,
      stateOfMatter: "solid",
    },
    Empty: {
      color: transparentColor,
    },
  };

// Helper function to get property for a material
export function getMaterialProperty<K extends MaterialPropertyKey>(
  material: SelectableMaterials,
  property: K
): MaterialProperties[K] | undefined {
  return materialConfigs[material]?.[property];
}
