import SimulationParticles from "@/components/simulation/SimulationParticles";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Grid } from "@/components/simulation/Grid";
import {
  MaterialMapping,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import { Stage } from "@pixi/react";
import {
  Dispatch,
  MutableRefObject,
  PointerEvent,
  TouchEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Color } from "pixi.js";
import { backgroundColorDark, backgroundColorLight } from "@/lib/colors";

type SimulationProps = {
  isPlaying: boolean;
  setFPS: Dispatch<SetStateAction<number>>;
  particleSize: number;
  selectedMaterial: MaterialOptionsType | "EmptyPreview";
  materialColorRef: MutableRefObject<Color>;
  strokeSizeRef: MutableRefObject<number>;
};

type SetParticlesOptions = {
  targetGrid: Grid | undefined;
  row: number;
  column: number;
  isPreview: boolean;
};

type HandlePointerOptions = {
  event: PointerEvent | TouchEvent;
  targetGrid: Grid | undefined;
  clearPreview?: boolean;
  isPreview?: boolean;
};

const Simulation = ({
  particleSize,
  isPlaying,
  setFPS,
  selectedMaterial,
  strokeSizeRef,
  materialColorRef,
}: Readonly<SimulationProps>) => {
  const { containerRef, dimensions } = useContainerSize();
  const { theme } = useTheme();
  const gridRef = useRef<Grid>();
  const previewRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const mouseIsPressed = useRef(false);

  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

  const backgroundColor =
    theme === "dark" ? backgroundColorDark : backgroundColorLight;

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      previewRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [columns, dimensions.height, dimensions.width, particleSize, rows]);

  const calculatePosition = (event: PointerEvent | TouchEvent) => {
    const rect = (
      event.currentTarget as HTMLCanvasElement
    ).getBoundingClientRect();
    const x = "clientX" in event ? event.clientX : event.touches[0].clientX;
    const y = "clientY" in event ? event.clientY : event.touches[0].clientY;
    return {
      column: Math.floor((x - rect.left) / particleSize),
      row: rows - Math.floor((y - rect.top) / particleSize),
    };
  };

  const setParticles = ({
    targetGrid,
    row,
    column,
    isPreview,
  }: SetParticlesOptions) => {
    const extent = Math.floor(Number(strokeSizeRef.current) / 2);
    let materialToUse = selectedMaterial;
    if (isPreview) {
      materialToUse =
        selectedMaterial === "Empty" ? "EmptyPreview" : selectedMaterial;
    }

    const MaterialClass = MaterialMapping[materialToUse];
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (i * i + j * j <= extent * extent) {
          const col = column + i;
          const rowIndex = row + j;
          if (col >= 0 && col < columns && rowIndex >= 0 && rowIndex < rows) {
            const particleIndex = row * columns + column;
            targetGrid?.set(
              col,
              rowIndex,
              new MaterialClass(particleIndex, {
                color:
                  isPreview && selectedMaterial === "Empty"
                    ? backgroundColor
                    : materialColorRef.current,
              })
            );
          }
        }
      }
    }
  };

  const handlePointerUpdate = ({
    event,
    targetGrid,
    clearPreview = false,
    isPreview = false,
  }: HandlePointerOptions) => {
    if (clearPreview) previewRef.current?.clear();
    if (!isPlaying || ("touches" in event && event.touches.length !== 1))
      return;

    const { column, row } = calculatePosition(event);
    setParticles({ targetGrid, row, column, isPreview });
  };

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    mouseIsPressed.current = true;
    handlePointerUpdate({ event, targetGrid: gridRef.current });
  };

  const handleMouseMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (mouseIsPressed.current)
      handlePointerUpdate({
        event,
        targetGrid: gridRef.current,
        clearPreview: true,
      });
    else
      handlePointerUpdate({
        event,
        targetGrid: previewRef.current,
        clearPreview: true,
        isPreview: true,
      });
  };

  const handleTouchStart = (event: TouchEvent<HTMLCanvasElement>) => {
    mouseIsPressed.current = true;
    handlePointerUpdate({ event, targetGrid: gridRef.current });
  };

  const handleTouchMove = (event: TouchEvent<HTMLCanvasElement>) => {
    if (mouseIsPressed.current)
      handlePointerUpdate({
        event,
        targetGrid: gridRef.current,
        clearPreview: true,
      });
    else
      handlePointerUpdate({
        event,
        targetGrid: previewRef.current,
        clearPreview: true,
        isPreview: true,
      });
  };

  const handleTouchEnd = () => {
    mouseIsPressed.current = false;
    previewRef.current?.clear();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{
          backgroundAlpha: 0, // Makes background transparent
        }}
        onPointerDown={handleMouseDown}
        onPointerUp={() => (mouseIsPressed.current = false)}
        onPointerMove={handleMouseMove}
        onPointerLeave={() => {
          mouseIsPressed.current = false;
          previewRef.current?.clear();
        }}
        // Touch Event Handlers for Mobile
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SimulationParticles
          theme={theme}
          columns={columns}
          rows={rows}
          gridRef={gridRef}
          // previewRef={previewRef} // Add this line
          particleSize={particleSize}
          isPlaying={isPlaying}
          setFPS={setFPS}
        />
      </Stage>
    </div>
  );
};

export default Simulation;
