import {
  materialColorAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
  strokeSizeRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { defaultStrokeSize } from "@/lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";
import { Color } from "three";

const StrokeOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [strokeSize, setStrokeSize] = useState(defaultStrokeSize);
  const [strokeSizeRef] = useAtom(strokeSizeRefAtom);
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

  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    strokeSizeRef.current = value;
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="strokeSize" className="text-xs">
          Stroke Size
        </Label>
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
      {[
        "Sand",
        "Wood",
        "Water",
        "Smoke",
        "Acid",
        "Gas",
        "Oil",
        "Stone",
      ].includes(selectedMaterial) && (
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
      )}
    </>
  );
};

export default StrokeOptions;
