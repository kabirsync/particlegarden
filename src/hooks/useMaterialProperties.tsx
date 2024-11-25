import { useAtom } from "jotai";
import { selectedMaterialAtom } from "@/components/simulation/simulationState";
import {
  materialColorAtom,
  smokeColorAtom,
  maxSpeedAtom,
  initialVelocityAtom,
  accelerationAtom,
  diagonalSpreadAtom,
  verticalSpreadAtom,
  horizontalSpreadAtom,
  lifeAtom,
  chanceToCatchAtom,
  chanceToMeltAtom,
  acidStrengthAtom,
  gravityDirectionAtom,
  extinguishMaterialAtom,
  burningMaterialAtom,
} from "@/components/simulation/simulationState";
import {
  MaterialPropertyKey,
  MaterialProperties,
  getMaterialProperty,
} from "@/components/simulation/materials/Material";

export function useMaterialProperties() {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);

  // Call useAtom for each property individually
  const atomSetters: Partial<{
    [K in MaterialPropertyKey]: (
      value: NonNullable<MaterialProperties[K]>
    ) => void;
  }> = {
    color: useAtom(materialColorAtom)[1],
    smokeColor: useAtom(smokeColorAtom)[1],
    maxSpeed: useAtom(maxSpeedAtom)[1],
    initialVelocity: useAtom(initialVelocityAtom)[1],
    acceleration: useAtom(accelerationAtom)[1],
    diagonalSpread: useAtom(diagonalSpreadAtom)[1],
    verticalSpread: useAtom(verticalSpreadAtom)[1],
    horizontalSpread: useAtom(horizontalSpreadAtom)[1],
    life: useAtom(lifeAtom)[1],
    chanceToCatch: useAtom(chanceToCatchAtom)[1],
    chanceToMelt: useAtom(chanceToMeltAtom)[1],
    acidStrength: useAtom(acidStrengthAtom)[1],

    gravityDirection: useAtom(gravityDirectionAtom)[1],
    extinguishMaterial: useAtom(extinguishMaterialAtom)[1],
    burningMaterial: useAtom(burningMaterialAtom)[1],
  };

  function updateProperty<K extends MaterialPropertyKey>(
    property: K,
    value: MaterialProperties[K],
    ref?: { current: MaterialProperties[K] }
  ) {
    const setter = atomSetters[property];
    if (!setter || value === undefined) return;

    setter(value as NonNullable<MaterialProperties[K]>);
    if (ref) {
      ref.current = value;
    }
  }

  function getProperty<K extends MaterialPropertyKey>(property: K) {
    return getMaterialProperty(selectedMaterial, property);
  }

  return {
    updateProperty,
    getProperty,
  };
}
