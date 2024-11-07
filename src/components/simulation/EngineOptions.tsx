import { materialOptions } from "@/components/simulation/materials/Material";
import MaterialButton from "@/components/simulation/materials/MaterialButton";
import MaterialOptions from "@/components/simulation/materials/MaterialOptions";
import SimulationOptionsButton from "@/components/simulation/SimulationOptionsButton";
import {
  FPSAtom,
  isPlayingAtom,
  particleSizeAtom,
} from "@/components/simulation/simulationState";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Pause, Play } from "lucide-react";

const EngineOptions = () => {
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useAtom(particleSizeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex md:flex-col min-h-36 md:w-72 border-t md:border-t-0 md:border-l border-zinc-400 dark:border-zinc-800">
      <div className="flex-0 border-r md:border-r-0 border-b border-zinc-400 dark:border-zinc-800 text-xs px-4 py-1">
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-10 min-w-12 md:flex-1 justify-center md:justify-start flex items-center">
            <span>{FPS} FPS</span>
          </div>
          <div className="flex-1 flex flex-col md:flex-row justify-center">
            <Button variant="ghost" size="icon" onClick={toggleIsPlaying}>
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <SimulationOptionsButton
              particleSize={particleSize}
              setParticleSize={setParticleSize}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
      <div className="flex-1 1 grid grid-cols-1 sm:grid-cols-2 content-start gap-4 p-3  border-r md:border-r-0 md:border-b border-zinc-400 dark:border-zinc-800">
        {materialOptions.map((material) => {
          return <MaterialButton key={material} material={material} />;
        })}
      </div>
      <div className="flex-1  p-4">
        <MaterialOptions />
      </div>
    </div>
  );
};

export default EngineOptions;
