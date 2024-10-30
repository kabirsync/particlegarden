import Sand from "./Sand";
import Empty from "./Empty";
import { Color } from "pixi.js";

// New materials must be added here and at [3] points

// [1] New materials must be added here
type MaterialClasses = Sand | Empty;

// [2] New materials must be added here

export const materialOptions = ["Sand", "Empty"] as const;
export type MaterialOptionsType = (typeof materialOptions)[number];

type MaterialProps = { color?: Color };

export const MaterialMapping: Record<
  MaterialOptionsType,
  {
    new (index: number, { color }: MaterialProps): MaterialClasses;
  }
> = {
  // [3] New materials must be added here
  Sand,
  Empty,
};
