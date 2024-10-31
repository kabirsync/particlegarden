import { Grid } from "@/components/simulation/Grid";
import Particle, { Params } from "@/components/simulation/materials/Particle";

export class Behaviour {
  update(particle: Particle, grid: Grid, params: Params) {
    console.log({ particle, grid, params });
  }
}
