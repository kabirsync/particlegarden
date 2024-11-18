import { Grid } from "@/components/simulation/Grid";
import SimulationOptionsButton from "@/components/simulation/options/SimulationOptionsButton";
import {
  FPSAtom,
  gridRefAtom,
  isPlayingAtom,
  particleSizeAtom,
  refreshAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtom } from "jotai";
import { FileUp, Pause, Play, RefreshCcw, Save } from "lucide-react";
import pako from "pako";
import { useState } from "react";
import { toast } from "sonner";

const EngineOptions = () => {
  const [, setRefresh] = useAtom(refreshAtom);
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useAtom(particleSizeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [gridRef] = useAtom(gridRefAtom);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRefresh = () => {
    setRefresh(Date.now());
    setIsOpen(false);
  };

  const getLocalStorageSize = () => {
    let total = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += key.length + localStorage[key].length;
      }
    }
    console.log(`LocalStorage Size: ${(total / 1024).toFixed(2)} KB`);
  };

  const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
    const chunkSize = 8192;
    let base64 = "";
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      base64 += String.fromCharCode(...uint8Array.subarray(i, i + chunkSize));
    }
    return btoa(base64);
  };

  const base64ToUint8Array = (base64: string) => {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  };
  const formatCurrentDate = (): string => {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleSave = () => {
    try {
      const jsonString = JSON.stringify(gridRef.current);

      const compressedData = pako.deflate(jsonString);
      const compressedBase64 = uint8ArrayToBase64(compressedData);

      localStorage.setItem("gridData", compressedBase64);
      toast("Canvas has been saved", {
        description: formatCurrentDate(),
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
      console.log("Data successfully compressed and saved!");

      // Todo: this is only for debuggins, remove
      getLocalStorageSize();
    } catch (error) {
      console.error("Error compressing and saving data:", error);
    }
  };

  const handleLoad = () => {
    getLocalStorageSize();

    try {
      const compressedBase64 = localStorage.getItem("gridData");

      if (compressedBase64) {
        const compressedData = base64ToUint8Array(compressedBase64);
        const decompressedData = pako.inflate(compressedData, { to: "string" });
        const gridData: Grid = JSON.parse(decompressedData);
        gridRef.current = Grid.fromJSON(gridData);
        toast("Canvas loaded successfully", {
          description: formatCurrentDate(),
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });
      } else {
        console.log("No data found in localStorage.");
      }
    } catch (error) {
      console.error("Error decompressing and loading data:", error);
    }
  };
  return (
    <div className="h-full flex flex-row items-center text-xs">
      <div className="h-10 min-w-12 flex-1 justify-start flex items-center">
        <span>{FPS} FPS</span>
      </div>
      <div className="flex-1 flex justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleIsPlaying}>
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Pause/Play</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <RefreshCcw />
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <TooltipContent>
                <p className="text-xs">Reset Canvas</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="text-xs">
              <p>Are you sure you want to reset the canvas?</p>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  className="text-xs"
                  variant="outline"
                  onClick={handleRefresh}
                >
                  Yes
                </Button>
                <Button
                  className="text-xs"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>

              {/* <PopoverArrow className="fill-popover" /> */}
            </PopoverContent>
          </Popover>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Save</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleLoad}>
                <FileUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Load</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex-1 flex justify-end">
        <SimulationOptionsButton
          particleSize={particleSize}
          setParticleSize={setParticleSize}
        />
      </div>
    </div>
  );
};

export default EngineOptions;
