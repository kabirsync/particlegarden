import Sand from "./Sand";
import Empty from "./Empty";
import { Color } from "pixi.js";

type MaterialClasses = Sand | Empty;
export type MaterialOptions = "Sand" | "Empty";

type MaterialProps = { color?: Color };

export const MaterialMapping: Record<
  MaterialOptions,
  {
    new (index: number, { color }: MaterialProps): MaterialClasses;
  }
> = {
  Sand,
  Empty,
};
