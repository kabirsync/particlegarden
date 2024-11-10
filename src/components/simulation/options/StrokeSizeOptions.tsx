import { strokeSizeRefAtom } from "@/components/simulation/simulationState";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { defaultStrokeSize } from "@/lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";

const StrokeSizeOptions = () => {
  const [strokeSizeRef] = useAtom(strokeSizeRefAtom);
  const [strokeSize, setStrokeSize] = useState(defaultStrokeSize);
  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    strokeSizeRef.current = value;
  };
  return (
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
  );
};

export default StrokeSizeOptions;
