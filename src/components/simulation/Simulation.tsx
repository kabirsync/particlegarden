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
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Color } from "pixi.js";

type SimulationProps = {
  isPlaying: boolean;
  setFPS: Dispatch<SetStateAction<number>>;
  particleSize: number;
  selectedMaterial: MaterialOptionsType;
  strokeSize: number;
  materialColorRef: MutableRefObject<Color>;
};

const Simulation = ({
  particleSize,
  isPlaying,
  setFPS,
  selectedMaterial,
  strokeSize,
  materialColorRef,
}: Readonly<SimulationProps>) => {
  const { containerRef, dimensions } = useContainerSize();
  const { theme } = useTheme();
  const gridRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseIsPressed = useRef(false);

  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [columns, dimensions.height, dimensions.width, particleSize, rows]);

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!mouseIsPressed.current || !isPlaying) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    mousePosition.current = { x, y };

    const mouseColumn = Math.floor(x / particleSize);
    const mouseRow = rows - Math.floor(y / particleSize);

    const extent = Math.floor(Number(strokeSize) / 2);

    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        // Check if the point is within the circle
        if (i * i + j * j <= extent * extent) {
          const col = mouseColumn + i;
          const row = mouseRow + j;

          // Bounds checking
          if (col >= 0 && col < columns && row >= 0 && row < rows) {
            const particleIndex = mouseRow * columns + mouseColumn;
            const MaterialClass = MaterialMapping[selectedMaterial];
            gridRef.current?.set(
              col,
              row,
              new MaterialClass(particleIndex, {
                color: materialColorRef.current,
              })
            );
          }
        }
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{
          backgroundAlpha: 0, // Makes background transparent
        }}
        onPointerDown={() => (mouseIsPressed.current = true)}
        onPointerUp={() => (mouseIsPressed.current = false)}
        onPointerMove={handleMouseDown}
      >
        <SimulationParticles
          theme={theme}
          columns={columns}
          rows={rows}
          gridRef={gridRef}
          particleSize={particleSize}
          isPlaying={isPlaying}
          setFPS={setFPS}
        />
      </Stage>
    </div>
  );
};

export default Simulation;
