import { useContainerSize } from "@/hooks/useContainerSize";
import { Stage, Sprite, ParticleContainer } from "@pixi/react";
import * as PIXI from "pixi.js";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();

  const grainWidth = 20;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);
  const grid = new Array(columns * rows).fill(0);

  // Create a single texture for the squares
  const squareTexture = PIXI.Texture.WHITE;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor: "black" }}
      >
        <ParticleContainer
          maxSize={grid.length}
          properties={{
            scale: true,
            position: true,
            alpha: true,
            tint: true,
          }}
        >
          {grid.map((_, index) => {
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
                tint={"white"}
              />
            );
          })}
        </ParticleContainer>
      </Stage>
    </div>
  );
};

export default Simulation;
