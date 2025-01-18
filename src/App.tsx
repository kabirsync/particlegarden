import { selectableMaterialOptions } from "@/components/simulation/materials/Material";
import EngineOptions from "@/components/simulation/options/EngineOptions";
import MaterialButton from "@/components/simulation/options/MaterialButton";
import MaterialOptions from "@/components/simulation/options/MaterialOptions";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LoaderIcon } from "lucide-react";
import React, { Suspense } from "react";
import ImageUpload from "@/components/ImageUpload";
import { PostHogProvider } from "posthog-js/react";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Analytics />
        <SpeedInsights />
        <div className="h-dvh flex flex-col dark:bg-zinc-950 bg-white text-zinc-900 dark:text-zinc-300 ">
          <div className="h-full flex flex-col md:flex-row">
            <div className="md:order-2 sm:min-h-[240px] h-[40%] sm:h-[30%] md:h-[100%] md:w-[350px] flex flex-col md:border-l border-zinc-400 dark:border-zinc-800">
              <div className="h-[40px] md:h-[60px] border-b border-zinc-400 dark:border-zinc-800 px-3 py-2">
                <EngineOptions />
              </div>
              <div className="h-[calc(100%-40px)] md:h-[calc(100%-60px)] flex md:flex-col w-full border-b md:border-0 border-zinc-400 dark:border-zinc-800">
                <ScrollArea className="order-2 md:order-1  h-[100%] flex-1  p-3">
                  <div className="flex flex-col justify-between h-full">
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 content-start gap-4">
                      {selectableMaterialOptions.map((material) => {
                        return (
                          <MaterialButton key={material} material={material} />
                        );
                      })}
                    </div>
                    <ImageUpload />
                  </div>
                </ScrollArea>
                <ScrollArea className="order-1 md:order-2 h-[100%] flex-1 border-r md:border-r-0 md:border-t border-zinc-400 dark:border-zinc-800 py-3">
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
        <Toaster />
      </ThemeProvider>
    </PostHogProvider>
  );
}

export default App;
