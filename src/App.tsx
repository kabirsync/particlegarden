import Simulation from "@/components/simulation/SimulationContainer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Settings } from "lucide-react";
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
      <div className="h-dvh flex flex-col bg-zinc-300 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300">
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-grow">
            <Simulation
              isPlaying={isPlaying}
              setFPS={setFPS}
              particleSize={particleSize}
            />
          </div>
          <div className="min-h-36 md:w-72 border-t md:border-t-0 md:border-l border-zinc-400 dark:border-zinc-800">
            <div className="px-3 py-1 flex justify-between items-center border-b border-zinc-400 dark:border-zinc-800 text-xs">
              <p className="w-16">{FPS} FPS</p>
              <div>
                <Button variant="ghost" size="icon" onClick={toggleIsPlaying}>
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
              <ThemeToggleButton />
            </div>
            <div className="p-3 ">
              <div className="flex flex-col gap-2">
                <Label htmlFor="particleSize">
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
                    console.log(values);
                    setParticleSize(values[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
