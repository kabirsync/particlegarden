import {
  accelerationAtom,
  accelerationRefAtom,
  gravityDirectionAtom,
  gravityDirectionRefAtom,
  initialVelocityAtom,
  initialVelocityRefAtom,
  maxSpeedAtom,
  maxSpeedRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAtom } from "jotai";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

const MoveVerticalOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  const [maxSpeed, setMaxSpeed] = useAtom(maxSpeedAtom);
  const [initialVelocity, setInitialVelocity] = useAtom(initialVelocityAtom);
  const [acceleration, setAcceleration] = useAtom(accelerationAtom);
  const [gravityDirection, setGravityDirection] = useAtom(gravityDirectionAtom);
  const [gravityDirectionRef] = useAtom(gravityDirectionRefAtom);
  const handleMaxSpeedChange = (value: number) => {
    setMaxSpeed(value);
    maxSpeedRef.current = value;
  };
  const handleInitialVelocityChange = (value: number) => {
    setInitialVelocity(value);
    initialVelocityRef.current = value;
  };
  const handleAccelerationChange = (value: number) => {
    const updatedAcceleration = value * gravityDirection;
    setAcceleration(updatedAcceleration);
    accelerationRef.current = updatedAcceleration;
  };

  const handleGravityDirectionChange = (direction: string) => {
    if (direction === "up") {
      setGravityDirection(-1);
      gravityDirectionRef.current = -1;
      setAcceleration(acceleration * -1);
      accelerationRef.current = acceleration * -1;
    } else if (direction === "down") {
      setGravityDirection(1);
      gravityDirectionRef.current = 1;
      setAcceleration(Math.abs(acceleration));
      accelerationRef.current = Math.abs(acceleration);
    }
  };

  if (
    ["Sand", "Water", "Smoke", "Acid", "Lava", "Gas", "Oil", "Fire"].includes(
      selectedMaterial
    )
  ) {
    return (
      <>
        <Separator className="mt-2" />
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <ArrowUpDown className="h-4 w-4 text-purple-500 " />
            <span className="text-xs font-bold">Vertical Movement</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="initialVelocity" className="text-xs">
                <div className="flex items-center justify-between gap-3">
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
                <div className="flex items-center justify-between gap-3">
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
                <div className="flex items-center justify-between gap-3">
                  <span>Acceleration: </span>
                  <div className="flex gap-2">
                    <ToggleGroup
                      size={"xs"}
                      type="single"
                      className="w-min"
                      variant="outline"
                      onValueChange={handleGravityDirectionChange}
                      value={gravityDirection === 1 ? "down" : "up"}
                      // defaultValue={gravityDirection === 1 ? "down" : "up"}
                    >
                      <ToggleGroupItem value="down" aria-label="Toggle down">
                        <ArrowDown className="h-3 w-3" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="up" aria-label="Toggle up">
                        <ArrowUp className="h-3 w-3" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <Input
                      className="text-xs h-8 w-min"
                      type="number"
                      min={0}
                      max={5}
                      value={Math.abs(acceleration)}
                      onChange={(e) => {
                        if (Number(e.target.value) > 5)
                          handleAccelerationChange(Number(5));
                        else if (Number(e.target.value) < 0) {
                          handleAccelerationChange(Number(0));
                        } else {
                          handleAccelerationChange(Number(e.target.value));
                        }
                      }}
                      step={0.00001}
                    />
                  </div>
                </div>
              </Label>
              <Slider
                id="acceleration"
                className="py-1"
                value={[Math.abs(acceleration)]}
                min={0}
                max={5}
                step={0.000001}
                onValueChange={(values: number[]) => {
                  handleAccelerationChange(values[0]);
                }}
              />
            </div>
          </div>{" "}
        </div>
      </>
    );
  } else return null;
};

export default MoveVerticalOptions;
