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
  lavalExtinguishMaterial,
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
export const vertiacallSpreadAtom = atom(defaultVerticalSpread);

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
    current: lavalExtinguishMaterial,
  })
);
export const extinguishMaterialAtom = atom<MaterialOptionsType>(
  lavalExtinguishMaterial
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
