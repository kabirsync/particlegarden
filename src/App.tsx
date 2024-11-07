import EngineOptions from "@/components/simulation/EngineOptions";
import { FPSAtom } from "@/components/simulation/simulationState";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import { defaultIsPlaying, defaultParticleSize } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import React, { Suspense, useState } from "react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useState(defaultParticleSize);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
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
              <Simulation isPlaying={isPlaying} particleSize={particleSize} />
            </Suspense>
          </div>
          <EngineOptions
            FPS={FPS}
            setParticleSize={setParticleSize}
            particleSize={particleSize}
            isPlaying={isPlaying}
            toggleIsPlaying={toggleIsPlaying}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
