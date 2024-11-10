import MoveVerticalLiquidOptions from "@/components/simulation/options/MovesVerticalLiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import StrokeColorOptions from "@/components/simulation/options/StrokeColorOptions";
import StrokeSizeOptions from "@/components/simulation/options/StrokeSizeOptions";
import { selectedMaterialAtom } from "@/components/simulation/simulationState";
import { Separator } from "@/components/ui/separator";
import { useAtom } from "jotai";
import { ArrowUpDown, Brush, Droplet } from "lucide-react";

const MaterialOptions = () => {
  const [selectedMaterial] = useAtom(selectedMaterialAtom);

  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="flex flex-col gap-4 px-3">
        <div className="flex gap-2 items-center">
          <Brush className="h-4 w-4 text-zinc-300" />
          <span className="text-xs font-bold">Stroke</span>
        </div>
        <div className="flex flex-col gap-3">
          <StrokeSizeOptions />
          {[
            "Sand",
            "Wood",
            "Water",
            "Smoke",
            "Acid",
            "Gas",
            "Oil",
            "Stone",
          ].includes(selectedMaterial) && <StrokeColorOptions />}
        </div>
      </div>
      <Separator className="mt-2" />

      {["Sand", "Water", "Smoke", "Acid", "Lava", "Gas", "Oil"].includes(
        selectedMaterial
      ) && (
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <ArrowUpDown className="h-4 w-4 text-zinc-300 " />
            <span className="text-xs font-bold">Vertical Movement</span>
          </div>
          <MoveVerticalOptions />
        </div>
      )}
      <Separator className="mt-2" />

      {["Water", "Smoke", "Acid", "Lava", "Oil", "Gas"].includes(
        selectedMaterial
      ) && (
        <div className="px-3 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Droplet className="h-4 w-4 text-zinc-300 " />
            <span className="text-xs font-bold">Liquid Movement</span>
          </div>
          <MoveVerticalLiquidOptions />
        </div>
      )}
    </div>
  );
};

export default MaterialOptions;
