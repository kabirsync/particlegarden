import { strokeSizeRefAtom } from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
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
        <div className="flex items-center justify-between gap-3">
          <span>Stroke Size: </span>
          <Input
            className="text-xs h-8 w-min min-w-24 mt-1"
            type="number"
            min={1}
            max={50}
            value={strokeSize}
            onChange={(e) => {
              if (Number(e.target.value) > 50)
                handleStrokeSizeChange(Number(50));
              else if (Number(e.target.value) < 1) {
                handleStrokeSizeChange(Number(1));
              } else {
                handleStrokeSizeChange(Number(e.target.value));
              }
            }}
            step={1}
          />
        </div>
      </Label>
      <Slider
        id="strokeSize"
        className="py-1"
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
