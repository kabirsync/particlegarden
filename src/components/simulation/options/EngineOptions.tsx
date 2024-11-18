import { Grid } from "@/components/simulation/Grid";
import SimulationOptionsButton from "@/components/simulation/options/SimulationOptionsButton";
import {
  FPSAtom,
  gridRefAtom,
  isPlayingAtom,
  particleSizeAtom,
  refreshAtom,
} from "@/components/simulation/simulationState";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import Discord from "@/components/ui/discord";
import { useAtom } from "jotai";
import {
  FileUp,
  MessageSquareText,
  Pause,
  Play,
  RefreshCcw,
  Save,
} from "lucide-react";
import pako from "pako";

const EngineOptions = () => {
  const [, setRefresh] = useAtom(refreshAtom);
  const [FPS] = useAtom(FPSAtom);
  const [particleSize, setParticleSize] = useAtom(particleSizeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [gridRef] = useAtom(gridRefAtom);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRefresh = () => {
    setRefresh(Date.now());
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

  const handleSave = () => {
    try {
      const jsonString = JSON.stringify(gridRef.current);

      const compressedData = pako.deflate(jsonString);
      const compressedBase64 = uint8ArrayToBase64(compressedData);

      localStorage.setItem("gridData", compressedBase64);

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
        <Button variant="ghost" size="icon" onClick={toggleIsPlaying}>
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleSave}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLoad}>
          <FileUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://forms.gle/FFmkrXfJjw4n7GFh9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquareText className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://discord.gg/Gt5sS2xYtK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord className="h-4 w-4 fill-zinc-50" />
          </a>
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
  );
};

export default EngineOptions;
