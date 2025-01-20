import Wood from "@/components/simulation/materials/Wood";
import { gridRefAtom } from "@/components/simulation/simulationState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Color } from "three";

interface Point {
  x: number;
  y: number;
}

const sRGBToLinear = (c: number): number => {
  if (c <= 0.03928) {
    return c / 12.92;
  }
  return Math.pow((c + 0.055) / 1.055, 2.4);
};

const RectangleImageDrawButton = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gridRef] = useAtom(gridRefAtom);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, [isDrawing]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageAspectRatio(img.width / img.height);
        setImageElement(img);
        setIsDrawing(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      img.src = (e.target?.result as string) ?? "";
    };
    reader.readAsDataURL(file);
  };

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !imageAspectRatio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPoint({ x, y });
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current || !imageAspectRatio)
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.strokeStyle = "rgb(59, 130, 246)";
    ctx.lineWidth = 2;

    const width = currentX - startPoint.x;
    const height = currentY - startPoint.y;

    let finalWidth, finalHeight;
    if (Math.abs(width / imageAspectRatio) > Math.abs(height)) {
      finalWidth = width;
      finalHeight = width / imageAspectRatio;
    } else {
      finalHeight = height;
      finalWidth = height * imageAspectRatio;
    }

    ctx.fillRect(startPoint.x, startPoint.y, finalWidth, finalHeight);
    ctx.strokeRect(startPoint.x, startPoint.y, finalWidth, finalHeight);
  };

  const handleEndDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !imageAspectRatio || !imageElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const width = endX - startPoint.x;
    const height = endY - startPoint.y;

    let finalWidth, finalHeight;
    if (Math.abs(width / imageAspectRatio) > Math.abs(height)) {
      finalWidth = width;
      finalHeight = width / imageAspectRatio;
    } else {
      finalHeight = height;
      finalWidth = height * imageAspectRatio;
    }

    const area = {
      x: width > 0 ? startPoint.x : startPoint.x + finalWidth,
      y: height > 0 ? startPoint.y : startPoint.y + finalHeight,
      width: Math.abs(finalWidth),
      height: Math.abs(finalHeight),
    };

    processImage(imageElement, area);
    setIsDrawing(false);
    setStartPoint(null);
    setImageElement(null);
    setImageAspectRatio(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !imageAspectRatio) return;
    // e.preventDefault(); // Prevent scrolling while drawing

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setStartPoint({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current || !imageAspectRatio)
      return;
    // e.preventDefault();

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

    const width = currentX - startPoint.x;
    const height = currentY - startPoint.y;

    let finalWidth, finalHeight;
    if (Math.abs(width / imageAspectRatio) > Math.abs(height)) {
      finalWidth = width;
      finalHeight = width / imageAspectRatio;
    } else {
      finalHeight = height;
      finalWidth = height * imageAspectRatio;
    }

    ctx.fillRect(startPoint.x, startPoint.y, finalWidth, finalHeight);
    ctx.strokeRect(startPoint.x, startPoint.y, finalWidth, finalHeight);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !imageAspectRatio || !imageElement) return;
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const endX = touch.clientX - rect.left;
    const endY = touch.clientY - rect.top;

    const width = endX - startPoint.x;
    const height = endY - startPoint.y;

    let finalWidth, finalHeight;
    if (Math.abs(width / imageAspectRatio) > Math.abs(height)) {
      finalWidth = width;
      finalHeight = width / imageAspectRatio;
    } else {
      finalHeight = height;
      finalWidth = height * imageAspectRatio;
    }

    const area = {
      x: width > 0 ? startPoint.x : startPoint.x + finalWidth,
      y: height > 0 ? startPoint.y : startPoint.y + finalHeight,
      width: Math.abs(finalWidth),
      height: Math.abs(finalHeight),
    };

    processImage(imageElement, area);
    setIsDrawing(false);
    setStartPoint(null);
    setImageElement(null);
    setImageAspectRatio(null);
  };

  const processImage = (
    img: HTMLImageElement,
    area: {
      width: number;
      height: number;
      x: number;
      y: number;
    }
  ) => {
    if (!area || !gridRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleSize = 4;
    canvas.width = gridRef.current.columns;
    canvas.height = gridRef.current.rows;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
    const isSmall = window.innerWidth < 640; // sm breakpoint in Tailwind
    const mobileOffset = isMobile
      ? isSmall
        ? window.innerHeight * 0.4
        : window.innerHeight * 0.3
      : 0;

    const targetWidth = Math.floor(area.width / particleSize);
    const targetHeight = Math.floor(area.height / particleSize);
    const targetX = Math.floor(area.x / particleSize);
    const targetY = Math.floor((area.y - mobileOffset) / particleSize);

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      targetX,
      targetY,
      targetWidth,
      targetHeight
    );

    const imageColors = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    for (let i = 0; i < canvas.height * canvas.width; i++) {
      const r = sRGBToLinear(imageColors[i * 4] / 255);
      const g = sRGBToLinear(imageColors[i * 4 + 1] / 255);
      const b = sRGBToLinear(imageColors[i * 4 + 2] / 255);
      const a = imageColors[i * 4 + 3] / 255;

      const col = i % canvas.width;
      const row = Math.floor(i / canvas.width);

      const isInTargetArea =
        col >= targetX &&
        col < targetX + targetWidth &&
        row >= targetY &&
        row < targetY + targetHeight;

      if (isInTargetArea && a > 0.1) {
        gridRef.current.set(
          col,
          row,
          new Wood(row * canvas.width + col, {
            color: new Color(r, g, b),
            _skipColorVariation: true,
          })
        );
      }
    }

    toast.success("Image placed successfully!");
  };

  return (
    <div className="text-xs">
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="text-xs"
      >
        <ImageIcon className="h-4 w-4" /> Upload Image
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
            touchAction: "none", // Prevent default touch actions
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

export default RectangleImageDrawButton;
