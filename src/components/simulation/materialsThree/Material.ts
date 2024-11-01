import Sand from "./Sand";
import Empty from "./Empty";
import { Color } from "three";
import EmptyPreview from "@/components/simulation/materialsThree/EmptyPreview";

// New materials must be added here and at [3] points

// [1] New materials must be added here
type MaterialClasses = Sand | Empty | EmptyPreview;

// [2] New materials must be added here

export const materialOptions = ["Sand", "Empty"] as const;
export type MaterialOptionsType =
  | (typeof materialOptions)[number]
  | "EmptyPreview";

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
  EmptyPreview,
};
