import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { sandColor } from "@/lib/colors";
import { Color } from "three";
import { useState } from "react";

type MaterialOptionsProps = {
  updateMaterialColor: (color: Color) => void;
  updateStrokeSize: (strokeSize: number) => void;
  selectedMaterial: MaterialOptionsType;
};

const MaterialOptions = ({
  updateStrokeSize,
  updateMaterialColor,
  selectedMaterial,
}: MaterialOptionsProps) => {
  const [materialColor, setMaterialColor] = useState(sandColor);
  const [strokeSize, setStrokeSize] = useState(6);

  const handleMaterialColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; // Access event.target correctly
    const newColor = new Color(value);
    setMaterialColor(newColor);
    updateMaterialColor(newColor);
  };

  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    updateStrokeSize(value);
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
          max={50}
          step={1}
          onValueChange={(values: number[]) => {
            handleStrokeSizeChange(values[0]);
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
            value={`#${materialColor.getHexString()}`}
            onChange={handleMaterialColorChange}
            className="cursor-pointer w-12 h-12 p-0"
          />
        </div>
      )}
    </div>
  );
};

export default MaterialOptions;
