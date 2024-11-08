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
  stoneColor,
  transparentColor,
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

  // Helper function to enforce exhaustiveness
  function assertUnreachable(x: never): never {
    throw new Error(`Missing material type handling for: ${x}`);
  }

  const handleSelectedMaterialChange = (
    newSelectedMaterial: MaterialOptionsType
  ) => {
    switch (newSelectedMaterial) {
      case "Empty": {
        setMaterialColor(transparentColor);
        materialColorRef.current = transparentColor;
        break;
      }
      case "Wood": {
        setMaterialColor(woodColor);
        materialColorRef.current = woodColor;
        break;
      }
      case "Sand": {
        setMaterialColor(sandColor);
        materialColorRef.current = sandColor;
        break;
      }
      case "Water": {
        setMaterialColor(waterColor);
        materialColorRef.current = waterColor;
        break;
      }
      case "Smoke": {
        setMaterialColor(smokeColor);
        materialColorRef.current = smokeColor;
        break;
      }
      case "Fire": {
        setMaterialColor(fireColor);
        materialColorRef.current = fireColor;
        break;
      }
      case "Oil": {
        setMaterialColor(oilColor);
        materialColorRef.current = oilColor;
        break;
      }
      case "Gas": {
        setMaterialColor(gasColor);
        materialColorRef.current = gasColor;
        break;
      }
      case "Lava": {
        setMaterialColor(lavaColor);
        materialColorRef.current = lavaColor;
        break;
      }
      case "Stone": {
        setMaterialColor(stoneColor);
        materialColorRef.current = stoneColor;
        break;
      }
      default: {
        assertUnreachable(newSelectedMaterial);
      }
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
