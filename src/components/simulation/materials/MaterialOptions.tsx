import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Color } from "pixi.js";
import { Dispatch, SetStateAction } from "react";

type MaterialOptionsProps = {
  strokeSize: number;
  setStrokeSize: Dispatch<SetStateAction<number>>;
  materialColor: Color;
  handleMaterialColorChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const MaterialOptions = ({
  strokeSize,
  setStrokeSize,
  materialColor,
  handleMaterialColorChange,
}: MaterialOptionsProps) => {
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
          value={`#${materialColor.toHex()}`}
          onChange={handleMaterialColorChange}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>
    </>
  );
};

export default MaterialOptions;
