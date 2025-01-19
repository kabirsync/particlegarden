import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import {
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { MaterialMapping } from "@/components/simulation/materials/Material";
import { gridRefAtom } from "@/components/simulation/simulationState";

interface Point {
  x: number;
  y: number;
}

const RectangleDrawButton = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [gridRef] = useAtom(gridRefAtom);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, [isDrawing]);

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Clear previous rectangle
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw new rectangle with semi-transparent blue fill
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"; // blue-500 with 0.2 opacity
    ctx.strokeStyle = "rgb(59, 130, 246)"; // blue-500
    ctx.lineWidth = 2;

    const width = currentX - startPoint.x;
    const height = currentY - startPoint.y;

    ctx.fillRect(startPoint.x, startPoint.y, width, height);
    ctx.strokeRect(startPoint.x, startPoint.y, width, height);
  };

  const handleEndDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !gridRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const particleSize = 4; // Match your simulation's particle size

    // Calculate grid coordinates
    const startCol = Math.floor(Math.min(startPoint.x, endX) / particleSize);
    const startRow = Math.floor(Math.min(startPoint.y, endY) / particleSize);
    const endCol = Math.floor(Math.max(startPoint.x, endX) / particleSize);
    const endRow = Math.floor(Math.max(startPoint.y, endY) / particleSize);

    // Fill the rectangle with wood particles
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const MaterialClass = MaterialMapping[selectedMaterial];
        gridRef.current.set(
          col,
          row,
          new MaterialClass(row * gridRef.current.columns + col, {
            color: materialColorRef.current,
          })
        );
      }
    }

    // Reset drawing state
    setIsDrawing(false);
    setStartPoint(null);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsDrawing(!isDrawing)}
        className={isDrawing ? "bg-zinc-200 dark:bg-zinc-800" : ""}
      >
        <Square className="h-4 w-4" />
      </Button>
      {isDrawing && (
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 50,
            pointerEvents: "all",
            cursor: "crosshair",
          }}
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDrawing}
          onMouseUp={handleEndDrawing}
        />
      )}
    </div>
  );
};

export default RectangleDrawButton;
