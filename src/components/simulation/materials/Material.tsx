import Water from "@/components/simulation/materials/Water";
import Wood from "@/components/simulation/materials/Wood";
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
import { Smoke } from "@/components/simulation/materials/Smoke";
import { Fire } from "@/components/simulation/materials/Fire";
import Oil from "@/components/simulation/materials/Oil";
import Gas from "@/components/simulation/materials/Gas";
import Lava from "@/components/simulation/materials/Lava";
import Stone from "@/components/simulation/materials/Stone";
import { Acid } from "@/components/simulation/materials/Acid";
import Cloner from "@/components/simulation/materials/Cloner";
import Void from "@/components/simulation/materials/Void";

// New materials must be added here and at [3] points

// ------- Make sure to add case to handleSelectMaterialChange -----

// [1] New materials must be added here
type MaterialClasses =
  | Empty
  | Sand
  | Wood
  | Water
  | Smoke
  | Fire
  | Oil
  | Gas
  | Lava
  | Stone
  | Acid
  | Cloner
  | Void;

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
  fuel?: number;
  chanceToCatch?: number;
  smokeColor?: Color;
};

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
      return <Copy className="h-3 w-3 text-red-200 fill-red-200" />;
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
        fuel,
        chanceToCatch,
        smokeColor,
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
  Gas,
  Lava,
  Stone,
  Acid,
  Cloner,
  Void,
};
