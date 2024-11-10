import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import {
  defaultDiagonalSpread,
  defaultFPS,
  defaultHorizontalSpread,
  defaultIsPlaying,
  defaultMaterialColor,
  defaultParticleSize,
  defaultSelecteMaterial,
  defaultStrokeSize,
  defaultVerticalSpread,
  sandAcceleration,
  sandDirection,
  sandInitialVelocity,
  sandMaxSpeed,
} from "@/lib/constants";
import { atom } from "jotai";

// --------- Engine Options ---------

export const isPlayingAtom = atom(defaultIsPlaying);
export const FPSAtom = atom(defaultFPS);
export const particleSizeAtom = atom(defaultParticleSize);

// --------- Material Options ---------

export const selectedMaterialAtom = atom<MaterialOptionsType>(
  defaultSelecteMaterial
);

// --------- Stroke Options ---------

export const materialColorAtom = atom(defaultMaterialColor);
export const strokeSizeRefAtom = atom(() => ({ current: defaultStrokeSize }));
export const materialColorRefAtom = atom(() => ({
  current: defaultMaterialColor,
}));

// --------- Moves Vertical Options ---------

export const maxSpeedRefAtom = atom(() => ({ current: sandMaxSpeed }));
export const initialVelocityRefAtom = atom(() => ({
  current: sandInitialVelocity,
}));
export const accelerationRefAtom = atom(() => ({
  current: sandAcceleration,
}));

export const maxSpeedAtom = atom(sandMaxSpeed);
export const initialVelocityAtom = atom(sandInitialVelocity);
export const accelerationAtom = atom(sandAcceleration);

export const gravityDirectionAtom = atom(sandDirection);

// --------- Moves Vertical Liquid Options ---------

export const diagonalSpreadRefAtom = atom(() => ({
  current: defaultDiagonalSpread,
}));
export const verticalSpreadRefAtom = atom(() => ({
  current: defaultVerticalSpread,
}));
export const horizontalSpreadRefAtom = atom(() => ({
  current: defaultHorizontalSpread,
}));

// --------- Limited Life Options ---------
