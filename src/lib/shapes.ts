import { Point } from "@/types";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";

interface ShapeCheckProps {
  col: number;
  row: number;
  startPoint: Point;
  mouseColumn: number;
  mouseRow: number;
}

interface TrianglePointProps {
  px: number;
  py: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

interface DrawShapeProps {
  startPoint: Point;
  mouseColumn: number;
  mouseRow: number;
  columns: number;
  rows: number;
  selectedMaterial: MaterialOptionsType;
  handleMouseAction: (
    col: number,
    row: number,
    material: MaterialOptionsType,
    size: number
  ) => void;
}

export const isInCircle = ({
  col,
  row,
  startPoint,
  mouseColumn,
  mouseRow,
}: ShapeCheckProps): boolean => {
  const dx = col - startPoint.x;
  const dy = row - startPoint.y;
  const radius = Math.sqrt(
    Math.pow(mouseColumn - startPoint.x, 2) +
      Math.pow(mouseRow - startPoint.y, 2)
  );
  return dx * dx + dy * dy <= radius * radius;
};

export const isInRectangle = ({
  col,
  row,
  startPoint,
  mouseColumn,
  mouseRow,
}: ShapeCheckProps): boolean => {
  const left = Math.min(startPoint.x, mouseColumn);
  const right = Math.max(startPoint.x, mouseColumn);
  const top = Math.min(startPoint.y, mouseRow);
  const bottom = Math.max(startPoint.y, mouseRow);
  return col >= left && col <= right && row >= top && row <= bottom;
};

export const isInTriangle = ({
  col,
  row,
  startPoint,
  mouseColumn,
  mouseRow,
}: ShapeCheckProps): boolean => {
  const dx = mouseColumn - startPoint.x;
  const dy = mouseRow - startPoint.y;

  const minX = Math.min(startPoint.x, startPoint.x + dx);
  const maxX = Math.max(startPoint.x, startPoint.x + dx);
  const minY = Math.min(startPoint.y, startPoint.y + dy);
  const maxY = Math.max(startPoint.y, startPoint.y + dy);

  if (col < minX || col > maxX || row < minY || row > maxY) {
    return false;
  }

  return isPointInTriangle({
    px: col,
    py: row,
    x1: startPoint.x,
    y1: startPoint.y,
    x2: startPoint.x + dx,
    y2: startPoint.y,
    x3: startPoint.x + dx / 2,
    y3: startPoint.y + dy,
  });
};

export const isInDiamond = ({
  col,
  row,
  startPoint,
  mouseColumn,
  mouseRow,
}: ShapeCheckProps): boolean => {
  const dx = mouseColumn - startPoint.x;
  const dy = mouseRow - startPoint.y;
  const normalizedX = Math.abs(col - startPoint.x) / Math.abs(dx);
  const normalizedY = Math.abs(row - startPoint.y) / Math.abs(dy);
  return normalizedX + normalizedY <= 1;
};

export const isPointInTriangle = ({
  px,
  py,
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
}: TrianglePointProps): boolean => {
  const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2;
  const a1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)) / 2;
  const a2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py)) / 2;
  const a3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py)) / 2;
  return Math.abs(area - (a1 + a2 + a3)) < 0.01;
};

export const drawCircle = ({
  startPoint,
  mouseColumn,
  mouseRow,
  columns,
  rows,
  selectedMaterial,
  handleMouseAction,
}: DrawShapeProps): void => {
  const radius = Math.sqrt(
    Math.pow(mouseColumn - startPoint.x, 2) +
      Math.pow(mouseRow - startPoint.y, 2)
  );

  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      if (x * x + y * y <= radius * radius) {
        const col = Math.floor(startPoint.x + x);
        const row = Math.floor(startPoint.y + y);
        if (col >= 0 && col < columns && row >= 0 && row < rows) {
          handleMouseAction(col, row, selectedMaterial, 1);
        }
      }
    }
  }
};

export const drawRectangle = ({
  startPoint,
  mouseColumn,
  mouseRow,
  columns,
  rows,
  selectedMaterial,
  handleMouseAction,
}: DrawShapeProps): void => {
  const left = Math.min(startPoint.x, mouseColumn);
  const right = Math.max(startPoint.x, mouseColumn);
  const top = Math.min(startPoint.y, mouseRow);
  const bottom = Math.max(startPoint.y, mouseRow);

  for (let row = top; row <= bottom; row++) {
    for (let col = left; col <= right; col++) {
      if (col >= 0 && col < columns && row >= 0 && row < rows) {
        handleMouseAction(col, row, selectedMaterial, 1);
      }
    }
  }
};

export const drawTriangle = ({
  startPoint,
  mouseColumn,
  mouseRow,

  selectedMaterial,
  handleMouseAction,
}: DrawShapeProps): void => {
  const dx = mouseColumn - startPoint.x;
  const dy = mouseRow - startPoint.y;

  if (Math.abs(dx) <= 1 || Math.abs(dy) <= 1) {
    handleMouseAction(startPoint.x, startPoint.y, selectedMaterial, 1);
    return;
  }

  const minX = Math.min(startPoint.x, startPoint.x + dx);
  const maxX = Math.max(startPoint.x, startPoint.x + dx);
  const minY = Math.min(startPoint.y, startPoint.y + dy);
  const maxY = Math.max(startPoint.y, startPoint.y + dy);

  for (let row = minY; row <= maxY; row++) {
    for (let col = minX; col <= maxX; col++) {
      if (
        isPointInTriangle({
          px: col,
          py: row,
          x1: startPoint.x,
          y1: startPoint.y,
          x2: startPoint.x + dx,
          y2: startPoint.y,
          x3: startPoint.x + dx / 2,
          y3: startPoint.y + dy,
        })
      ) {
        handleMouseAction(col, row, selectedMaterial, 1);
      }
    }
  }
};

export const drawDiamond = ({
  startPoint,
  mouseColumn,
  mouseRow,
  columns,
  rows,
  selectedMaterial,
  handleMouseAction,
}: DrawShapeProps): void => {
  const dx = mouseColumn - startPoint.x;
  const dy = mouseRow - startPoint.y;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const normalizedX = Math.abs(col - startPoint.x) / Math.abs(dx);
      const normalizedY = Math.abs(row - startPoint.y) / Math.abs(dy);

      if (normalizedX + normalizedY <= 1) {
        handleMouseAction(col, row, selectedMaterial, 1);
      }
    }
  }
};
