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
import { sandColor, waterColor, woodColor } from "@/lib/colors";
import { LoaderIcon, Pause, Play } from "lucide-react";
import { Color } from "three";
import React, { Suspense, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [FPS, setFPS] = useState(0);
  const [particleSize, setParticleSize] = useState(4);
  const materialColorRef = useRef(sandColor);
  const strokeSizeRef = useRef(10);
  const maxSpeedRef = useRef(10);
  const initialVelocityRef = useRef(0.1);
  const accelerationRef = useRef(0.5);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialOptionsType>("Sand");
  const [materialColor, setMaterialColor] = useState(sandColor);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };
  const handleSelectedMaterialChange = (
    newSelectedMaterial: MaterialOptionsType
  ) => {
    if (newSelectedMaterial === "Wood") {
      setMaterialColor(woodColor);
      materialColorRef.current = woodColor;
    } else if (newSelectedMaterial === "Sand") {
      setMaterialColor(sandColor);
      materialColorRef.current = sandColor;
    } else if (newSelectedMaterial === "Water") {
      setMaterialColor(waterColor);
      materialColorRef.current = waterColor;
    }

    setSelectedMaterial(newSelectedMaterial);
  };

  const updateStrokeSize = (strokeSize: number) => {
    strokeSizeRef.current = strokeSize;
  };
  const updateMaxSpeed = (maxSpeed: number) => {
    maxSpeedRef.current = maxSpeed;
  };
  const updateInitialVelocity = (initialVelocity: number) => {
    initialVelocityRef.current = initialVelocity;
  };
  const updateAcceleration = (acceleration: number) => {
    accelerationRef.current = acceleration;
  };

  const handleMaterialColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; // Access event.target correctly
    const newColor = new Color(value);
    setMaterialColor(newColor);
    materialColorRef.current = newColor;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Analytics />
      <SpeedInsights />
      <div className="h-dvh flex flex-col dark:bg-zinc-950 bg-white text-zinc-900 dark:text-zinc-300">
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-grow bg-[#DFDFDF] dark:bg-[#010101]">
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
                strokeSizeRef={strokeSizeRef}
                materialColorRef={materialColorRef}
                maxSpeedRef={maxSpeedRef}
                initialVelocityRef={initialVelocityRef}
                accelerationRef={accelerationRef}
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
            <div className="flex-1 1 grid grid-cols-1 sm:grid-cols-2 content-start gap-4 p-3  border-r md:border-r-0 md:border-b border-zinc-400 dark:border-zinc-800">
              {materialOptions.map((material) => {
                return (
                  <MaterialButton
                    key={material}
                    material={material}
                    isSelected={selectedMaterial === material}
                    handleSelectedMaterialChange={handleSelectedMaterialChange}
                  />
                );
              })}
            </div>
            <div className="flex-1  p-4">
              <MaterialOptions
                updateStrokeSize={updateStrokeSize}
                selectedMaterial={selectedMaterial}
                updateMaxSpeed={updateMaxSpeed}
                updateInitialVelocity={updateInitialVelocity}
                updateAcceleration={updateAcceleration}
                handleMaterialColorChange={handleMaterialColorChange}
                materialColor={materialColor}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
