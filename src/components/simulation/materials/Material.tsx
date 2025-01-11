import {
  BrickWall,
  Circle,
  Cloud,
  Copy,
  Droplet,
  Flame,
  Grip,
  Shell,
  TreePine,
} from "lucide-react";
import { Color } from "three";
import Empty from "./Empty";
import Sand from "./Sand";
import Lava from "@/components/simulation/materials/Lava";
import { Smoke } from "@/components/simulation/materials/Smoke";
import Wood from "@/components/simulation/materials/Wood";
import { Fire } from "@/components/simulation/materials/Fire";
import Water from "@/components/simulation/materials/Water";
import Stone from "@/components/simulation/materials/Stone";
import Oil from "@/components/simulation/materials/Oil";
import { LiquidFire } from "@/components/simulation/materials/LiquidFire";
import { StaticFire } from "@/components/simulation/materials/StaticFire";
import Gas from "@/components/simulation/materials/Gas";
import Void from "@/components/simulation/materials/Void";
import Cloner from "@/components/simulation/materials/Cloner";
import { Acid } from "@/components/simulation/materials/Acid";
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
};

export type SelectableMaterials = Exclude<
  MaterialOptionsType,
  "StaticFire" | "LiquidFire"
>;

export const getMaterialIcon = (material: MaterialOptionsType) => {
  switch (material) {
    case "Empty":
      return <Circle className="h-3 w-3" />;
    case "Sand":
      return <Grip className="h-3 w-3 text-yellow-600 fill-yellow-600" />;
    case "Wood":
      return <TreePine className="h-3 w-3 text-green-600 fill-green-600" />;
    case "Water":
      return <Droplet className="h-3 w-3 text-blue-500 fill-blue-500" />;
    case "Smoke":
      return <Cloud className="h-3 w-3 text-zinc-500 fill-zinc-500" />;
    case "Fire":
      return <Flame className="h-3 w-3 text-red-500 fill-red-500" />;
    case "Oil":
      return <Droplet className="h-3 w-3 text-amber-950 fill-amber-950" />;
    case "Gas":
      return <Flame className="h-3 w-3 text-amber-100 fill-amber-100" />;
    case "Lava":
      return <Droplet className="h-3 w-3 text-red-500 fill-red-900" />;
    case "Stone":
      return <BrickWall className="h-3 w-3 text-zinc-500 fill-zinc-700" />;
    case "Acid":
      return <Droplet className="h-3 w-3 text-green-500 fill-green-900" />;
    case "Cloner":
      return <Copy className="h-3 w-3 text-red-300" />;
    case "Void":
      return <Shell className="h-3 w-3 text-purple-950 fill-zinc-950" />;
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
