import { grainColor, sandColor, squareTexture } from "@/lib/colors";
import { Grid } from "@/simulations/Grid";
import { ParticleContainer, Sprite, useTick } from "@pixi/react";
import { MutableRefObject } from "react";

type SimulationProps = {
  columns: number;
  rows: number;
  gridRef: MutableRefObject<Grid | undefined>;
  grainWidth: number;
};

const Simulation = ({
  columns,
  rows,
  gridRef,
  grainWidth,
}: SimulationProps) => {
  useTick(() => {
    console.log("tick");
  });

  if (!gridRef.current) {
    return null;
  }

  return (
    <ParticleContainer
      maxSize={columns * rows}
      properties={{
        scale: true,
        position: true,
        alpha: true,
        tint: true,
      }}
    >
      {gridRef.current?.grid.map((item, index) => {
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
            tint={item === 0 ? grainColor : sandColor}
          />
        );
      })}
    </ParticleContainer>
  );
};

export default Simulation;
