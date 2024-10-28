import Simulation from "@/components/simulation/Simulation";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Grid } from "@/simulations/Grid";
import { Stage } from "@pixi/react";
import { PointerEvent, useEffect, useRef, useState } from "react";
import { backgroundColorNumerical } from "@/lib/colors";

const SimulationContainer = () => {
  const { containerRef, dimensions } = useContainerSize();
  const gridRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseIsPressed = useRef(false);

  const grainWidth = 10;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [dimensions.width, dimensions.height, columns, rows]);

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!mouseIsPressed.current) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    mousePosition.current = { x, y };

    // Calculate grid indices
    const mouseColumn = Math.floor(x / grainWidth);
    const mouseRow = rows - Math.floor(y / grainWidth);

    gridRef.current?.set(mouseColumn, mouseRow, 1);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor: backgroundColorNumerical }}
        onPointerDown={() => (mouseIsPressed.current = true)}
        onPointerUp={() => (mouseIsPressed.current = false)}
        onPointerMove={handleMouseDown}
      >
        <Simulation
          columns={columns}
          rows={rows}
          gridRef={gridRef}
          grainWidth={grainWidth}
        />
      </Stage>
    </div>
  );
};

export default SimulationContainer;
