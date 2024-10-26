import { useContainerSize } from "@/hooks/useContainerSize";
import { Graphics, Stage } from "@pixi/react";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();

  const grainWidth = 20;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);
  const grid = new Array(columns * rows).fill(0);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor: "black" }}
      >
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(0xa1a1aa);
            for (let index = 0; index < grid.length; index++) {
              const gridItemColumn = index % columns;
              const gridItemRow = Math.floor(index / columns);
              const x = gridItemColumn * grainWidth;

              // const y = gridItemRow * grainWidth; // renders grid from top
              const y = (rows - gridItemRow) * grainWidth; // Renders grid from bottom

              g.drawRect(x, y, grainWidth - 2, grainWidth - 2);
            }
            g.endFill();
          }}
        />
      </Stage>
    </div>
  );
};

export default Simulation;
