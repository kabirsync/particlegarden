import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import {
  selectedMaterialAtom,
  materialColorRefAtom,
  maxSpeedRefAtom,
  initialVelocityRefAtom,
  accelerationRefAtom,
  diagonalSpreadRefAtom,
  verticalSpreadRefAtom,
  horizontalSpreadRefAtom,
  lifeRefAtom,
  chanceToCatchRefAtom,
  chanceToMeltRefAtom,
  acidStrengthRefAtom,
  smokeColorRefAtom,
  extinguishMaterialRefAtom,
} from "@/components/simulation/simulationState";
import { useMaterialProperties } from "@/hooks/useMaterialProperties";
import {
  getMaterialIcon,
  materialConfigs,
  SelectableMaterials,
} from "@/components/simulation/materials/Material";
import { useTheme } from "@/components/theme/useTheme";

const MaterialButton = ({ material }: { material: SelectableMaterials }) => {
  const { theme } = useTheme();
  const { updateProperty } = useMaterialProperties();
  const [, setSelectedMaterial] = useAtom(selectedMaterialAtom);
  const [selectedMaterial] = useAtom(selectedMaterialAtom);

  // Get all the refs
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [chanceToCatchRef] = useAtom(chanceToCatchRefAtom);
  const [chanceToMeltRef] = useAtom(chanceToMeltRefAtom);
  const [acidStrengthRef] = useAtom(acidStrengthRefAtom);
  const [smokeColorRef] = useAtom(smokeColorRefAtom);
  const [extinguishMaterialRef] = useAtom(extinguishMaterialRefAtom);

  const handleClick = () => {
    const config = materialConfigs[material];

    // Map of property names to their corresponding refs
    const propertyRefs = {
      color: materialColorRef,
      maxSpeed: maxSpeedRef,
      initialVelocity: initialVelocityRef,
      acceleration: accelerationRef,
      diagonalSpread: diagonalSpreadRef,
      verticalSpread: verticalSpreadRef,
      horizontalSpread: horizontalSpreadRef,
      life: lifeRef,
      chanceToCatch: chanceToCatchRef,
      chanceToMelt: chanceToMeltRef,
      acidStrength: acidStrengthRef,
      smokeColor: smokeColorRef,
      extinguishMaterial: extinguishMaterialRef,
    };

    // Update all properties from the config with their corresponding refs
    Object.entries(config).forEach(([key, value]) => {
      const propertyKey = key as keyof typeof propertyRefs;
      updateProperty(propertyKey, value, propertyRefs[propertyKey]);
    });

    setSelectedMaterial(material);
  };

  return (
    <Button
      className="text-xs flex justify-center"
      variant={selectedMaterial === material ? "secondary" : "outline"}
      onClick={handleClick}
    >
      {getMaterialIcon(material, theme)} {material}
    </Button>
  );
};

export default MaterialButton;
