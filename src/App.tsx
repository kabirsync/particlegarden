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
          <div className="md:order-2 sm:min-h-[240px] h-[40%] sm:h-[30%] md:h-[100%] md:w-[340px] flex flex-col md:border-l border-zinc-400 dark:border-zinc-800">
            <div className="h-[40px] md:h-[60px] border-b border-zinc-400 dark:border-zinc-800 px-3 py-2">
              <EngineOptions />
            </div>
            <div className="h-[calc(100%-40px)] md:h-[calc(100%-60px)] flex md:flex-col w-full border-b md:border-0 border-zinc-400 dark:border-zinc-800">
              <ScrollArea className="order-2 md:order-1  h-[100%] flex-1  p-3">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 content-start gap-4">
                  {materialOptions.map((material) => {
                    return (
                      <MaterialButton key={material} material={material} />
                    );
                  })}
                </div>
              </ScrollArea>
              <ScrollArea className="order-1 md:order-2 h-[100%] flex-1 border-r md:border-r-0 md:border-t border-zinc-400 dark:border-zinc-800 p-3">
                <MaterialOptions />
              </ScrollArea>
            </div>
          </div>
          <div className="md:order-1 flex-1 bg-[#DFDFDF] dark:bg-[#010101]">
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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
