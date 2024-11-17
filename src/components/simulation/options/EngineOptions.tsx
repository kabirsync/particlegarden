import SimulationOptionsButton from "@/components/simulation/options/SimulationOptionsButton";
import {
  FPSAtom,
  particleSizeAtom,
  isPlayingAtom,
  refreshAtom,
} from "@/components/simulation/simulationState";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Pause, Play, RefreshCcw } from "lucide-react";

const EngineOptions = () => {
  const [, setRefresh] = useAtom(refreshAtom);
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useAtom(particleSizeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRefresh = () => {
    setRefresh(Date.now());
  };

  return (
    <div className="h-full flex flex-row items-center text-xs">
      <div className="h-10 min-w-12 flex-1 justify-start flex items-center">
        <span>{FPS} FPS</span>
      </div>
      <div className="flex-1 flex justify-center">
        <Button variant="ghost" size="icon" onClick={toggleIsPlaying}>
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCcw className="h-4 w-4" />
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
  );
};

export default EngineOptions;
