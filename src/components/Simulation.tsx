import { Grid } from "@/components/Grid";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Stage, Sprite, ParticleContainer } from "@pixi/react";
import * as PIXI from "pixi.js";
import { PointerEvent, useEffect, useRef, useState } from "react";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();
  const gridRef = useRef<Grid>();
  const [isReady, setIsReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  const grainWidth = 20;
  const columns = Math.floor(dimensions.width / grainWidth);
  const rows = Math.floor(dimensions.height / grainWidth);

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true);
    }
  }, [dimensions.width, dimensions.height, columns, rows]);

  // Create a single neutral base texture for the squares
  const squareTexture = PIXI.Texture.WHITE;

  const backgroundColor = 0x09090b; // Dark - Stage does not accept Pixi.Color needs numerical color
  const grainColor = new PIXI.Color("#d4d4d8"); // Light

  const handleMouseDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mousePosition.current = { x: Math.round(x), y: Math.round(y) };
    console.log(mousePosition.current);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor }}
        onPointerDown={handleMouseDown}
      >
        {isReady && (
          <ParticleContainer
            maxSize={columns * rows}
            properties={{
              scale: true,
              position: true,
              alpha: true,
              tint: true,
            }}
          >
            {gridRef.current?.grid.map((_, index) => {
              const gridItemColumn = index % columns;
              const gridItemRow = Math.floor(index / columns);
              const x = gridItemColumn * grainWidth;
              const y = (rows - gridItemRow) * grainWidth; // renders from bottom, use (rows - row) * grainWidth; for top to bottom

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
        )}
      </Stage>
    </div>
  );
};

export default Simulation;
