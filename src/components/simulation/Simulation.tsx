import { useContainerSize } from "@/hooks/useContainerSize";
import { Graphics, Stage } from "@pixi/react";

interface GridSquareProps {
  x: number;
  y: number;
  size: number;
  color?: string;
}

const GridSquare = ({ x, y, size, color = "#a1a1aa" }: GridSquareProps) => (
  <Graphics
    draw={(g) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(x, y, size - 2, size - 2);
      g.endFill();
    }}
  />
);

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
        {grid.map((_, index) => {
          const gridItemColumn = index % columns;
          const gridItemRow = Math.floor(index / columns);
          const x = gridItemColumn * grainWidth;
          const y = gridItemRow * grainWidth;

          return <GridSquare x={x} y={y} size={grainWidth} />;
        })}
      </Stage>
    </div>
  );
};

export default Simulation;
