import Likes from "@/components/Likes";
import EngineOptions from "@/components/simulation/options/EngineOptions";
import MaterialOptions from "@/components/simulation/options/MaterialOptions";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { ChevronDownIcon, ChevronUpIcon, LoaderIcon } from "lucide-react";
import { PostHogProvider } from "posthog-js/react";
import React, { Suspense, useEffect, useState } from "react";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  person_profiles: "always" as const,
};

const Simulation = React.lazy(
  () => import("@/components/simulation/Simulation")
);

function App() {
  const [showUpChevron, setShowUpChevron] = useState(false);
  const [showDownChevron, setShowDownChevron] = useState(false);

  useEffect(() => {
    const viewport = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;

    if (!viewport) return;

    const checkScroll = () => {
      const isNotAtTop = viewport.scrollTop > 0;
      const isNotAtBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight > 1;

      setShowUpChevron(isNotAtTop);
      setShowDownChevron(isNotAtBottom);
    };

    viewport.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => viewport.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-dvh flex flex-col dark:bg-zinc-950 bg-white text-zinc-900 dark:text-zinc-300 ">
          <div className="h-full flex flex-col md:flex-row">
            <div className="md:order-2 sm:min-h-[240px] h-[40%] sm:h-[30%] md:h-[100%] md:w-[350px] flex flex-col md:border-l border-zinc-400 dark:border-zinc-800">
              <div className="h-[44px] md:h-[44px] border-b border-zinc-400 dark:border-zinc-800 flex flex-col">
                <EngineOptions />
              </div>
              <div className="h-[calc(100%-44px)] md:h-[calc(100%-44px)] flex flex-col md:items-center w-full border-b md:border-0 border-zinc-400 dark:border-zinc-800">
                <div className="h-5 flex justify-center items-center">
                  {showUpChevron && (
                    <ChevronUpIcon className="w-4 h-4 z-10 bg-white dark:bg-zinc-950 rounded-full" />
                  )}
                </div>
                <ScrollArea className="h-[100%] flex-1 border-r md:border-r-0  border-zinc-400 dark:border-zinc-800 relative">
                  <div className="flex flex-col gap-3">
                    <div className="px-2 pb-2 h-full flex flex-row items-center text-xs border-b border-zinc-400 dark:border-zinc-800">
                      <img
                        src="/animatedparticlegarden.gif"
                        alt="Animated logo"
                        className="w-8 h-8"
                      />
                      <Likes />
                    </div>
                    <MaterialOptions />
                  </div>
                </ScrollArea>
                <div className="h-5 flex justify-center items-center">
                  {showDownChevron && (
                    <ChevronDownIcon className="w-4 h-4  z-10 bg-white dark:bg-zinc-950 rounded-full" />
                  )}
                </div>
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
