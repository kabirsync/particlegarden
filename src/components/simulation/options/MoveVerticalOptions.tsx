import {
  accelerationRefAtom,
  initialVelocityRefAtom,
  maxSpeedRefAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  defaultAcceleration,
  defaultInitialVelocity,
  defaultMaxSpeed,
} from "@/lib/constants";
import { useAtom } from "jotai";
import { useState } from "react";

const MoveVerticalOptions = () => {
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  const [maxSpeed, setMaxSpeed] = useState(defaultMaxSpeed);
  const [initialVelocity, setInitialVelocity] = useState(
    defaultInitialVelocity
  );
  const [acceleration, setAcceleration] = useState(defaultAcceleration);

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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="initialVelocity" className="text-xs">
          <div className="flex items-center justify-between gap-3">
            <span className="text-zinc-400">Max Speed : </span>
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
          <div className="flex items-center justify-between gap-3">
            <span className="text-zinc-400">Initial Velocity: </span>
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
          <div className="flex items-center justify-between gap-3">
            <span className="text-zinc-400">Acceleration: </span>
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
    </div>
  );
};

export default MoveVerticalOptions;
