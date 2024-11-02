import Sand from "./Sand";
import Empty from "./Empty";
import { Color } from "three";
import { Circle, Grip, TreePine } from "lucide-react";
import EmptyPreview from "@/components/simulation/materials/EmptyPreview";
import Wood from "@/components/simulation/materials/Wood";

// New materials must be added here and at [3] points

// [1] New materials must be added here
type MaterialClasses = Sand | Wood | Empty | EmptyPreview;

// [2] New materials must be added here

export const materialOptions = ["Sand", "Wood", "Empty"] as const;
export type MaterialOptionsType =
  | (typeof materialOptions)[number]
  | "EmptyPreview";

type MaterialProps = {
  color?: Color;
  maxVelocity?: number;
  initialVelocity?: number;
  acceleration?: number;
};

export const getMaterialIcon = (material: MaterialOptionsType) => {
  switch (material) {
    case "Sand":
      return <Grip className="h-3 w-3 text-yellow-600" />;
    case "Wood":
      return <TreePine className="h-3 w-3 text-green-600" />;
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
      { color, maxVelocity, initialVelocity, acceleration }: MaterialProps
    ): MaterialClasses;
  }
> = {
  // [3] New materials must be added here
  Sand,
  Wood,
  Empty,
  EmptyPreview,
};
