import EmptyPreview from "@/components/simulation/materials/EmptyPreview";
import Water from "@/components/simulation/materials/Water";
import Wood from "@/components/simulation/materials/Wood";
import { Circle, Droplet, Grip, TreePine } from "lucide-react";
import { Color } from "three";
import Empty from "./Empty";
import Sand from "./Sand";

// New materials must be added here and at [3] points

// ------- Make sure to add case to handleSelectMaterialChange -----

// [1] New materials must be added here
type MaterialClasses = Sand | Wood | Water | Empty | EmptyPreview;

// [2] New materials must be added here

export const materialOptions = ["Sand", "Wood", "Water", "Empty"] as const;
export type MaterialOptionsType =
  | (typeof materialOptions)[number]
  | "EmptyPreview";

type MaterialProps = {
  color?: Color;
  maxSpeed?: number;
  initialVelocity?: number;
  acceleration?: number;
};

export const getMaterialIcon = (material: MaterialOptionsType) => {
  switch (material) {
    case "Sand":
      return <Grip className="h-3 w-3 text-yellow-600" />;
    case "Wood":
      return <TreePine className="h-3 w-3 text-green-600" />;
    case "Water":
      return <Droplet className="h-3 w-3 text-blue-500" />;
    case "Empty":
      return <Circle className="h-3 w-3" />;
    // case "Fire":
    //   return <Leaf className="h-3 w-3 text-green-600" />;
    default:
      return null;
  }
};

export const MaterialMapping: Record<
  MaterialOptionsType,
  {
    new (
      index: number,
      { color, maxSpeed, initialVelocity, acceleration }: MaterialProps
    ): MaterialClasses;
  }
> = {
  // [3] New materials must be added here
  Sand,
  Wood,
  Water,
  Empty,
  EmptyPreview,
};
