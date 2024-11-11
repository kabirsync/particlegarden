import { Color } from "three";
import { Grid } from "../Grid";
import { Behaviour } from "@/components/simulation/behaviours/Behaviour";
import {
  MaterialMapping,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import Particle from "@/components/simulation/materials/Particle";
import Cloner from "@/components/simulation/materials/Cloner";

export class Cloneable extends Behaviour {
  material: MaterialOptionsType;
  fuel?: number;
  chanceToCatch?: number;
  color: Color;
  maxSpeed?: number;
  acceleration?: number;
  initialVelocity?: number;
  diagonalSpread?: number;
  horizontalSpread?: number;
  verticalSpread?: number;

  constructor({
    material,
    color,
    fuel,
    chanceToCatch,
    maxSpeed,
    acceleration,
    initialVelocity,
    diagonalSpread,
    horizontalSpread,
    verticalSpread,
  }: {
    material: MaterialOptionsType;
    color: Color;
    fuel?: number;
    chanceToCatch?: number;
    maxSpeed?: number;
    acceleration?: number;
    initialVelocity?: number;
    diagonalSpread?: number;
    horizontalSpread?: number;
    verticalSpread?: number;
  }) {
    super();
    this.color = color;
    this.material = material;
    this.fuel = fuel;
    this.chanceToCatch = chanceToCatch;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.initialVelocity = initialVelocity;
    this.diagonalSpread = diagonalSpread;
    this.verticalSpread = verticalSpread;
    this.horizontalSpread = horizontalSpread;
  }

  getEmptyNeighbour(particle: Particle, grid: Grid) {
    const aboveLeftIndex = particle.index - grid.columns - 1;
    const aboveIndex = particle.index - grid.columns;
    const aboveRightIndex = particle.index - grid.columns + 1;
    const leftIndex = particle.index - 1;
    const rightIndex = particle.index + 1;
    const belowLeftIndex = particle.index + grid.columns - 1;
    const belowIndex = particle.index + grid.columns;
    const belowRightIndex = particle.index + grid.columns + 1;

    // Array of neighbor indices
    const neighborIndices = [
      aboveLeftIndex,
      aboveIndex,
      aboveRightIndex,
      leftIndex,
      rightIndex,
      belowLeftIndex,
      belowIndex,
      belowRightIndex,
    ];

    // Filter to get only the empty neighbors
    const emptyNeighbors = neighborIndices.filter((index) =>
      grid.isEmpty(index)
    );

    // If there are empty neighbors, return a random one
    if (emptyNeighbors.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyNeighbors.length);
      return emptyNeighbors[randomIndex];
    }

    // If no empty neighbors, return undefined (or an alternative)
    return undefined;
  }

  update(particle: Particle, grid: Grid) {
    if (Math.random() < 0.5) {
      return;
    }
    const aboveIndex = particle.index - grid.columns;
    const leftIndex = particle.index - 1;
    const rightIndex = particle.index + 1;
    const belowIndex = particle.index + grid.columns;

    const emptyNeighbour = this.getEmptyNeighbour(particle, grid);
    if (grid.grid[belowIndex] instanceof Cloner && emptyNeighbour) {
      const MaterialClass = MaterialMapping[this.material];
      grid.setIndex(
        emptyNeighbour,

        new MaterialClass(aboveIndex, {
          color: this.color,
          fuel: this.fuel,
          chanceToCatch: this.chanceToCatch,
          maxSpeed: this.maxSpeed,
          acceleration: this.acceleration,
          initialVelocity: this.initialVelocity,
          diagonalSpread: this.diagonalSpread,
          verticalSpread: this.verticalSpread,
          horizontalSpread: this.horizontalSpread,
        })
      );
    } else if (grid.grid[aboveIndex] instanceof Cloner && emptyNeighbour) {
      const MaterialClass = MaterialMapping[this.material];
      grid.setIndex(
        emptyNeighbour,

        new MaterialClass(belowIndex, {
          color: this.color,
          fuel: this.fuel,
          chanceToCatch: this.chanceToCatch,
          maxSpeed: this.maxSpeed,
          acceleration: this.acceleration,
          initialVelocity: this.initialVelocity,
          diagonalSpread: this.diagonalSpread,
          verticalSpread: this.verticalSpread,
          horizontalSpread: this.horizontalSpread,
        })
      );
    } else if (grid.grid[leftIndex] instanceof Cloner && emptyNeighbour) {
      const MaterialClass = MaterialMapping[this.material];
      grid.setIndex(
        emptyNeighbour,

        new MaterialClass(rightIndex, {
          color: this.color,
          fuel: this.fuel,
          chanceToCatch: this.chanceToCatch,
          maxSpeed: this.maxSpeed,
          acceleration: this.acceleration,
          initialVelocity: this.initialVelocity,
          diagonalSpread: this.diagonalSpread,
          verticalSpread: this.verticalSpread,
          horizontalSpread: this.horizontalSpread,
        })
      );
    } else if (grid.grid[rightIndex] instanceof Cloner && emptyNeighbour) {
      const MaterialClass = MaterialMapping[this.material];
      grid.setIndex(
        emptyNeighbour,
        new MaterialClass(leftIndex, {
          color: this.color,
          fuel: this.fuel,
          chanceToCatch: this.chanceToCatch,
          maxSpeed: this.maxSpeed,
          acceleration: this.acceleration,
          initialVelocity: this.initialVelocity,
          diagonalSpread: this.diagonalSpread,
          verticalSpread: this.verticalSpread,
          horizontalSpread: this.horizontalSpread,
        })
      );
    }
  }
}
