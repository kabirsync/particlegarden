import { Theme } from "@/components/theme/types";
import { squareTexture } from "@/lib/colors";
import { throttle } from "@/lib/utils";
import { Grid } from "@/components/simulation/Grid";
import { ParticleContainer, Sprite, useTick } from "@pixi/react";
import { Sprite as SpriteType } from "pixi.js";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useMemo,
  useRef,
} from "react";

type SimulationParticlesProps = {
  columns: number;
  rows: number;
  gridRef: MutableRefObject<Grid | undefined>;
  particleSize: number;
  theme: Theme;
  isPlaying: boolean;
  setFPS?: Dispatch<SetStateAction<number>>;
};

const SimulationParticles = ({
  columns,
  rows,
  gridRef,
  particleSize,
  isPlaying,
  setFPS,
}: SimulationParticlesProps) => {
  const spriteRefs = useRef<(SpriteType | null)[]>([]);

  const throttledSetFPS = useMemo(
    () => (setFPS ? throttle((fps: number) => setFPS(fps), 1000) : undefined),
    [setFPS]
  );

  useTick((_, ticker) => {
    if (!isPlaying && setFPS) {
      setFPS(0);
      return;
    }
    if (setFPS && throttledSetFPS) {
      const fps = Math.round(ticker.FPS);
      throttledSetFPS(fps);
    }

    if (gridRef.current) {
      gridRef.current.grid.forEach((item, index) => {
        const sprite = spriteRefs.current[index];
        if (sprite) {
          // Update sprite properties without re-rendering React
          sprite.tint = item.color;
          sprite.x = (index % columns) * particleSize;
          sprite.y = (rows - Math.floor(index / columns)) * particleSize;
          sprite.alpha = item.isEmpty ? 0 : 1;
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
      {gridRef.current.grid.map((item, index) => {
        const gridItemColumn = index % columns;
        const gridItemRow = Math.floor(index / columns);
        const x = gridItemColumn * particleSize;
        const y = (rows - gridItemRow) * particleSize;

        return (
          <Sprite
            key={index}
            texture={squareTexture}
            tint={item.color}
            x={x}
            y={y}
            width={particleSize}
            height={particleSize}
            ref={(sprite) => (spriteRefs.current[index] = sprite)} // Store sprite reference
            alpha={item.isEmpty ? 0 : 1}
          />
        );
      })}
    </ParticleContainer>
  );
};

export default SimulationParticles;
