import Simulation from "@/components/simulation/SimulationContainer";
import SimulationOptionsButton from "@/components/simulation/SimulationOptionsButton";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [FPS, setFPS] = useState(0);
  const [particleSize, setParticleSize] = useState(6);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-dvh flex flex-col bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300">
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-grow">
            <Simulation
              isPlaying={isPlaying}
              setFPS={setFPS}
              particleSize={particleSize}
            />
          </div>
          <div className="min-h-36 md:w-72 border-t md:border-t-0 md:border-l border-zinc-400 dark:border-zinc-800">
            <div className="border-b border-zinc-400 dark:border-zinc-800 text-xs">
              <div className="px-3 py-1 flex items-center">
                <span className="flex-1 flex justify-start">{FPS} FPS</span>
                <div className="flex-1 flex justify-center">
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
                <div className="flex-1 flex justify-center">
                  <ThemeToggleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
