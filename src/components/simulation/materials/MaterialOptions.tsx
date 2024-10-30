import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { sandColor } from "@/lib/colors";
import { Color } from "pixi.js";
import { Dispatch, SetStateAction, useState } from "react";

type MaterialOptionsProps = {
  strokeSize: number;
  setStrokeSize: Dispatch<SetStateAction<number>>;
  updateMaterialColor: (color: Color) => void;
  selectedMaterial: MaterialOptionsType;
};

const MaterialOptions = ({
  strokeSize,
  setStrokeSize,
  updateMaterialColor,
  selectedMaterial,
}: MaterialOptionsProps) => {
  const [materialColor, setMaterialColor] = useState(sandColor);

  const handleMaterialColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; // Access event.target correctly
    const newColor = new Color(value);
    setMaterialColor(newColor);
    updateMaterialColor(newColor);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="strokeSize" className="text-xs">
          Stroke Size
        </label>
        <Slider
          id="strokeSize"
          className="py-1"
          defaultValue={[10]}
          value={[strokeSize]}
          min={1}
          max={20}
          step={1}
          onValueChange={(values: number[]) => {
            setStrokeSize(values[0]);
          }}
        />
      </div>
      {["Sand"].includes(selectedMaterial) && (
        <div className="flex flex-col gap-2">
          <label htmlFor="colorPicker" className="text-xs">
            Choose a color:
          </label>
          <Input
            type="color"
            id="colorPicker"
            value={`${materialColor.toHex()}`}
            onChange={handleMaterialColorChange}
            className="cursor-pointer w-12 h-12 p-0"
          />
        </div>
      )}
    </div>
  );
};

export default MaterialOptions;
