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
    if (newSelectedMaterial === "Wood") {
      setMaterialColor(woodColor);
      materialColorRef.current = woodColor;
    } else if (newSelectedMaterial === "Sand") {
      setMaterialColor(sandColor);
      materialColorRef.current = sandColor;
    } else if (newSelectedMaterial === "Water") {
      setMaterialColor(waterColor);
      materialColorRef.current = waterColor;
    } else if (newSelectedMaterial === "Smoke") {
      setMaterialColor(smokeColor);
      materialColorRef.current = smokeColor;
    } else if (newSelectedMaterial === "Fire") {
      setMaterialColor(fireColor);
      materialColorRef.current = fireColor;
    } else if (newSelectedMaterial === "Oil") {
      setMaterialColor(oilColor);
      materialColorRef.current = oilColor;
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
