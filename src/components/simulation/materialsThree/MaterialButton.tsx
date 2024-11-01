import { MaterialOptionsType } from "@/components/simulation/materialsThree/Material";
import { Button } from "@/components/ui/button";
import { Circle, Grip } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type MaterialButtonProps = {
  material: MaterialOptionsType;
  isSelected: boolean;
  setSelectedMaterial: Dispatch<SetStateAction<MaterialOptionsType>>;
};

const getMaterialIcon = (material: MaterialOptionsType) => {
  switch (material) {
    case "Sand":
      return <Grip className="h-3 w-3 text-yellow-600" />;
    case "Empty":
      return <Circle className="h-3 w-3" />;
    // case "Fire":
    //   return <Leaf className="h-3 w-3 text-green-600" />;
    default:
      return null;
  }
};

const MaterialButton = ({
  material,
  isSelected,
  setSelectedMaterial,
}: MaterialButtonProps) => {
  return (
    <Button
      className="text-xs flex justify-center"
      variant={isSelected ? "secondary" : "outline"}
      onClick={() => setSelectedMaterial(material)}
    >
      {getMaterialIcon(material)} {material}
    </Button>
  );
};

export default MaterialButton;
