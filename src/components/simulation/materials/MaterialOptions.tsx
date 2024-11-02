import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { sandColor } from "@/lib/colors";
import { Color } from "three";
import { useState } from "react";

type MaterialOptionsProps = {
  // updateMaterialColor: (color: Color) => void;
  updateStrokeSize: (strokeSize: number) => void;
  updateMaxVelocity: (maxVelocity: number) => void;
  updateInitialVelocity: (initialVelocity: number) => void;
  updateAcceleration: (acceleration: number) => void;
  selectedMaterial: MaterialOptionsType;
  // initialMaterialColor: Color;
  handleMaterialColorChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  materialColor: Color;
};

const MaterialOptions = ({
  updateStrokeSize,
  // updateMaterialColor,
  selectedMaterial,
  updateMaxVelocity,
  updateInitialVelocity,
  updateAcceleration,
  // initialMaterialColor,
  handleMaterialColorChange,
  materialColor,
}: MaterialOptionsProps) => {
  const [strokeSize, setStrokeSize] = useState(6);
  const [maxVelocity, setMaxVelocity] = useState(10);
  const [initialVelocity, setInitialVelocity] = useState(0.1);
  const [acceleration, setAcceleration] = useState(0.5);

  const handleStrokeSizeChange = (value: number) => {
    setStrokeSize(value);
    updateStrokeSize(value);
  };
  const handleMaxVelocityChange = (value: number) => {
    setMaxVelocity(value);
    updateMaxVelocity(value);
  };
  const handleInitialVelocityChange = (value: number) => {
    setInitialVelocity(value);
    updateInitialVelocity(value);
  };
  const handleAccelerationChange = (value: number) => {
    setAcceleration(value);
    updateAcceleration(value);
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
      {/* {["Sand"].includes(selectedMaterial) && ( */}
      <div>
        {["Sand", "Wood"].includes(selectedMaterial) && (
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
        {["Sand"].includes(selectedMaterial) && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="maxVelocity" className="text-xs">
                Max Velocity: {maxVelocity}
              </label>
              <Slider
                id="maxVelocity"
                className="py-1"
                value={[maxVelocity]}
                min={0}
                max={20}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleMaxVelocityChange(values[0]);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="initialVelocity" className="text-xs">
                Initial Velocity: {initialVelocity}
              </label>
              <Slider
                id="initialVelocity"
                className="py-1"
                value={[initialVelocity]}
                min={0}
                max={10}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleInitialVelocityChange(values[0]);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="acceleration" className="text-xs">
                Acceleration: {acceleration}
              </label>
              <Slider
                id="acceleration"
                className="py-1"
                value={[acceleration]}
                min={0}
                max={5}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleAccelerationChange(values[0]);
                }}
              />
            </div>
          </>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default MaterialOptions;
