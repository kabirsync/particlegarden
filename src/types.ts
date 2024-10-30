import type Empty from "@/simulations/Empty";
import type Sand from "@/simulations/Sand";

export type Dimension = {
  width: number;
  height: number;
};

export type Materials = Empty | Sand;
