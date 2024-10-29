import Simulation from "@/components/simulation/Simulation";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Grid } from "@/simulations/Grid";
import { Stage } from "@pixi/react";
import {
  Dispatch,
  PointerEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type SimulationContainerProps = {
  isPlaying: boolean;
  setFPS: Dispatch<SetStateAction<number>>;
  particleSize: number;
};

const SimulationContainer = ({
  particleSize,
  isPlaying,
  setFPS,
}: Readonly<SimulationContainerProps>) => {
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

    gridRef.current?.set(mouseColumn, mouseRow, 1);
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
        <Simulation
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

export default SimulationContainer;
