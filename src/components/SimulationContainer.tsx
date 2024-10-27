import Simulation from "@/components/Simulation";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Grid } from "@/simulations/Grid";
import { Stage } from "@pixi/react";
import { PointerEvent, useEffect, useRef, useState } from "react";

const SimulationContainer = () => {
  const { containerRef, dimensions } = useContainerSize();
  const gridRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  const grainWidth = 20;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [dimensions.width, dimensions.height, columns, rows]);

  const backgroundColor = 0x09090b; // Dark - Stage does not accept Pixi.Color needs numerical color

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    mousePosition.current = { x, y };
    console.log(mousePosition.current);

    // Calculate grid indices
    const mouseColumn = Math.floor(x / grainWidth);
    const mouseRow = rows - Math.floor(y / grainWidth);

    console.log({ mouseColumn, mouseRow });

    gridRef.current?.set(mouseColumn, mouseRow, 1);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor }}
        onPointerDown={handleMouseDown}
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
