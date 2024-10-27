import { Grid } from "@/components/Grid";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Stage, Sprite, ParticleContainer } from "@pixi/react";
import * as PIXI from "pixi.js";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();

  const grainWidth = 20;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);

  const gridInstance = new Grid({ columns, rows });

  // Create a single neutral base texture for the squares
  const squareTexture = PIXI.Texture.WHITE;

  const backgroundColor = new PIXI.Color("#09090b"); // Dark
  const grainColor = new PIXI.Color("#d4d4d8"); // Light

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor }}
      >
        <ParticleContainer
          maxSize={gridInstance.grid.length}
          properties={{
            scale: true,
            position: true,
            alpha: true,
            tint: true,
          }}
        >
          {gridInstance.grid.map((_, index) => {
            const gridItemColumn = index % columns;
            const gridItemRow = Math.floor(index / columns);
            const x = gridItemColumn * grainWidth;
            const y = (rows - gridItemRow) * grainWidth; // Renders grid from bottom

            return (
              <Sprite
                key={index}
                texture={squareTexture}
                x={x}
                y={y}
                width={grainWidth - 2}
                height={grainWidth - 2}
                tint={grainColor}
              />
            );
          })}
        </ParticleContainer>
      </Stage>
    </div>
  );
};

export default Simulation;
