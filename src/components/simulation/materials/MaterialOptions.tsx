import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Color } from "three";
import { useState } from "react";
import { Label } from "@/components/ui/label";
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
import { strokeSizeAtom } from "@/components/simulation/simulationState";

type MaterialOptionsProps = {
  updateStrokeSize: (strokeSize: number) => void;
  updateMaxSpeed: (maxSpeed: number) => void;
  updateInitialVelocity: (initialVelocity: number) => void;
  updateAcceleration: (acceleration: number) => void;
  updateDiagonalSpread: (diagonalSpread: number) => void;
  updateVerticalSpread: (verticalSpread: number) => void;
  updateHorizontalSpread: (horizontalSpread: number) => void;

  selectedMaterial: MaterialOptionsType;
  handleMaterialColorChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  materialColor: Color;
};

const MaterialOptions = ({
  // updateStrokeSize,
  selectedMaterial,
  updateMaxSpeed,
  updateInitialVelocity,
  updateAcceleration,
  updateDiagonalSpread,
  updateHorizontalSpread,
  updateVerticalSpread,
  handleMaterialColorChange,
  materialColor,
}: MaterialOptionsProps) => {
  const [strokeSizeRef] = useAtom(strokeSizeAtom);
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

  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    // updateStrokeSize(value);
    strokeSizeRef.current = value;
  };
  const handleMaxSpeedChange = (value: number) => {
    setMaxSpeed(value);
    updateMaxSpeed(value);
  };
  const handleInitialVelocityChange = (value: number) => {
    setInitialVelocity(value);
    updateInitialVelocity(value);
  };
  const handleAccelerationChange = (value: number) => {
    setAcceleration(value);
    updateAcceleration(value);
  };

  const handleDiagonalSpreadChange = (value: number) => {
    setDiagonalSpread(value);
    updateDiagonalSpread(value);
  };
  const handleVerticalSpreadChange = (value: number) => {
    setVerticalSpread(value);
    updateVerticalSpread(value);
  };
  const handleHorizontalSpreadChange = (value: number) => {
    setHorizontalSpread(value);
    updateHorizontalSpread(value);
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
