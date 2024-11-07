import {
  accelerationRefAtom,
  diagonalSpreadRefAtom,
  horizontalSpreadRefAtom,
  initialVelocityRefAtom,
  materialColorAtom,
  materialColorRefAtom,
  maxSpeedRefAtom,
  selectedMaterialAtom,
  strokeSizeRefAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  defaultAcceleration,
  defaultDiagonalSpread,
  defaultHorizontalSpread,
  defaultInitialVelocity,
  defaultMaxSpeed,
  defaultStrokeSize,
  defaultVerticalSpread,
} from "@/lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";
import { Color } from "three";

const MaterialOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [strokeSizeRef] = useAtom(strokeSizeRefAtom);
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [strokeSize, setStrokeSize] = useState(defaultStrokeSize);
  const [maxSpeed, setMaxSpeed] = useState(defaultMaxSpeed);
  const [initialVelocity, setInitialVelocity] = useState(
    defaultInitialVelocity
  );
  const [acceleration, setAcceleration] = useState(defaultAcceleration);
  const [diagonalSpread, setDiagonalSpread] = useState(defaultDiagonalSpread);
  const [verticalSpread, setVerticalSpread] = useState(defaultVerticalSpread);
  const [horizontalSpread, setHorizontalSpread] = useState(
    defaultHorizontalSpread
  );

  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [materialColor, setMaterialColor] = useAtom(materialColorAtom);

  const handleMaterialColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; // Access event.target correctly
    const newColor = new Color(value);
    setMaterialColor(newColor);
    materialColorRef.current = newColor;
  };

  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    strokeSizeRef.current = value;
  };
  const handleMaxSpeedChange = (value: number) => {
    setMaxSpeed(value);
    maxSpeedRef.current = value;
  };
  const handleInitialVelocityChange = (value: number) => {
    setInitialVelocity(value);
    initialVelocityRef.current = value;
  };
  const handleAccelerationChange = (value: number) => {
    setAcceleration(value);
    accelerationRef.current = value;
  };

  const handleDiagonalSpreadChange = (value: number) => {
    setDiagonalSpread(value);
    diagonalSpreadRef.current = value;
  };
  const handleVerticalSpreadChange = (value: number) => {
    setVerticalSpread(value);
    verticalSpreadRef.current = value;
  };
  const handleHorizontalSpreadChange = (value: number) => {
    setHorizontalSpread(value);
    horizontalSpreadRef.current = value;
  };

  return (
    <div className="flex flex-col gap-3">
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
      <div>
        {["Sand", "Wood", "Water", "Smoke"].includes(selectedMaterial) && (
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
        {["Sand", "Water", "Smoke"].includes(selectedMaterial) && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="initialVelocity" className="text-xs">
                <div className="flex items-center gap-3">
                  <span>Max Speed : </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={0}
                    max={20}
                    value={maxSpeed}
                    onChange={(e) => {
                      if (Number(e.target.value) > 20)
                        handleMaxSpeedChange(Number(20));
                      else if (Number(e.target.value) < 0) {
                        handleMaxSpeedChange(Number(0));
                      } else {
                        handleMaxSpeedChange(Number(e.target.value));
                      }
                    }}
                    step={0.00001}
                  />
                </div>
              </Label>
              <Slider
                id="maxSpeed"
                className="py-1"
                value={[maxSpeed]}
                min={0}
                max={20}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleMaxSpeedChange(values[0]);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="initialVelocity" className="text-xs">
                <div className="flex items-center gap-3">
                  <span>Initial Velocity: </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={-20}
                    max={20}
                    value={initialVelocity}
                    onChange={(e) => {
                      if (Number(e.target.value) > 20)
                        handleInitialVelocityChange(Number(20));
                      else if (Number(e.target.value) < -20) {
                        handleInitialVelocityChange(Number(-20));
                      } else {
                        handleInitialVelocityChange(Number(e.target.value));
                      }
                    }}
                    step={0.00001}
                  />
                </div>
              </Label>
              <Slider
                id="initialVelocity"
                className="py-1"
                value={[initialVelocity]}
                min={-10}
                max={10}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleInitialVelocityChange(values[0]);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="acceleration" className="text-xs">
                <div className="flex items-center gap-3">
                  <span>Acceleration: </span>
                  <Input
                    className="text-xs h-8 w-min"
                    type="number"
                    min={-5}
                    max={5}
                    value={acceleration}
                    onChange={(e) => {
                      if (Number(e.target.value) > 5)
                        handleAccelerationChange(Number(5));
                      else if (Number(e.target.value) < -5) {
                        handleAccelerationChange(Number(-5));
                      } else {
                        handleAccelerationChange(Number(e.target.value));
                      }
                    }}
                    step={0.00001}
                  />
                </div>
              </Label>
              <Slider
                id="acceleration"
                className="py-1"
                value={[acceleration]}
                min={-5}
                max={5}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleAccelerationChange(values[0]);
                }}
              />
            </div>
            {["Water", "Smoke"].includes(selectedMaterial) && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="diagonalSpread" className="text-xs">
                    Diagonal Spread
                  </Label>
                  <Slider
                    id="diagonalSpread"
                    className="py-1"
                    value={[diagonalSpread]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values: number[]) => {
                      handleDiagonalSpreadChange(values[0]);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="diagonalSpread" className="text-xs">
                    Vertical Spread
                  </Label>
                  <Slider
                    id="diagonalSpread"
                    className="py-1"
                    value={[verticalSpread]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values: number[]) => {
                      handleVerticalSpreadChange(values[0]);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="diagonalSpread" className="text-xs">
                    Horizontal Spread
                  </Label>
                  <Slider
                    id="diagonalSpread"
                    className="py-1"
                    value={[horizontalSpread]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values: number[]) => {
                      handleHorizontalSpreadChange(values[0]);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialOptions;
