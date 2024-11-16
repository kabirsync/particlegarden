import {
  materialColorAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { Color } from "three";

const StrokeColorOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [materialColor, setMaterialColor] = useAtom(materialColorAtom);

  const handleMaterialColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newColor = new Color(value);
    setMaterialColor(newColor);
    materialColorRef.current = newColor;
  };

  if (
    [
      "Sand",
      "Wood",
      "Water",
      "Smoke",
      "Acid",
      "Gas",
      "Oil",
      "Stone",
      "Cloner",
      "Void",
    ].includes(selectedMaterial)
  ) {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="colorPicker" className="text-xs">
          Choose a color:
        </Label>
        <Input
          type="color"
          id="colorPicker"
          value={`#${materialColor.getHexString()}`}
          onChange={handleMaterialColorChange}
          className="cursor-pointer w-12 h-12 p-0"
        />
      </div>
    );
  }
};

export default StrokeColorOptions;
