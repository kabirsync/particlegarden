"use client";

// import {
//   FallingSandSimulationOptions,
//   MaterialOptions,
// } from "@/lib/simulations";
import { throttle } from "@/lib/utils";
import { useFrame } from "@react-three/fiber";
// import { useAtom } from "jotai";
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
// import { threeFPSAtom } from "../fallingSandState";
import { Grid } from "./GridThree";
import {
  MaterialMapping,
  MaterialOptionsType,
} from "@/components/simulation/materialsThree/Material";
// import { materialMapping } from "./Materials/utils";

interface ThreeRenderProps {
  dimensions: { height: number; width: number };
  theme?: string | undefined;
  // isPlayingRef: React.MutableRefObject<boolean>;
  isPlaying: boolean;
  // simulationOptions: FallingSandSimulationOptions;
  setFPS: Dispatch<SetStateAction<number>>;
  materialColorRef: MutableRefObject<Color>;
  strokeSizeRef: MutableRefObject<number>;
  selectedMaterial: MaterialOptionsType;
  particleSize: number;
}

const ThreeRender = ({
  // isPlayingRef,
  isPlaying,
  dimensions,
  particleSize,
  // simulationOptions,
  materialColorRef,
  theme,
  setFPS,
  strokeSizeRef,
  selectedMaterial,
}: ThreeRenderProps) => {
  // console.log("%cHello", "color: green; background: yellow; font-size: 30px");

  const dummy = new Object3D();
  // const {
  //   materialRef,
  //   matrixRef,
  //   materialColorRef,
  //   fuelRef,
  //   chanceToCatchRef,
  // } = simulationOptions;
  const backgroundColor =
    theme === "light" ? new Color("#d4d4d8") : new Color("#09090b");

  const [, setFrame] = useState(0);
  // const [, setThreeFPS] = useAtom(threeFPSAtom);
  const gridRef = useRef<Grid>();

  const [isReady, setIsReady] = useState(false); // State to trigger re-render
  const lastTimeRef = useRef(performance.now());
  // const { camera, size } = useThree();

  const meshRef = useRef<InstancedMesh>(null!);

  const throttledSetThreeFPS = useMemo(
    () => throttle((fps: number) => setFPS(fps), 1000),
    [setFPS]
  );

  // **Add a ref to track if the mouse is down**
  const mouseDownRef = useRef(false);

  // **Add a ref to track the mouse position**
  const mousePositionRef = useRef({ u: 0, v: 0 }); // Using UV coordinates

  // const particleSize = 4;
  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

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
    // const matrix = 10;
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
                  // fuel: fuelRef.current,
                  // chanceToCatch: chanceToCatchRef.current,
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
      // if (square.empty) return;
      const col = index % columns;
      const row = Math.floor(index / columns);

      // if (square.empty) {
      //   // dummy.scale.set(0, 0, 0);
      // } else {
      dummy.scale.set(1, 1, 1); // No scaling up
      // }

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

                // Update mouse position reference
                mousePositionRef.current = { u, v };
              }

              // Capture the pointer using the canvas ref
              // canvasRef.current?.setPointerCapture(event.pointerId);

              // Prevent default behavior
              // event.nativeEvent.preventDefault();
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

              // Release the pointer capture using the canvas ref
              // canvasRef.current?.releasePointerCapture(event.pointerId);

              // Prevent default behavior
              // event.nativeEvent.preventDefault();
            }
          }
        }}
        onPointerMove={(event) => {
          if (event.isPrimary && mouseDownRef.current) {
            if (event.uv) {
              const u = event.uv.x;
              const v = event.uv.y;

              // Update mouse position reference
              mousePositionRef.current = { u, v };
            }
            // Prevent default behavior
            // event.nativeEvent.preventDefault();
          }
        }}
        position={[dimensions.width / 2, dimensions.height / 2, 0]}
      >
        <planeGeometry args={[dimensions.width, dimensions.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* <planeGeometry args={[parentSize.width, parentSize.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh> */}
      <group>
        <instancedMesh
          ref={meshRef}
          args={[undefined, undefined, gridRef.current?.grid.length || 0]}
        >
          <planeGeometry args={[particleSize, particleSize]} />
          <meshBasicMaterial color={0xffffff} />
        </instancedMesh>
        {/* {gridRef.current &&
          gridRef.current.grid.map((item, index) => {
            if (!item.empty) {
              const col = index % columns;
              const row = Math.floor(index / columns);

              const x = col * particleSize + 0.5 * particleSize;
              const y = (rows - row - 1) * particleSize + 0.5 * particleSize; // Adjusted Y position

              return (
                <mesh
                  key={index}
                  position={new Vector3(x, y, 0)} // Keep Z as 0 for 2D
                >
                  <planeGeometry args={[particleSize - 4, particleSize - 4]} />
                  <meshBasicMaterial color={item.color || backgroundColor} />
                </mesh>
              );
            }
          })} */}
      </group>
    </>
  );
};

export default ThreeRender;
