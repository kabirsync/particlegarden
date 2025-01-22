import {
  MaterialMapping,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import {
  accelerationRefAtom,
  acidStrengthRefAtom,
  chanceToCatchRefAtom,
  chanceToMeltRefAtom,
  diagonalSpreadRefAtom,
  drawModeAtom,
  extinguishMaterialRefAtom,
  FPSAtom,
  gridRefAtom,
  horizontalSpreadRefAtom,
  imageDataAtom,
  initialVelocityRefAtom,
  isPlayingAtom,
  lifeRefAtom,
  materialColorRefAtom,
  maxSpeedRefAtom,
  particleSizeAtom,
  refreshAtom,
  selectedMaterialAtom,
  smokeColorRefAtom,
  strokeSizeRefAtom,
  verticalSpreadRefAtom,
} from "@/components/simulation/simulationState";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { backgroundColorDark, backgroundColorLight } from "@/lib/constants";
import { handleSaveToLocalStorage, throttle } from "@/lib/utils";
import { Dimension } from "@/types";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  Points,
  PointsMaterial,
} from "three";
import { Grid } from "./Grid";

interface SimulationParticlesProps {
  dimensions: Dimension;
  theme: "dark" | "light";
}

const SimulationParticles = ({
  dimensions,
  theme,
}: SimulationParticlesProps) => {
  const [isPlaying] = useAtom(isPlayingAtom);
  const [particleSize] = useAtom(particleSizeAtom);
  const [selectedMaterial] = useAtom(selectedMaterialAtom);
  const [materialColorRef] = useAtom(materialColorRefAtom);
  const [maxSpeedRef] = useAtom(maxSpeedRefAtom);
  const [initialVelocityRef] = useAtom(initialVelocityRefAtom);
  const [accelerationRef] = useAtom(accelerationRefAtom);
  const [diagonalSpreadRef] = useAtom(diagonalSpreadRefAtom);
  const [verticalSpreadRef] = useAtom(verticalSpreadRefAtom);
  const [horizontalSpreadRef] = useAtom(horizontalSpreadRefAtom);
  const [strokeSizeRef] = useAtom(strokeSizeRefAtom);
  const [lifeRef] = useAtom(lifeRefAtom);
  const [chanceToCatchlRef] = useAtom(chanceToCatchRefAtom);
  const [chanceToMeltlRef] = useAtom(chanceToMeltRefAtom);
  const [smokeColorRef] = useAtom(smokeColorRefAtom);
  const [extinguishMaterialRef] = useAtom(extinguishMaterialRefAtom);
  const [acidStengthRef] = useAtom(acidStrengthRefAtom);
  const [refresh] = useAtom(refreshAtom);
  const [, setFPS] = useAtom(FPSAtom);
  const [, setFrame] = useState(0);
  const [gridRef] = useAtom(gridRefAtom);
  const [isReady, setIsReady] = useState(false);
  const lastTimeRef = useRef(performance.now());
  const mouseDownRef = useRef(false);
  const mousePositionRef = useRef({ u: 0, v: 0 });
  const mouseOverRef = useRef(false);
  const [imageData] = useAtom(imageDataAtom);
  const [drawMode] = useAtom(drawModeAtom);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const previewCircleRef = useRef<Mesh | null>(null);

  const backgroundColor =
    theme === "light" ? backgroundColorLight : backgroundColorDark;

  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

  const throttledSetThreeFPS = useMemo(
    () => throttle((fps: number) => setFPS(fps), 1000),
    [setFPS]
  );

  const geometryRef = useRef(new BufferGeometry());
  const colorAttributeRef = useRef<Float32BufferAttribute>();

  const { processImage } = useImageProcessor({ columns, rows, gridRef });

  useEffect(() => {
    gridRef.current = new Grid({ columns, rows });
    setIsReady(true);
  }, [dimensions.width, dimensions.height, columns, rows, refresh, gridRef]);

  useEffect(() => {
    const positions = [];
    const colors = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        positions.push(col * particleSize, (rows - row) * particleSize, 0);

        const color = backgroundColor;
        colors.push(color.r, color.g, color.b);
      }
    }

    geometryRef.current.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    colorAttributeRef.current = new Float32BufferAttribute(colors, 3);
    geometryRef.current.setAttribute("color", colorAttributeRef.current);
  }, [columns, rows, particleSize, backgroundColor]);

  const handleMouseAction = (
    mouseColumn: number,
    mouseRow: number,
    material: MaterialOptionsType,
    matrix: number
  ) => {
    const extent = Math.floor(Number(matrix) / 2);
    const radius = extent;

    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (i * i + j * j <= radius * radius) {
          const col = mouseColumn + i;
          const row = mouseRow + j;

          if (col >= 0 && col < columns && row >= 0 && row < rows) {
            const MaterialClass = MaterialMapping[material];
            gridRef.current?.set(
              col,
              row,
              new MaterialClass(row * columns + col, {
                color: materialColorRef.current,
                maxSpeed: maxSpeedRef.current,
                initialVelocity: initialVelocityRef.current,
                acceleration: accelerationRef.current,
                diagonalSpread: diagonalSpreadRef.current,
                verticalSpread: verticalSpreadRef.current,
                horizontalSpread: horizontalSpreadRef.current,
                life: lifeRef.current,
                // fuel: fuelRef.current,
                chanceToCatch: chanceToCatchlRef.current,
                chanceToMelt: chanceToMeltlRef.current,
                smokeColor: smokeColorRef.current,
                extinguishMaterial: extinguishMaterialRef.current,
                acidStrength: acidStengthRef.current,
              })
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (imageData) {
      processImage(imageData);
    }
  }, [imageData, processImage]);

  useFrame(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;

    const fps = 1000 / deltaTime;
    throttledSetThreeFPS(Math.round(fps));
    lastTimeRef.current = currentTime;

    if (mouseDownRef.current) {
      const u = mousePositionRef.current.u;
      const v = mousePositionRef.current.v;

      const mouseXWorld = u * dimensions.width;
      const mouseYWorld = (1 - v) * dimensions.height;

      const mouseColumn = Math.floor(mouseXWorld / particleSize);
      const mouseRow = Math.floor(mouseYWorld / particleSize);

      if (
        mouseColumn >= 0 &&
        mouseColumn < columns &&
        mouseRow >= 0 &&
        mouseRow < rows
      ) {
        if (drawMode === "brush") {
          handleMouseAction(
            mouseColumn,
            mouseRow,
            selectedMaterial as MaterialOptionsType,
            strokeSizeRef.current
          );
        } else if (drawMode === "circle") {
          if (!startPoint) {
            setStartPoint({ x: mouseColumn, y: mouseRow });
          } else {
            const dx = mouseColumn - startPoint.x;
            const dy = mouseRow - startPoint.y;
            const radius = Math.sqrt(dx * dx + dy * dy);

            if (previewCircleRef.current) {
              previewCircleRef.current.position.set(
                startPoint.x * particleSize,
                (rows - startPoint.y) * particleSize,
                1
              );
              previewCircleRef.current.scale.set(
                radius * particleSize * 2,
                radius * particleSize * 2,
                1
              );
            }
          }
        }
      }
    }

    if (!gridRef.current || !colorAttributeRef.current) return;

    const grid = gridRef.current.grid;
    const colors = colorAttributeRef.current.array;
    const materialColor = materialColorRef.current;

    // Detect cells under mouse hover
    const isCellUnderMouse = (col: number, row: number) => {
      if (!mouseOverRef.current) return false;

      const u = mousePositionRef.current.u;
      const v = mousePositionRef.current.v;
      const mouseXWorld = u * dimensions.width;
      const mouseYWorld = (1 - v) * dimensions.height;
      const mouseColumn = Math.floor(mouseXWorld / particleSize);
      const mouseRow = Math.floor(mouseYWorld / particleSize);

      if (startPoint) {
        switch (drawMode) {
          case "circle":
            return isInCircle(col, row, startPoint, mouseColumn, mouseRow);
          case "rectangle":
            return isInRectangle(col, row, startPoint, mouseColumn, mouseRow);
          case "triangle":
            return isInTriangle(col, row, startPoint, mouseColumn, mouseRow);
          case "diamond":
            return isInDiamond(col, row, startPoint, mouseColumn, mouseRow);
        }
      }

      if (drawMode === "brush") {
        const radiusSquared = Math.pow(strokeSizeRef.current / 2, 2);
        const dx = col - mouseColumn;
        const dy = row - mouseRow;
        return dx * dx + dy * dy <= radiusSquared;
      }

      return false;
    };

    for (let index = 0; index < grid.length; index++) {
      const square = grid[index];
      const col = index % columns;
      const row = Math.floor(index / columns);
      const isHovered = isCellUnderMouse(col, row);

      const color = isHovered
        ? selectedMaterial === "Empty"
          ? backgroundColor
          : startPoint &&
            mousePositionRef.current &&
            ["circle", "rectangle", "triangle", "diamond"].includes(drawMode)
          ? (() => {
              const mouseXWorld = mousePositionRef.current.u * dimensions.width;
              const mouseYWorld =
                (1 - mousePositionRef.current.v) * dimensions.height;
              const mouseColumn = Math.floor(mouseXWorld / particleSize);
              const mouseRow = Math.floor(mouseYWorld / particleSize);

              let isInShape = false;
              switch (drawMode) {
                case "circle":
                  isInShape = isInCircle(
                    col,
                    row,
                    startPoint,
                    mouseColumn,
                    mouseRow
                  );
                  break;
                case "rectangle":
                  isInShape = isInRectangle(
                    col,
                    row,
                    startPoint,
                    mouseColumn,
                    mouseRow
                  );
                  break;
                case "triangle":
                  isInShape = isInTriangle(
                    col,
                    row,
                    startPoint,
                    mouseColumn,
                    mouseRow
                  );
                  break;
                case "diamond":
                  isInShape = isInDiamond(
                    col,
                    row,
                    startPoint,
                    mouseColumn,
                    mouseRow
                  );
                  break;
              }

              // Use the exact same color instance from materialColor
              return isInShape ? materialColor.clone() : backgroundColor;
            })()
          : drawMode === "brush"
          ? materialColor.clone()
          : backgroundColor
        : square?.stateOfMatter === "empty"
        ? backgroundColor
        : square?.color ?? backgroundColor;

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    colorAttributeRef.current.needsUpdate = true;

    if (isPlaying) {
      gridRef.current.update();
    }

    setFrame((prev) => prev + 1);
  });

  // Shape preview functions
  const isInCircle = (
    col: number,
    row: number,
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ): boolean => {
    const dx = col - startPoint.x;
    const dy = row - startPoint.y;
    const radius = Math.sqrt(
      Math.pow(mouseColumn - startPoint.x, 2) +
        Math.pow(mouseRow - startPoint.y, 2)
    );
    return dx * dx + dy * dy <= radius * radius;
  };

  const isInRectangle = (
    col: number,
    row: number,
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ): boolean => {
    const left = Math.min(startPoint.x, mouseColumn);
    const right = Math.max(startPoint.x, mouseColumn);
    const top = Math.min(startPoint.y, mouseRow);
    const bottom = Math.max(startPoint.y, mouseRow);
    return col >= left && col <= right && row >= top && row <= bottom;
  };

  const isInTriangle = (
    col: number,
    row: number,
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ): boolean => {
    const dx = mouseColumn - startPoint.x;
    const dy = mouseRow - startPoint.y;

    // Only check points within the bounding box of the triangle
    const minX = Math.min(startPoint.x, startPoint.x + dx);
    const maxX = Math.max(startPoint.x, startPoint.x + dx);
    const minY = Math.min(startPoint.y, startPoint.y + dy);
    const maxY = Math.max(startPoint.y, startPoint.y + dy);

    if (col < minX || col > maxX || row < minY || row > maxY) {
      return false;
    }

    return isPointInTriangle(
      col,
      row,
      startPoint.x,
      startPoint.y,
      startPoint.x + dx,
      startPoint.y,
      startPoint.x + dx / 2,
      startPoint.y + dy
    );
  };

  const isInDiamond = (
    col: number,
    row: number,
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ): boolean => {
    const dx = mouseColumn - startPoint.x;
    const dy = mouseRow - startPoint.y;
    const normalizedX = Math.abs(col - startPoint.x) / Math.abs(dx);
    const normalizedY = Math.abs(row - startPoint.y) / Math.abs(dy);
    return normalizedX + normalizedY <= 1;
  };

  // Shape drawing functions
  const drawCircle = (
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ) => {
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
            handleMouseAction(
              col,
              row,
              selectedMaterial as MaterialOptionsType,
              1
            );
          }
        }
      }
    }
  };

  const drawRectangle = (
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ) => {
    const left = Math.min(startPoint.x, mouseColumn);
    const right = Math.max(startPoint.x, mouseColumn);
    const top = Math.min(startPoint.y, mouseRow);
    const bottom = Math.max(startPoint.y, mouseRow);

    for (let row = top; row <= bottom; row++) {
      for (let col = left; col <= right; col++) {
        if (col >= 0 && col < columns && row >= 0 && row < rows) {
          handleMouseAction(
            col,
            row,
            selectedMaterial as MaterialOptionsType,
            1
          );
        }
      }
    }
  };

  const drawTriangle = (
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ) => {
    const dx = mouseColumn - startPoint.x;
    const dy = mouseRow - startPoint.y;

    // If width OR height is 1 particle or less, just place at start point
    if (Math.abs(dx) <= 1 || Math.abs(dy) <= 1) {
      handleMouseAction(
        startPoint.x,
        startPoint.y,
        selectedMaterial as MaterialOptionsType,
        1
      );
      return;
    }

    // Draw full triangle
    const minX = Math.min(startPoint.x, startPoint.x + dx);
    const maxX = Math.max(startPoint.x, startPoint.x + dx);
    const minY = Math.min(startPoint.y, startPoint.y + dy);
    const maxY = Math.max(startPoint.y, startPoint.y + dy);

    for (let row = minY; row <= maxY; row++) {
      for (let col = minX; col <= maxX; col++) {
        if (
          isPointInTriangle(
            col,
            row,
            startPoint.x,
            startPoint.y,
            startPoint.x + dx,
            startPoint.y,
            startPoint.x + dx / 2,
            startPoint.y + dy
          )
        ) {
          handleMouseAction(
            col,
            row,
            selectedMaterial as MaterialOptionsType,
            1
          );
        }
      }
    }
  };

  const drawDiamond = (
    startPoint: { x: number; y: number },
    mouseColumn: number,
    mouseRow: number
  ) => {
    const dx = mouseColumn - startPoint.x;
    const dy = mouseRow - startPoint.y;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const normalizedX = Math.abs(col - startPoint.x) / Math.abs(dx);
        const normalizedY = Math.abs(row - startPoint.y) / Math.abs(dy);

        if (normalizedX + normalizedY <= 1) {
          handleMouseAction(
            col,
            row,
            selectedMaterial as MaterialOptionsType,
            1
          );
        }
      }
    }
  };

  // Helper function for triangle
  const isPointInTriangle = (
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) => {
    const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2;
    const a1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)) / 2;
    const a2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py)) / 2;
    const a3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py)) / 2;
    return Math.abs(area - (a1 + a2 + a3)) < 0.01;
  };

  const handleShapeDrawing = () => {
    if (!mousePositionRef.current || !startPoint) return;

    const mouseXWorld = mousePositionRef.current.u * dimensions.width;
    const mouseYWorld = (1 - mousePositionRef.current.v) * dimensions.height;
    const mouseColumn = Math.floor(mouseXWorld / particleSize);
    const mouseRow = Math.floor(mouseYWorld / particleSize);

    if (drawMode === "circle") {
      drawCircle(startPoint, mouseColumn, mouseRow);
    } else if (drawMode === "rectangle") {
      drawRectangle(startPoint, mouseColumn, mouseRow);
    } else if (drawMode === "triangle") {
      drawTriangle(startPoint, mouseColumn, mouseRow);
    } else if (drawMode === "diamond") {
      drawDiamond(startPoint, mouseColumn, mouseRow);
    }
    setStartPoint(null);
  };

  if (!isReady) return null;

  return (
    <>
      <mesh
        onPointerDown={(event) => {
          handleSaveToLocalStorage({ gridRef, key: "autoSaveUndo" });
          if (event.isPrimary) {
            mouseDownRef.current = true;
            if (event.uv) {
              const u = event.uv.x;
              const v = event.uv.y;
              mousePositionRef.current = { u, v };
              // Set startPoint for all shape types
              if (
                ["circle", "rectangle", "triangle", "diamond"].includes(
                  drawMode
                )
              ) {
                const mouseXWorld = u * dimensions.width;
                const mouseYWorld = (1 - v) * dimensions.height;
                const mouseColumn = Math.floor(mouseXWorld / particleSize);
                const mouseRow = Math.floor(mouseYWorld / particleSize);
                setStartPoint({ x: mouseColumn, y: mouseRow });
              }
            }
          }
        }}
        onPointerUp={(event) => {
          if (event.isPrimary) {
            mouseDownRef.current = false;
            if (startPoint) {
              handleShapeDrawing();
            }
            handleSaveToLocalStorage({ gridRef, key: "autoSaveRedo" });
          }
        }}
        onPointerMove={(event) => {
          if (event.isPrimary && event.uv) {
            mousePositionRef.current = { u: event.uv.x, v: event.uv.y };
          }
        }}
        onPointerEnter={() => {
          mouseOverRef.current = true;
        }}
        onPointerLeave={() => {
          mouseOverRef.current = false;
          mouseDownRef.current = false;
        }}
        position={[dimensions.width / 2, dimensions.height / 2, 0]}
      >
        <planeGeometry args={[dimensions.width, dimensions.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <primitive
        object={
          new Points(
            geometryRef.current,
            new PointsMaterial({
              size: particleSize,
              vertexColors: true,
              sizeAttenuation: false,
            })
          )
        }
      />
    </>
  );
};

export default SimulationParticles;
