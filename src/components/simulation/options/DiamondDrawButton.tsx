import { MaterialMapping } from "@/components/simulation/materials/Material";
import {
  gridRefAtom,
  materialColorRefAtom,
  selectedMaterialAtom,
} from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Diamond } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

const DiamondDrawButton = ({
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

    const width = Math.abs(currentX - startPoint.x) * 2;
    const height = Math.abs(currentY - startPoint.y) * 2;

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y - height / 2);
    ctx.lineTo(startPoint.x + width / 2, startPoint.y);
    ctx.lineTo(startPoint.x, startPoint.y + height / 2);
    ctx.lineTo(startPoint.x - width / 2, startPoint.y);
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
    const width = Math.abs(endX - startPoint.x) * 2;
    const height = Math.abs(endY - startPoint.y) * 2;

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    const startCol = Math.floor((startPoint.x - width / 2) / particleSize);
    const startRow = Math.floor(
      (startPoint.y - height / 2 - mobileOffset) / particleSize
    );
    const endCol = Math.floor((startPoint.x + width / 2) / particleSize);
    const endRow = Math.floor(
      (startPoint.y + height / 2 - mobileOffset) / particleSize
    );

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const px = col * particleSize + particleSize / 2;
        const py = row * particleSize + particleSize / 2;

        const dx = Math.abs(px - startPoint.x);
        const dy = Math.abs(py - (startPoint.y - mobileOffset));
        if (dx / (width / 2) + dy / (height / 2) <= 1) {
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

    const width = Math.abs(currentX - startPoint.x) * 2;
    const height = Math.abs(currentY - startPoint.y) * 2;

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y - height / 2);
    ctx.lineTo(startPoint.x + width / 2, startPoint.y);
    ctx.lineTo(startPoint.x, startPoint.y + height / 2);
    ctx.lineTo(startPoint.x - width / 2, startPoint.y);
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
    const width = Math.abs(endX - startPoint.x) * 2;
    const height = Math.abs(endY - startPoint.y) * 2;

    const isMobile = window.innerWidth < 768;
    const isSmall = window.innerWidth < 640;
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    const startCol = Math.floor((startPoint.x - width / 2) / particleSize);
    const startRow = Math.floor(
      (startPoint.y - height / 2 - mobileOffset) / particleSize
    );
    const endCol = Math.floor((startPoint.x + width / 2) / particleSize);
    const endRow = Math.floor(
      (startPoint.y + height / 2 - mobileOffset) / particleSize
    );

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const px = col * particleSize + particleSize / 2;
        const py = row * particleSize + particleSize / 2;

        const dx = Math.abs(px - startPoint.x);
        const dy = Math.abs(py - (startPoint.y - mobileOffset));
        if (dx / (width / 2) + dy / (height / 2) <= 1) {
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
        <Diamond className="h-4 w-4" />
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
          onTouchStart={(e) => {
            const target = e.currentTarget;
            const passiveListener = () => {};
            target.addEventListener("touchstart", passiveListener, {
              passive: true,
            });
            handleTouchStart(e);
            // Clean up by removing the listener
            target.removeEventListener("touchstart", passiveListener);
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
};

export default DiamondDrawButton;
