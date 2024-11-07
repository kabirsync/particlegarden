import {
  materialOptions,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import MaterialButton from "@/components/simulation/materials/MaterialButton";
import MaterialOptions from "@/components/simulation/materials/MaterialOptions";
import SimulationOptionsButton from "@/components/simulation/SimulationOptionsButton";
import {
  FPSAtom,
  materialColorAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";

import {
  defaultIsPlaying,
  defaultMaterialColor,
  defaultParticleSize,
  fireColor,
  sandColor,
  smokeColor,
  waterColor,
  woodColor,
} from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useAtom } from "jotai";
import { LoaderIcon, Pause, Play } from "lucide-react";
import React, { Suspense, useState } from "react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useState(defaultParticleSize);
  const [materialColorRef] = useAtom(materialColorAtom);
  const [selectedMaterial, setSelectedMaterial] = useAtom(selectedMaterialAtom);
  const [materialColor, setMaterialColor] = useState(defaultMaterialColor);

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
    } else if (newSelectedMaterial === "Smoke") {
      setMaterialColor(smokeColor);
      materialColorRef.current = smokeColor;
    } else if (newSelectedMaterial === "Fire") {
      setMaterialColor(fireColor);
      materialColorRef.current = fireColor;
    }

    setSelectedMaterial(newSelectedMaterial);
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
                particleSize={particleSize}
                selectedMaterial={selectedMaterial}
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
                selectedMaterial={selectedMaterial}
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
