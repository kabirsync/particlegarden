import {
  getMaterialIcon,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import {
  materialColorAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import {
  fireColor,
  gasColor,
  lavaColor,
  oilColor,
  sandColor,
  smokeColor,
  waterColor,
  woodColor,
} from "@/lib/constants";
import { useAtom } from "jotai";

type MaterialButtonProps = {
  material: MaterialOptionsType;
};

const MaterialButton = ({ material }: MaterialButtonProps) => {
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [selectedMaterial, setSelectedMaterial] = useAtom(selectedMaterialAtom);

  const [, setMaterialColor] = useAtom(materialColorAtom);

  const handleSelectedMaterialChange = (
    newSelectedMaterial: MaterialOptionsType
  ) => {
    switch (newSelectedMaterial) {
      case "Wood":
        setMaterialColor(woodColor);
        materialColorRef.current = woodColor;
        break;
      case "Sand":
        setMaterialColor(sandColor);
        materialColorRef.current = sandColor;
        break;
      case "Water":
        setMaterialColor(waterColor);
        materialColorRef.current = waterColor;
        break;
      case "Smoke":
        setMaterialColor(smokeColor);
        materialColorRef.current = smokeColor;
        break;
      case "Fire":
        setMaterialColor(fireColor);
        materialColorRef.current = fireColor;
        break;
      case "Oil":
        setMaterialColor(oilColor);
        materialColorRef.current = oilColor;
        break;
      case "Gas":
        setMaterialColor(gasColor);
        materialColorRef.current = gasColor;
        break;
      case "Lava":
        setMaterialColor(lavaColor);
        materialColorRef.current = lavaColor;
        break;
      default:
        throw new Error(`Unhandled material type: ${newSelectedMaterial}`);
    }

    setSelectedMaterial(newSelectedMaterial);
  };

  return (
    <Button
      className="text-xs flex justify-center"
      variant={selectedMaterial === material ? "secondary" : "outline"}
      onClick={() => handleSelectedMaterialChange(material)}
    >
      {getMaterialIcon(material)} {material}
    </Button>
  );
};

export default MaterialButton;
