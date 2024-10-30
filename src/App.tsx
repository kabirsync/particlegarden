import { MaterialOptions } from "@/components/simulation/materials/Material";
import SimulationOptionsButton from "@/components/simulation/SimulationOptionsButton";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Pause, Play } from "lucide-react";
import { useState, Suspense } from "react";
import React from "react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [FPS, setFPS] = useState(0);
  const [particleSize, setParticleSize] = useState(6);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialOptions>("Sand");

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-dvh flex flex-col dark:bg-zinc-950 bg-zinc-100 text-zinc-900 dark:text-zinc-300">
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-grow">
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              }
            >
              <Simulation
                isPlaying={isPlaying}
                setFPS={setFPS}
                particleSize={particleSize}
                selectedMaterial={selectedMaterial}
              />
            </Suspense>
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
                <div className="flex-1 flex justify-end">
                  <ThemeToggleButton />
                </div>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={() => setSelectedMaterial("Empty")}
              >
                Empty
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedMaterial("Sand")}
              >
                Sand
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
