import { useCallback } from "react";
import { Color } from "three";
import Wood from "@/components/simulation/materials/Wood";
import { Grid } from "@/components/simulation/Grid";

interface UseImageProcessorProps {
  columns: number;
  rows: number;
  gridRef: React.MutableRefObject<Grid | null>;
}

const sRGBToLinear = (c: number): number => {
  if (c <= 0.03928) {
    return c / 12.92;
  }
  return Math.pow((c + 0.055) / 1.055, 2.4);
};

export const useImageProcessor = ({
  columns,
  rows,
  gridRef,
}: UseImageProcessorProps) => {
  const processImage = useCallback(
    (imageData: HTMLImageElement) => {
      if (!imageData || !gridRef.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate dimensions maintaining aspect ratio
      const imageAspectRatio = imageData.width / imageData.height;
      const gridAspectRatio = columns / rows;

      let targetWidth,
        targetHeight,
        offsetX = 0,
        offsetY = 0;

      if (imageAspectRatio > gridAspectRatio) {
        targetWidth = columns;
        targetHeight = columns / imageAspectRatio;
        offsetY = (rows - targetHeight) / 2;
      } else {
        targetHeight = rows;
        targetWidth = rows * imageAspectRatio;
        offsetX = (columns - targetWidth) / 2;
      }

      canvas.width = columns;
      canvas.height = rows;
      ctx.clearRect(0, 0, columns, rows);

      ctx.drawImage(
        imageData,
        Math.round(offsetX),
        Math.round(offsetY),
        Math.round(targetWidth),
        Math.round(targetHeight)
      );

      const imageColors = ctx.getImageData(0, 0, columns, rows).data;
      gridRef.current.clear();

      for (let i = 0; i < rows * columns; i++) {
        const r = sRGBToLinear(imageColors[i * 4] / 255);
        const g = sRGBToLinear(imageColors[i * 4 + 1] / 255);
        const b = sRGBToLinear(imageColors[i * 4 + 2] / 255);
        const a = imageColors[i * 4 + 3] / 255;

        if (a > 0.1) {
          const col = i % columns;
          const row = Math.floor(i / columns);
          const exactColor = new Color(r, g, b);
          gridRef.current.set(
            col,
            row,
            new Wood(row * columns + col, {
              color: exactColor,
              _skipColorVariation: true,
            })
          );
        }
      }
    },
    [columns, rows, gridRef]
  );

  return { processImage };
};
