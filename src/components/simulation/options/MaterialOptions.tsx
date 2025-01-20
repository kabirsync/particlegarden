import AcidOptions from "@/components/simulation/options/AcidOptions";
import CircleDrawButton from "@/components/simulation/options/CircleDrawButton";
import CombustibleOptions from "@/components/simulation/options/CombustbleOptions";
import FlammableOptions from "@/components/simulation/options/FlammableOptions";
import LimitedLifeOptions from "@/components/simulation/options/LimitedLifeOptions";
import LiquidOptions from "@/components/simulation/options/LiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import RectangleDrawButton from "@/components/simulation/options/RectangleDrawButton";
import StrokeColorOptions from "@/components/simulation/options/StrokeColorOptions";
import StrokeSizeOptions from "@/components/simulation/options/StrokeSizeOptions";
import TriangleDrawButton from "@/components/simulation/options/TriangleDrawButton";
import { Separator } from "@/components/ui/separator";
import { Brush, Shapes } from "lucide-react";

const MaterialOptions = () => {
  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="px-3 flex flex-col gap-4">
        <div className="text-xs flex gap-2 items-center">
          <Shapes className="h-5 w-5" /> Shapes
        </div>
        <div className="flex gap-4">
          <RectangleDrawButton />
          <CircleDrawButton />
          <TriangleDrawButton />
        </div>
      </div>
      <Separator className="mt-2" />
      <div className="flex flex-col gap-4 px-3">
        <div className="flex gap-2 items-center">
          <Brush className="h-4 w-4" />
          <span className="text-xs font-bold">Stroke</span>
        </div>
        <div className="flex flex-col gap-3">
          <StrokeSizeOptions />
          <StrokeColorOptions />
        </div>
      </div>
      <AcidOptions />
      <LimitedLifeOptions />
      <FlammableOptions />
      <CombustibleOptions />
      <MoveVerticalOptions />
      <LiquidOptions />
    </div>
  );
};

export default MaterialOptions;
