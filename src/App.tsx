import {
  materialOptions,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import MaterialButton from "@/components/simulation/materials/MaterialButton";
import MaterialOptions from "@/components/simulation/materials/MaterialOptions";
import SimulationOptionsButton from "@/components/simulation/SimulationOptionsButton";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { sandColor } from "@/lib/colors";
import { LoaderIcon, Pause, Play } from "lucide-react";
import { Color } from "pixi.js";
import React, { Suspense, useRef, useState } from "react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [FPS, setFPS] = useState(0);
  const [strokeSize, setStrokeSize] = useState(10);
  const [particleSize, setParticleSize] = useState(6);
  // const [materialColor, setMaterialColor] = useState(sandColor);
  const materialColorRef = useRef(sandColor);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialOptionsType>("Sand");

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const updateMaterialColor = (color: Color) => {
    materialColorRef.current = color;
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
                strokeSize={strokeSize}
                materialColorRef={materialColorRef}
              />
            </Suspense>
          </div>
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
            <div className="flex-1  border-r md:border-r-0 md:border-b border-zinc-400 dark:border-zinc-800 p-4">
              <MaterialOptions
                strokeSize={strokeSize}
                setStrokeSize={setStrokeSize}
                updateMaterialColor={updateMaterialColor}
                selectedMaterial={selectedMaterial}
              />
            </div>
            <div className="flex-1 1 grid grid-cols-1 sm:grid-cols-2 content-start gap-4 p-3">
              {materialOptions.map((material) => {
                return (
                  <MaterialButton
                    material={material}
                    isSelected={selectedMaterial === material}
                    setSelectedMaterial={setSelectedMaterial}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
