import { Grid } from "@/components/simulation/Grid";
import {
  MaterialOptionsType,
  SelectableMaterials,
} from "@/components/simulation/materials/Material";
import {
  acidDefaultStrength,
  defaultDiagonalSpread,
  defaultFPS,
  defaultHorizontalSpread,
  defaultIsPlaying,
  defaultMaterialColor,
  defaultParticleSize,
  defaultSelecteMaterial,
  defaultStrokeSize,
  defaultVerticalSpread,
  lavaExtinguishMaterial,
  oilBurningMaterial,
  sandAcceleration,
  sandDirection,
  sandInitialVelocity,
  sandMaxSpeed,
  smokeLife,
  woodChanceToCatch,
  woodFuel,
  woodSmokeColor,
} from "@/lib/constants";
import { atom } from "jotai";

// --------- Engine Options ---------

export const refreshAtom = atom(Date.now());
export const isPlayingAtom = atom(defaultIsPlaying);
export const FPSAtom = atom(defaultFPS);
export const particleSizeAtom = atom(defaultParticleSize);
export const gridRefAtom = atom<{ current: Grid | null }>(() => ({
  current: null,
}));

// --------- Material Options ---------

export const selectedMaterialAtom = atom<SelectableMaterials>(
  defaultSelecteMaterial
);

// --------- Stroke Options ---------

export const materialColorAtom = atom(defaultMaterialColor);
export const strokeSizeRefAtom = atom(() => ({ current: defaultStrokeSize }));
export const strokeSizeAtom = atom(defaultStrokeSize);
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
export const gravityDirectionRefAtom = atom(() => ({ current: sandDirection }));

// --------- Moves Vertical Liquid Options ---------

export const diagonalSpreadRefAtom = atom(() => ({
  current: defaultDiagonalSpread,
}));
export const diagonalSpreadAtom = atom(defaultDiagonalSpread);

export const verticalSpreadRefAtom = atom(() => ({
  current: defaultVerticalSpread,
}));
export const verticalSpreadAtom = atom(defaultVerticalSpread);

export const horizontalSpreadRefAtom = atom(() => ({
  current: defaultHorizontalSpread,
}));
export const horizontalSpreadAtom = atom(defaultHorizontalSpread);

// --------- Limited Life Options ---------
export const lifeRefAtom = atom(() => ({
  current: smokeLife,
}));
export const lifeAtom = atom(smokeLife);

// --------- Flammable Options ---------
export const fuelRefAtom = atom(() => ({
  current: woodFuel,
}));
export const fuelAtom = atom(woodFuel);

export const chanceToCatchRefAtom = atom(() => ({
  current: woodChanceToCatch,
}));
export const chanceToCatchAtom = atom(woodChanceToCatch);

export const chanceToMeltRefAtom = atom(() => ({
  current: woodChanceToCatch,
}));
export const chanceToMeltAtom = atom(woodChanceToCatch);

export const smokeColorRefAtom = atom(() => ({
  current: woodSmokeColor,
}));
export const smokeColorAtom = atom(woodSmokeColor);

export const extinguishMaterialRefAtom = atom<{ current: MaterialOptionsType }>(
  () => ({
    current: lavaExtinguishMaterial,
  })
);
export const extinguishMaterialAtom = atom<MaterialOptionsType>(
  lavaExtinguishMaterial
);

export const burningMaterialRefAtom = atom<{ current: MaterialOptionsType }>(
  () => ({
    current: oilBurningMaterial,
  })
);
export const burningMaterialAtom =
  atom<MaterialOptionsType>(oilBurningMaterial);
// --------- Acid Options ---------
export const acidStrengthRefAtom = atom(() => ({
  current: acidDefaultStrength,
}));
export const acidStrengthAtom = atom(acidDefaultStrength);

// --------- Image Options ---------

export const imageDataAtom = atom<HTMLImageElement | null>(null);

// --------- Draw Options ---------

export const drawModeAtom = atom<
  "brush" | "rectangle" | "circle" | "triangle" | "diamond"
>("brush");

export const drawModeRefAtom = atom<{
  current: "brush" | "rectangle" | "circle" | "triangle" | "diamond";
}>(() => ({
  current: "brush",
}));

export const isCanvasHoveredAtom = atom(false);
export const isCanvasHoveredRefAtom = atom(() => ({
  current: false,
}));
