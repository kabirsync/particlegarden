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
export const materialColorAtom = atom(() => ({
  current: defaultMaterialColor,
}));
export const strokeSizeAtom = atom(() => ({ current: defaultStrokeSize }));
export const maxSpeedAtom = atom(() => ({ current: defaultMaxSpeed }));
export const initialVelocityAtom = atom(() => ({
  current: defaultInitialVelocity,
}));
export const accelerationAtom = atom(() => ({ current: defaultAcceleration }));
export const selectedMaterialAtom = atom<MaterialOptionsType>(
  defaultSelecteMaterial
);
// export const materialColorAtom = atom(defaultMaterialColor);
export const diagonalSpreadAtom = atom(() => ({
  current: defaultDiagonalSpread,
}));
export const verticalSpreadAtom = atom(() => ({
  current: defaultVerticalSpread,
}));
export const horizontalSpreadAtom = atom(() => ({
  current: defaultHorizontalSpread,
}));
