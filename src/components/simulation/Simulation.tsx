import { Theme } from "@/components/theme/types";
import {
  backgroundColorDark,
  backgroundColorLight,
  sandColor,
  squareTexture,
} from "@/lib/colors";
import { Grid } from "@/simulations/Grid";
import { ParticleContainer, Sprite, useTick } from "@pixi/react";
import { Sprite as SpriteType } from "pixi.js";
import { MutableRefObject, useRef } from "react";

type SimulationProps = {
  columns: number;
  rows: number;
  gridRef: MutableRefObject<Grid | undefined>;
  grainWidth: number;
  theme: Theme;
};

const Simulation = ({
  columns,
  rows,
  gridRef,
  grainWidth,
  theme,
}: SimulationProps) => {
  const spriteRefs = useRef<(SpriteType | null)[]>([]);

  const backgroundColor =
    theme === "light" ? backgroundColorLight : backgroundColorDark;

  useTick(() => {
    if (gridRef.current) {
      gridRef.current.grid.forEach((item, index) => {
        const sprite = spriteRefs.current[index];
        if (sprite) {
          // Update sprite properties without re-rendering React
          sprite.tint = item === 0 ? backgroundColor : sandColor;
          sprite.x = (index % columns) * grainWidth;
          sprite.y = (rows - Math.floor(index / columns)) * grainWidth;
        }
      });
    }
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
      {gridRef.current.grid.map((_, index) => {
        const gridItemColumn = index % columns;
        const gridItemRow = Math.floor(index / columns);
        const x = gridItemColumn * grainWidth;
        const y = (rows - gridItemRow) * grainWidth;

        return (
          <Sprite
            key={index}
            texture={squareTexture}
            x={x}
            y={y}
            width={grainWidth - 2}
            height={grainWidth - 2}
            ref={(sprite) => (spriteRefs.current[index] = sprite)} // Store sprite reference
          />
        );
      })}
    </ParticleContainer>
  );
};

export default Simulation;
