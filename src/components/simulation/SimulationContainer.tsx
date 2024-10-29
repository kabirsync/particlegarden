import Simulation from "@/components/simulation/Simulation";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Grid } from "@/simulations/Grid";
import { Stage } from "@pixi/react";
import {
  // MutableRefObject,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "@/components/theme/useTheme";
import {
  backgroundColorDarkNumerical,
  backgroundColorLightNumerical,
} from "@/lib/colors";

type SimulationContainerProps = {
  isPlaying: boolean;
};

const SimulationContainer = ({ isPlaying }: SimulationContainerProps) => {
  const { containerRef, dimensions } = useContainerSize();
  const { theme } = useTheme();
  const gridRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseIsPressed = useRef(false);

  const grainWidth = 10;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);

  console.log({ isPlaying });
  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [dimensions.width, dimensions.height, columns, rows]);

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!mouseIsPressed.current || !isPlaying) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    mousePosition.current = { x, y };

    const mouseColumn = Math.floor(x / grainWidth);
    const mouseRow = rows - Math.floor(y / grainWidth);

    gridRef.current?.set(mouseColumn, mouseRow, 1);
  };

  const backgroundColor =
    theme === "dark"
      ? backgroundColorDarkNumerical
      : backgroundColorLightNumerical;

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
      <Stage
        key={theme} // This forces a re-render when theme changes
        width={dimensions.width}
        height={dimensions.height}
        options={{
          backgroundColor,
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
          grainWidth={grainWidth}
          isPlaying={isPlaying}
        />
      </Stage>
    </div>
  );
};

export default SimulationContainer;
