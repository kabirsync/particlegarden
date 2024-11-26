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
import {
  formatCurrentDate,
  handleLoadFromLocalStorage,
  handleSaveToLocalStorage,
} from "@/lib/utils";
import { useAtom } from "jotai";
import { FileUp, Pause, Play, RotateCw, Save, Undo2 } from "lucide-react";
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

  const handleSave = () => {
    handleSaveToLocalStorage({
      gridRef,
      onSucces: () => {
        toast("Canvas has been saved", {
          description: formatCurrentDate(),
        });
      },
    });
  };

  const handleLoad = () => {
    handleLoadFromLocalStorage({
      key: "gridData",
      gridRef,
      onSucces: () => {
        toast("Canvas loaded successfully", {
          description: formatCurrentDate(),
        });
      },
    });
  };

  const handleUndo = () => {
    handleLoadFromLocalStorage({
      key: "autoSave",
      gridRef,
      onSucces: () => {
        toast("Undo Successful", {
          description: formatCurrentDate(),
        });
      },
    });
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
              <Button variant="ghost" size="icon" onClick={handleUndo}>
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Undo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
                    <RotateCw className="h-4 w-4" />
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
