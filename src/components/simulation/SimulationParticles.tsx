import { Grid } from "@/components/simulation/Grid";
import { Theme } from "@/components/theme/types";
import { throttle } from "@/lib/utils";
import { PixiComponent, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Dispatch, MutableRefObject, SetStateAction, useMemo } from "react";

const vertexShader = `
attribute vec2 aVertexPosition;
attribute vec2 aParticlePosition;
attribute float aAlpha;
attribute vec3 aTint;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying float vAlpha;
varying vec3 vTint;

void main() {
  vec3 position = translationMatrix * vec3(aVertexPosition + aParticlePosition, 1.0);
  gl_Position = vec4((projectionMatrix * position).xy, 0.0, 1.0);
  vAlpha = aAlpha;
  vTint = aTint;
}
`;

const fragmentShader = `
varying float vAlpha;
varying vec3 vTint;

void main() {
  gl_FragColor = vec4(vTint, vAlpha);
}
`;

const Mesh = PixiComponent("Mesh", {
  create: (props) =>
    new PIXI.Mesh(props.geometry, props.shader, props.state, props.drawMode),
  applyProps: (instance, _, newProps) => {
    instance.geometry = newProps.geometry;
    instance.shader = newProps.shader;
  },
});

type SimulationParticlesProps = {
  columns: number;
  rows: number;
  gridRef: MutableRefObject<Grid | undefined>;
  particleSize: number;
  theme: Theme;
  isPlaying: boolean;
  setFPS?: Dispatch<SetStateAction<number>>;
};

const SimulationParticlesOptimized = ({
  columns,
  rows,
  gridRef,
  particleSize,
  isPlaying,
  setFPS,
}: SimulationParticlesProps) => {
  const { geometry, shader } = useMemo(() => {
    const totalParticles = columns * rows;
    const totalVertices = totalParticles * 4; // 4 vertices per quad
    const totalIndices = totalParticles * 6; // 6 indices per quad

    // Initialize arrays
    const vertexPositions = new Float32Array(totalVertices * 2); // x and y per vertex
    const indices = new Uint16Array(totalIndices);
    const aParticlePosition = new Float32Array(totalVertices * 2);
    const aAlpha = new Float32Array(totalVertices);
    const aTint = new Float32Array(totalVertices * 3); // r, g, b per vertex

    // Local quad positions (relative to particle position)
    const quadPositions = [
      0,
      0,
      particleSize,
      0,
      particleSize,
      particleSize,
      0,
      particleSize,
    ];

    for (let i = 0; i < totalParticles; i++) {
      const vertexIndex = i * 4;
      const positionOffset = vertexIndex * 2;
      const indexOffset = i * 6;

      // Set vertex positions for the quad (local positions)
      for (let j = 0; j < 8; j++) {
        vertexPositions[positionOffset + j] = quadPositions[j];
      }

      // Set indices for the quad
      indices[indexOffset + 0] = vertexIndex + 0;
      indices[indexOffset + 1] = vertexIndex + 1;
      indices[indexOffset + 2] = vertexIndex + 2;
      indices[indexOffset + 3] = vertexIndex + 0;
      indices[indexOffset + 4] = vertexIndex + 2;
      indices[indexOffset + 5] = vertexIndex + 3;

      // Initialize attributes
      for (let j = 0; j < 4; j++) {
        const attrIndex = vertexIndex + j;
        aParticlePosition[attrIndex * 2 + 0] = 0;
        aParticlePosition[attrIndex * 2 + 1] = 0;
        aAlpha[attrIndex] = 0;
        aTint[attrIndex * 3 + 0] = 1;
        aTint[attrIndex * 3 + 1] = 1;
        aTint[attrIndex * 3 + 2] = 1;
      }
    }

    // Create geometry
    const geometry = new PIXI.Geometry()
      .addAttribute("aVertexPosition", vertexPositions, 2)
      .addAttribute("aParticlePosition", aParticlePosition, 2)
      .addAttribute("aAlpha", aAlpha, 1)
      .addAttribute("aTint", aTint, 3)
      .addIndex(indices);

    // Create shader
    const shader = PIXI.Shader.from(vertexShader, fragmentShader);

    return { geometry, shader };
  }, [columns, rows, particleSize]);

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
      const { grid } = gridRef.current;
      const totalParticles = columns * rows;

      const aParticlePositionBuffer = geometry.getBuffer("aParticlePosition");
      const aAlphaBuffer = geometry.getBuffer("aAlpha");
      const aTintBuffer = geometry.getBuffer("aTint");

      const aParticlePosition = aParticlePositionBuffer.data;
      const aAlpha = aAlphaBuffer.data;
      const aTint = aTintBuffer.data;

      for (let i = 0; i < totalParticles; i++) {
        const item = grid[i];
        const vertexIndex = i * 4;

        // Compute particle position
        const gridItemColumn = i % columns;
        const gridItemRow = Math.floor(i / columns);
        const x = gridItemColumn * particleSize;
        const y = (rows - gridItemRow - 1) * particleSize; // Adjusted y-coordinate

        // For each of the four vertices of this particle
        for (let j = 0; j < 4; j++) {
          const attrIndex = vertexIndex + j;

          // Set aParticlePosition
          aParticlePosition[attrIndex * 2 + 0] = x;
          aParticlePosition[attrIndex * 2 + 1] = y;

          // Set aAlpha
          aAlpha[attrIndex] = item.isEmpty ? 0 : 1;

          // Set aTint
          let color = item.color.toRgbArray(); // Should return [r, g, b]
          // Normalize color components to 0..1 range if necessary
          if (color[0] > 1 || color[1] > 1 || color[2] > 1) {
            color = color.map((c) => c / 255);
          }
          aTint[attrIndex * 3 + 0] = color[0];
          aTint[attrIndex * 3 + 1] = color[1];
          aTint[attrIndex * 3 + 2] = color[2];
        }
      }

      // Update buffers
      aParticlePositionBuffer.update();
      aAlphaBuffer.update();
      aTintBuffer.update();

      gridRef.current.update();
    }
  });

  return (
    <Mesh
      geometry={geometry}
      shader={shader}
      drawMode={PIXI.DRAW_MODES.TRIANGLES}
    />
  );
};

export default SimulationParticlesOptimized;
