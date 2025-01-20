import { MaterialMapping } from "@/components/simulation/materials/Material";
import {
  gridRefAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

const CircleDrawButton = () => {
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

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.strokeStyle = "rgb(59, 130, 246)";
    ctx.lineWidth = 2;

    const radius = Math.sqrt(
      Math.pow(currentX - startPoint.x, 2) +
        Math.pow(currentY - startPoint.y, 2)
    );

    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  const handleEndDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !gridRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const particleSize = 4;
    const radius = Math.sqrt(
      Math.pow(endX - startPoint.x, 2) + Math.pow(endY - startPoint.y, 2)
    );

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    // Calculate the bounding box of the circle
    const startCol = Math.floor((startPoint.x - radius) / particleSize);
    const startRow = Math.floor(
      (startPoint.y - radius - mobileOffset) / particleSize
    );
    const endCol = Math.floor((startPoint.x + radius) / particleSize);
    const endRow = Math.floor(
      (startPoint.y + radius - mobileOffset) / particleSize
    );

    // Fill the circle with particles
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const dx = col * particleSize + particleSize / 2 - startPoint.x;
        const dy =
          row * particleSize + particleSize / 2 - (startPoint.y - mobileOffset);

        // Check if the current particle is within the circle
        if (dx * dx + dy * dy <= radius * radius) {
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
    }

    setIsDrawing(false);
    setStartPoint(null);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setStartPoint({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.strokeStyle = "rgb(59, 130, 246)";
    ctx.lineWidth = 2;

    const radius = Math.sqrt(
      Math.pow(currentX - startPoint.x, 2) +
        Math.pow(currentY - startPoint.y, 2)
    );

    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !gridRef.current) return;
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const endX = touch.clientX - rect.left;
    const endY = touch.clientY - rect.top;

    const particleSize = 4;
    const radius = Math.sqrt(
      Math.pow(endX - startPoint.x, 2) + Math.pow(endY - startPoint.y, 2)
    );

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    const startCol = Math.floor((startPoint.x - radius) / particleSize);
    const startRow = Math.floor(
      (startPoint.y - radius - mobileOffset) / particleSize
    );
    const endCol = Math.floor((startPoint.x + radius) / particleSize);
    const endRow = Math.floor(
      (startPoint.y + radius - mobileOffset) / particleSize
    );

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const dx = col * particleSize + particleSize / 2 - startPoint.x;
        const dy =
          row * particleSize + particleSize / 2 - (startPoint.y - mobileOffset);

        if (dx * dx + dy * dy <= radius * radius) {
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
    }

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
        <Circle className="h-4 w-4" />
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
            touchAction: "none",
          }}
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDrawing}
          onMouseUp={handleEndDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
};

export default CircleDrawButton;
