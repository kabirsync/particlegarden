// import { sandColor } from "@/lib/colors";

import { Color } from "three";

export const sandColor = new Color("#dcb159");
export const woodColor = new Color("#332211");
export const waterColor = new Color("#416bdf");
export const smokeColor = new Color("#4C4A4D");
export const fireColor = new Color("#e34f0f");
export const fireColors = [
  new Color("#541e1e"),
  new Color("#ff1f1f"),
  new Color("#ea5a00"),
  new Color("#ff6900"),
  new Color("#eecc09"),
];
export const oilColor = new Color("#2C2416");
export const gasColor = new Color("#FF8585");
export const lavaColor = new Color("#e34f0f");
export const stoneColor = new Color("#4C4A4D");
export const acidColor = new Color("#00FF00");

export const backgroundColorDark = new Color("#09090b");
export const backgroundColorLight = new Color("#f4f4f5");

// Fix - Particle.ts
export const transparentColor = new Color("#09090b");

export const defaultIsPlaying = true;
export const defaultFPS = 0;
export const defaultParticleSize = 4;
export const defaultMaterialColor = sandColor;
export const defaultStrokeSize = 10;
export const defaultMaxSpeed = 10;
export const defaultInitialVelocity = 0.1;
export const defaultAcceleration = 0.5;
export const defaultSelecteMaterial = "Sand";
export const defaultDiagonalSpread = 3;
export const defaultVerticalSpread = 1;
export const defaultHorizontalSpread = 3;

// Sand
export const sandDirection = 1;
export const sandMaterialColor = sandColor;
export const sandStrokeSize = 10;
export const sandMaxSpeed = 10;
export const sandInitialVelocity = 0.1;
export const sandAcceleration = 0.5;
export const sandDiagonalSpread = 3;
export const sandVerticalSpread = 1;
export const sandHorizontalSpread = 3;

// Smoke
export const smokeMaterialColor = smokeColor;
export const smokeStrokeSize = 10;
export const smokeMaxSpeed = 0.5;
export const smokeInitialVelocity = -0.1;
export const smokeAcceleration = -0.5;
export const smokeDiagonalSpread = 3;
export const smokeVerticalSpread = 1;
export const smokeHorizontalSpread = 3;

// Water
export const waterMaterialColor = waterColor;
export const waterStrokeSize = 10;
export const waterMaxSpeed = 10;
export const waterInitialVelocity = 0.1;
export const waterAcceleration = 0.5;
export const waterDiagonalSpread = 3;
export const waterVerticalSpread = 1;
export const waterHorizontalSpread = 3;

// Acid
export const acidMaterialColor = acidColor;
export const acidStrokeSize = 10;
export const acidMaxSpeed = 4;
export const acidInitialVelocity = 0.1;
export const acidAcceleration = 0.5;
export const acidDiagonalSpread = 3;
export const acidVerticalSpread = 1;
export const acidHorizontalSpread = 3;

// Lava
export const lavaMaterialColor = lavaColor;
export const lavaStrokeSize = 10;
export const lavaMaxSpeed = 4;
export const lavaInitialVelocity = 0.1;
export const lavaAcceleration = 0.5;
export const lavaDiagonalSpread = 3;
export const lavaVerticalSpread = 1;
export const lavaHorizontalSpread = 3;

// Oil
export const oilMaterialColor = oilColor;
export const oilStrokeSize = 10;
export const oilMaxSpeed = 4;
export const oilInitialVelocity = 0.1;
export const oilAcceleration = 0.5;
export const oilDiagonalSpread = 3;
export const oilVerticalSpread = 1;
export const oilHorizontalSpread = 3;

// Gas
export const gasMaterialColor = gasColor;
export const gasStrokeSize = 10;
export const gasMaxSpeed = 0.5;
export const gasInitialVelocity = -0.1;
export const gasAcceleration = -0.5;
export const gasDiagonalSpread = 3;
export const gasVerticalSpread = 1;
export const gasHorizontalSpread = 3;
