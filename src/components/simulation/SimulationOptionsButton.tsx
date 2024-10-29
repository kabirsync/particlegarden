import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SimulationOptionsButtonProps = {
  particleSize: number;
  setParticleSize: Dispatch<SetStateAction<number>>;
};

const SimulationOptionsButton = ({
  particleSize,
  setParticleSize,
}: SimulationOptionsButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" side="bottom" align="start">
        <DropdownMenuLabel className="text-xs">
          Simulation Settings
        </DropdownMenuLabel>
        <div className="flex flex-col gap-2 p-3">
          <Label htmlFor="particleSize" className="text-xs">
            Particle Size: {particleSize - 5}
          </Label>
          <Slider
            id="particleSize"
            className="py-1"
            defaultValue={[10]}
            value={[particleSize]}
            min={6}
            max={20}
            step={1}
            onValueChange={(values: number[]) => {
              setParticleSize(values[0]);
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SimulationOptionsButton;
