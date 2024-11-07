import EngineOptions from "@/components/simulation/EngineOptions";
import MaterialButton from "@/components/simulation/MaterialButton";
import MaterialOptions from "@/components/simulation/MaterialOptions";
import { materialOptions } from "@/components/simulation/materials/Material";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LoaderIcon } from "lucide-react";
import React, { Suspense } from "react";

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Analytics />
      <SpeedInsights />
      <div className="h-dvh flex flex-col dark:bg-zinc-950 bg-white text-zinc-900 dark:text-zinc-300 ">
        <div className="h-full flex flex-col md:flex-row">
          <div className="flex-1 bg-[#DFDFDF] dark:bg-[#010101]">
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              }
            >
              <Simulation />
            </Suspense>
          </div>
          <div className="sm:min-h-[300px] h-[40%] sm:h-[30%] flex flex-col">
            <div className="h-[60px] border-b border-zinc-400 dark:border-zinc-800 px-3 py-2">
              <EngineOptions />
            </div>
            <div className="h-[calc(100%-60px)] flex w-full">
              <ScrollArea className="h-[100%] flex-1 ">
                <div className="p-3">
                  <MaterialOptions />
                </div>
              </ScrollArea>
              <ScrollArea className="h-[100%] flex-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 content-start gap-4 p-3 border-l border-zinc-400 dark:border-zinc-800">
                  {materialOptions.map((material) => {
                    return (
                      <MaterialButton key={material} material={material} />
                    );
                  })}
                  {materialOptions.map((material) => {
                    return (
                      <MaterialButton key={material} material={material} />
                    );
                  })}
                  {materialOptions.map((material) => {
                    return (
                      <MaterialButton key={material} material={material} />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
