import { MaterialMapping } from "@/components/simulation/materials/Material";
import {
  gridRefAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Triangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

const TriangleDrawButton = ({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}) => {
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

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.lineTo(startPoint.x - (currentX - startPoint.x), currentY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const handleEndDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !gridRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const particleSize = 4;

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    // Calculate triangle points
    const x1 = startPoint.x;
    const y1 = startPoint.y - mobileOffset;
    const x2 = endX;
    const y2 = endY - mobileOffset;
    const x3 = startPoint.x - (endX - startPoint.x);
    const y3 = endY - mobileOffset;

    // Find bounding box of the triangle
    const minX = Math.min(x1, x2, x3);
    const maxX = Math.max(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const maxY = Math.max(y1, y2, y3);

    const startCol = Math.floor(minX / particleSize);
    const endCol = Math.floor(maxX / particleSize);
    const startRow = Math.floor(minY / particleSize);
    const endRow = Math.floor(maxY / particleSize);

    // Function to check if a point is inside the triangle
    const isPointInTriangle = (px: number, py: number) => {
      const area =
        0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
      const s =
        (1 / (2 * area)) *
        (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py);
      const t =
        (1 / (2 * area)) *
        (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py);
      return s >= 0 && t >= 0 && 1 - s - t >= 0;
    };

    // Fill the triangle with particles
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const px = col * particleSize + particleSize / 2;
        const py = row * particleSize + particleSize / 2;

        if (isPointInTriangle(px, py)) {
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

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.lineTo(startPoint.x - (currentX - startPoint.x), currentY);
    ctx.closePath();
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

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    const x1 = startPoint.x;
    const y1 = startPoint.y - mobileOffset;
    const x2 = endX;
    const y2 = endY - mobileOffset;
    const x3 = startPoint.x - (endX - startPoint.x);
    const y3 = endY - mobileOffset;

    const minX = Math.min(x1, x2, x3);
    const maxX = Math.max(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const maxY = Math.max(y1, y2, y3);

    const startCol = Math.floor(minX / particleSize);
    const endCol = Math.floor(maxX / particleSize);
    const startRow = Math.floor(minY / particleSize);
    const endRow = Math.floor(maxY / particleSize);

    const isPointInTriangle = (px: number, py: number) => {
      const area =
        0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
      const s =
        (1 / (2 * area)) *
        (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py);
      const t =
        (1 / (2 * area)) *
        (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py);
      return s >= 0 && t >= 0 && 1 - s - t >= 0;
    };

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const px = col * particleSize + particleSize / 2;
        const py = row * particleSize + particleSize / 2;

        if (isPointInTriangle(px, py)) {
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
        variant={isSelected ? "secondary" : "outline"}
        size="icon"
        onClick={() => {
          setIsDrawing(!isDrawing);
          onClick();
        }}
        className={isDrawing ? "bg-zinc-200 dark:bg-zinc-800" : ""}
      >
        <Triangle className="h-4 w-4" />
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

export default TriangleDrawButton;
