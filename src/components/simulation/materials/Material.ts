import Sand from "./Sand";
import Empty from "./Empty";
import { Color } from "pixi.js";

// New items must be added here and at [3] points

// [1] New items must be added here
type MaterialClasses = Sand | Empty;

// [2] New items must be added here
export type MaterialOptions = "Sand" | "Empty";

type MaterialProps = { color?: Color };

export const MaterialMapping: Record<
  MaterialOptions,
  {
    new (index: number, { color }: MaterialProps): MaterialClasses;
  }
> = {
  // [3] New items must be added here
  Sand,
  Empty,
};
