import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { sandColor } from "@/lib/colors";
import { Color } from "three";
import { useState } from "react";

type MaterialOptionsProps = {
  updateMaterialColor: (color: Color) => void;
  updateStrokeSize: (strokeSize: number) => void;
  updateMaxVelocity: (maxVelocity: number) => void;
  updateInitialVelocity: (initialVelocity: number) => void;
  updateAcceleration: (acceleration: number) => void;
  selectedMaterial: MaterialOptionsType;
};

const MaterialOptions = ({
  updateStrokeSize,
  updateMaterialColor,
  selectedMaterial,
  updateMaxVelocity,
  updateInitialVelocity,
  updateAcceleration,
}: MaterialOptionsProps) => {
  const [materialColor, setMaterialColor] = useState(sandColor);
  const [strokeSize, setStrokeSize] = useState(6);
  const [maxVelocity, setMaxVelocity] = useState(100);

  const [initialVelocity, setInitialVelocity] = useState(0.1);

  const [acceleration, setAcceleration] = useState(0.5);

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
      {["Sand"].includes(selectedMaterial) && (
        <div>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="strokeSize" className="text-xs">
              Max Velocity
            </label>
            <Slider
              id="strokeSize"
              className="py-1"
              defaultValue={[10]}
              value={[maxVelocity]}
              min={1}
              max={50}
              step={1}
              onValueChange={(values: number[]) => {
                handleMaxVelocityChange(values[0]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="strokeSize" className="text-xs">
              Initial Velocity
            </label>
            <Slider
              id="strokeSize"
              className="py-1"
              defaultValue={[10]}
              value={[initialVelocity]}
              min={1}
              max={50}
              step={1}
              onValueChange={(values: number[]) => {
                handleInitialVelocityChange(values[0]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="strokeSize" className="text-xs">
              Acceleration
            </label>
            <Slider
              id="strokeSize"
              className="py-1"
              // defaultValue={[1]}
              value={[acceleration]}
              min={0.000001}
              max={1}
              step={0.000001}
              onValueChange={(values: number[]) => {
                handleAccelerationChange(values[0]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialOptions;
