import {
  getMaterialIcon,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import { Button } from "@/components/ui/button";

type MaterialButtonProps = {
  material: MaterialOptionsType;
  isSelected: boolean;
  handleSelectedMaterialChange: (
    newSelectedMaterial: MaterialOptionsType
  ) => void;
  // setSelectedMaterial: Dispatch<SetStateAction<MaterialOptionsType>>;
};

const MaterialButton = ({
  material,
  isSelected,
  // setSelectedMaterial,
  handleSelectedMaterialChange,
}: MaterialButtonProps) => {
  return (
    <Button
      className="text-xs flex justify-center"
      variant={isSelected ? "secondary" : "outline"}
      onClick={() => handleSelectedMaterialChange(material)}
    >
      {getMaterialIcon(material)} {material}
    </Button>
  );
};

export default MaterialButton;
