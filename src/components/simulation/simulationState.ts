import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import {
  defaultAcceleration,
  defaultDiagonalSpread,
  defaultFPS,
  defaultHorizontalSpread,
  defaultInitialVelocity,
  defaultIsPlaying,
  defaultMaterialColor,
  defaultMaxSpeed,
  defaultParticleSize,
  defaultSelecteMaterial,
  defaultStrokeSize,
  defaultVerticalSpread,
} from "@/lib/constants";
import { atom } from "jotai";

export const isPlayingAtom = atom(defaultIsPlaying);
export const FPSAtom = atom(defaultFPS);
export const particleSizeAtom = atom(defaultParticleSize);

export const materialColorRefAtom = atom(() => ({
  current: defaultMaterialColor,
}));

export const materialColorAtom = atom(defaultMaterialColor);

export const strokeSizeRefAtom = atom(() => ({ current: defaultStrokeSize }));
export const maxSpeedRefAtom = atom(() => ({ current: defaultMaxSpeed }));
export const initialVelocityRefAtom = atom(() => ({
  current: defaultInitialVelocity,
}));
export const accelerationRefAtom = atom(() => ({
  current: defaultAcceleration,
}));
export const selectedMaterialAtom = atom<MaterialOptionsType>(
  defaultSelecteMaterial
);
export const diagonalSpreadRefAtom = atom(() => ({
  current: defaultDiagonalSpread,
}));
export const verticalSpreadRefAtom = atom(() => ({
  current: defaultVerticalSpread,
}));
export const horizontalSpreadRefAtom = atom(() => ({
  current: defaultHorizontalSpread,
}));
