import CombustibleOptions from "@/components/simulation/options/CombustbleOptions";
import FlammableOptions from "@/components/simulation/options/FlammableOptions";
import LimitedLifeOptions from "@/components/simulation/options/LimitedLifeOptions";
import AcidOptions from "@/components/simulation/options/AcidOptions";
import LiquidOptions from "@/components/simulation/options/LiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import StrokeColorOptions from "@/components/simulation/options/StrokeColorOptions";
import StrokeSizeOptions from "@/components/simulation/options/StrokeSizeOptions";
import { selectedMaterialAtom } from "@/components/simulation/simulationState";
import { Separator } from "@/components/ui/separator";
import { useAtom } from "jotai";
import {
  ArrowUpDown,
  Brush,
  Clock,
  Droplet,
  FlameIcon,
  FlaskConical,
} from "lucide-react";

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
            "Cloner",
            "Void",
          ].includes(selectedMaterial) && <StrokeColorOptions />}
        </div>
      </div>
      {["Acid"].includes(selectedMaterial) && (
        <>
          <Separator className="mt-2" />
          <div className="px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <FlaskConical className="h-4 w-4 text-green-500 " />
              <span className="text-xs font-bold">Acid</span>
            </div>
            <AcidOptions />
          </div>
        </>
      )}
      {["Smoke"].includes(selectedMaterial) && (
        <>
          <Separator className="mt-2" />
          <div className="px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Clock className="h-4 w-4 text-yellow-500 " />
              <span className="text-xs font-bold">Limited Life</span>
            </div>
            <LimitedLifeOptions />
          </div>
        </>
      )}
      {["Fire", "Lava", "Wood", "Oil", "Gas"].includes(selectedMaterial) && (
        <>
          <Separator className="mt-2" />
          <div className="px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <FlameIcon className="h-4 w-4 text-red-500 " />
              <span className="text-xs font-bold">Flammable</span>
            </div>
            <FlammableOptions />
          </div>
        </>
      )}{" "}
      {["Wood", "Oil", "Gas"].includes(selectedMaterial) && (
        <>
          <div className="px-3 flex flex-col gap-4">
            <CombustibleOptions />
          </div>
        </>
      )}
      {[
        "Sand",
        "Water",
        "Smoke",
        "Acid",
        "Lava",
        "Gas",
        "Oil",
        "Fire",
      ].includes(selectedMaterial) && (
        <>
          <Separator className="mt-2" />
          <div className="px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <ArrowUpDown className="h-4 w-4 text-purple-500 " />
              <span className="text-xs font-bold">Vertical Movement</span>
            </div>
            <MoveVerticalOptions />
          </div>
        </>
      )}
      {["Water", "Smoke", "Acid", "Lava", "Oil", "Gas"].includes(
        selectedMaterial
      ) && (
        <>
          <Separator className="mt-2" />
          <div className="px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Droplet className="h-4 w-4 text-blue-500 " />
              <span className="text-xs font-bold">Liquid Movement</span>
            </div>
            <LiquidOptions />
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialOptions;
