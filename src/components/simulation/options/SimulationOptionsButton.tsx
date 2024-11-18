import { useTheme } from "@/components/theme/useTheme";
import { Button } from "@/components/ui/button";
import Discord from "@/components/ui/discord";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MessageSquareText, Moon, Settings, Sun } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SimulationOptionsButtonProps = {
  particleSize: number;
  setParticleSize: Dispatch<SetStateAction<number>>;
};

const SimulationOptionsButton = ({
  particleSize,
  setParticleSize,
}: SimulationOptionsButtonProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" side="bottom" align="start">
        {/* <DropdownMenuLabel className="text-xs">
          Simulation Settings
        </DropdownMenuLabel> */}
        <Button
          variant="ghost"
          onClick={handleThemeToggle}
          className="w-full flex justify-start gap-3 p-3"
        >
          {theme === "light" ? (
            <>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="text-xs">Light Mode</span>{" "}
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="text-xs">Dark Mode</span>{" "}
            </>
          )}
          {/* <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="text-xs">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span> */}
        </Button>
        <Button
          variant="ghost"
          asChild
          className="w-full flex justify-start gap-3 p-3"
        >
          <a
            href="https://forms.gle/FFmkrXfJjw4n7GFh9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquareText className="h-4 w-4" />
            <span className="text-xs">Feedback</span>
          </a>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="w-full flex justify-start gap-3 p-3"
        >
          <a
            href="https://discord.gg/Gt5sS2xYtK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord className="h-4 w-4 fill-zinc-700 dark:fill-zinc-50" />
            <span className="text-xs">Discord</span>
          </a>
        </Button>

        <div className="flex flex-col gap-2 p-3">
          <Label htmlFor="particleSize" className="text-xs">
            Particle Size: {particleSize}
          </Label>
          <Slider
            id="particleSize"
            className="py-1"
            defaultValue={[10]}
            value={[particleSize]}
            min={1}
            max={20}
            step={1}
            onValueChange={(values: number[]) => {
              setParticleSize(values[0]);
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SimulationOptionsButton;
