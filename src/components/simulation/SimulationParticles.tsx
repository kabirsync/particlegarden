import { throttle } from "@/lib/utils";
import { useFrame } from "@react-three/fiber";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Color, InstancedMesh, Object3D } from "three";
import { Grid } from "./Grid";
import {
  MaterialMapping,
  MaterialOptionsType,
} from "@/components/simulation/materials/Material";
import { backgroundColorDark, backgroundColorLight } from "@/lib/colors";
import { Dimension } from "@/types";

interface SimulationParticlesProps {
  dimensions: Dimension;
  theme: "dark" | "light";
  isPlaying: boolean;
  setFPS: Dispatch<SetStateAction<number>>;
  materialColorRef: MutableRefObject<Color>;
  strokeSizeRef: MutableRefObject<number>;
  selectedMaterial: MaterialOptionsType;
  particleSize: number;
}

const SimulationParticles = ({
  isPlaying,
  dimensions,
  particleSize,
  materialColorRef,
  theme,
  setFPS,
  strokeSizeRef,
  selectedMaterial,
}: SimulationParticlesProps) => {
  const dummy = new Object3D();

  const backgroundColor =
    theme === "light" ? backgroundColorLight : backgroundColorDark;

  const [, setFrame] = useState(0);
  const gridRef = useRef<Grid>();
  const [isReady, setIsReady] = useState(false); // State to trigger re-render
  const lastTimeRef = useRef(performance.now());
  const meshRef = useRef<InstancedMesh>(null!);

  const mouseDownRef = useRef(false);
  const mousePositionRef = useRef({ u: 0, v: 0 }); // Using UV coordinates

  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

  const throttledSetThreeFPS = useMemo(
    () => throttle((fps: number) => setFPS(fps), 1000),
    [setFPS]
  );

  useEffect(() => {
    gridRef.current = new Grid({ columns, rows });
    setIsReady(true); // Set state to true to trigger re-render after grid is ready
  }, [dimensions.width, dimensions.height, columns, rows]);

  const handleMouseAction = (
    mouseColumn: number,
    mouseRow: number,
    material: MaterialOptionsType,
    matrix: number
  ) => {
    const extent = Math.floor(Number(matrix) / 2);
    const radius = extent;

    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        // Check if the point is within the circle
        if (i * i + j * j <= radius * radius) {
          const col = mouseColumn + i;
          const row = mouseRow + j;

          // Bounds checking
          if (col >= 0 && col < columns && row >= 0 && row < rows) {
            if (Math.random() > 0.25) {
              const MaterialClass = MaterialMapping[material];
              gridRef.current?.set(
                col,
                row,
                new MaterialClass(row * columns + col, {
                  color: materialColorRef.current,
                })
              );
            }
          }
        }
      }
    }
  };

  useFrame(() => {
    if (!isPlaying) {
      return;
    }

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;

    const fps = 1000 / deltaTime;

    throttledSetThreeFPS(Math.round(fps));

    // Update the last frame timestamp
    lastTimeRef.current = currentTime;

    if (mouseDownRef.current) {
      const u = mousePositionRef.current.u;
      const v = mousePositionRef.current.v;

      // Map UV coordinates to world coordinates
      const mouseXWorld = u * dimensions.width;
      const mouseYWorld = (1 - v) * dimensions.height; // Flip Y axis

      // Calculate grid indices
      const mouseColumn = Math.floor(mouseXWorld / particleSize);
      const mouseRow = Math.floor(mouseYWorld / particleSize);

      // Bounds checking
      if (
        mouseColumn >= 0 &&
        mouseColumn < columns &&
        mouseRow >= 0 &&
        mouseRow < rows
      ) {
        handleMouseAction(
          mouseColumn,
          mouseRow,
          selectedMaterial as MaterialOptionsType,
          strokeSizeRef.current
        );
      }
    }

    if (!meshRef.current) return;

    gridRef.current?.grid.forEach((square, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);

      dummy.scale.set(1, 1, 1); // No scaling up

      // Center the grid around the origin
      const x = (col + 0.5) * particleSize;
      const y = (rows - row - 0.5) * particleSize;

      dummy.position.set(x, y, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);

      // Set the color for each instance
      const color = square.isEmpty
        ? backgroundColor
        : square.color ?? backgroundColor;
      meshRef.current.setColorAt(index, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;

    gridRef.current?.update();

    setFrame((prev) => prev + 1);
  });

  if (!isReady) return null; // Render nothing until the grid is ready

  return (
    <>
      {/* Transparent plane to capture pointer events */}
      <mesh
        onPointerDown={(event) => {
          if (event.isPrimary) {
            if (
              (event.pointerType === "mouse" && event.button === 0) ||
              event.pointerType === "touch"
            ) {
              mouseDownRef.current = true;
              if (event.uv) {
                const u = event.uv.x;
                const v = event.uv.y;

                mousePositionRef.current = { u, v };
              }
            }
          }
        }}
        onPointerUp={(event) => {
          if (event.isPrimary) {
            if (
              (event.pointerType === "mouse" && event.button === 0) ||
              event.pointerType === "touch"
            ) {
              mouseDownRef.current = false;
            }
          }
        }}
        onPointerMove={(event) => {
          if (event.isPrimary && mouseDownRef.current) {
            if (event.uv) {
              const u = event.uv.x;
              const v = event.uv.y;

              mousePositionRef.current = { u, v };
            }
          }
        }}
        position={[dimensions.width / 2, dimensions.height / 2, 0]}
      >
        <planeGeometry args={[dimensions.width, dimensions.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group>
        <instancedMesh
          ref={meshRef}
          args={[undefined, undefined, gridRef.current?.grid.length || 0]}
        >
          <planeGeometry args={[particleSize, particleSize]} />
          <meshBasicMaterial />
        </instancedMesh>
      </group>
    </>
  );
};

export default SimulationParticles;
