import AcidOptions from "@/components/simulation/options/AcidOptions";
import CombustibleOptions from "@/components/simulation/options/CombustbleOptions";
import FlammableOptions from "@/components/simulation/options/FlammableOptions";
import LimitedLifeOptions from "@/components/simulation/options/LimitedLifeOptions";
import LiquidOptions from "@/components/simulation/options/LiquidOptions";
import MoveVerticalOptions from "@/components/simulation/options/MoveVerticalOptions";
import StrokeColorOptions from "@/components/simulation/options/StrokeColorOptions";
import StrokeSizeOptions from "@/components/simulation/options/StrokeSizeOptions";
import {
  drawModeAtom,
  drawModeRefAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAtom } from "jotai";
import { Brush, Circle, Diamond, Shapes, Square, Triangle } from "lucide-react";
import { useEffect } from "react";

const MaterialOptions = () => {
  const [drawMode, setDrawMode] = useAtom(drawModeAtom);
  const [drawModeRef] = useAtom(drawModeRefAtom);

  const handleBrushDraw = () => {
    setDrawMode("brush");
    drawModeRef.current = "brush";
  };

  const handleCircleDraw = () => {
    setDrawMode("circle");
    drawModeRef.current = "circle";
  };

  const handleRectangleDraw = () => {
    setDrawMode("rectangle");
    drawModeRef.current = "rectangle";
  };

  const handleTriangleDraw = () => {
    setDrawMode("triangle");
    drawModeRef.current = "triangle";
  };

  const handleDiamondDraw = () => {
    setDrawMode("diamond");
    drawModeRef.current = "diamond";
  };

  useEffect(() => {
    setDrawMode(drawModeRef.current);
  }, [drawModeRef, setDrawMode]);

  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="px-3 flex flex-col gap-4">
        <div className="text-xs flex gap-2 items-center">
          <Shapes className="h-5 w-5" /> Shapes
        </div>
        <div className="flex gap-4 flex-wrap">
          <Button
            variant={drawMode === "brush" ? "secondary" : "outline"}
            size="icon"
            onClick={handleBrushDraw}
            className="transition-none"
          >
            <Brush className="h-4 w-4" />
          </Button>
          <Button
            variant={drawMode === "rectangle" ? "secondary" : "outline"}
            size="icon"
            onClick={handleRectangleDraw}
            className="transition-none"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={drawMode === "circle" ? "secondary" : "outline"}
            size="icon"
            onClick={handleCircleDraw}
            className="transition-none"
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant={drawMode === "triangle" ? "secondary" : "outline"}
            size="icon"
            onClick={handleTriangleDraw}
            className="transition-none"
          >
            <Triangle className="h-4 w-4" />
          </Button>
          <Button
            variant={drawMode === "diamond" ? "secondary" : "outline"}
            size="icon"
            onClick={handleDiamondDraw}
            className="transition-none"
          >
            <Diamond className="h-4 w-4" />
          </Button>
          {/* <RectangleDrawButton
            onClick={() => setDrawMode("rectangle")}
            isSelected={drawMode === "rectangle"}
          />
          <CircleDrawButton
            onClick={() => setDrawMode("circle")}
            isSelected={drawMode === "circle"}
          />
          <TriangleDrawButton
            onClick={() => setDrawMode("triangle")}
            isSelected={drawMode === "triangle"}
          />
          <DiamondDrawButton
            onClick={() => setDrawMode("diamond")}
            isSelected={drawMode === "diamond"}
          /> */}
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
