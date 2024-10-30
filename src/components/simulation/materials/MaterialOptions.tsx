import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { sandColor } from "@/lib/colors";
import { Color } from "pixi.js";
import { Dispatch, SetStateAction, useState } from "react";

type MaterialOptionsProps = {
  strokeSize: number;
  setStrokeSize: Dispatch<SetStateAction<number>>;
  updateMaterialColor: (color: Color) => void;
};

const MaterialOptions = ({
  strokeSize,
  setStrokeSize,
  updateMaterialColor,
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
    <>
      <div className="flex flex-col gap-2 p-3">
        <Label htmlFor="strokeSize" className="text-xs">
          Stroke Size
        </Label>
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
      <div className="flex flex-col gap-2">
        <label
          htmlFor="colorPicker"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose a color:
        </label>
        <input
          type="color"
          id="colorPicker"
          value={`${materialColor.toHex()}`}
          onChange={handleMaterialColorChange}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>
    </>
  );
};

export default MaterialOptions;
