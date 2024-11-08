import { Grid } from "@/components/simulation/Grid";
import SimulationParticles from "@/components/simulation/SimulationParticles";
import { particleSizeAtom } from "@/components/simulation/simulationState";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { WebGLRenderer } from "three";

const Simulation = () => {
  const [particleSize] = useAtom(particleSizeAtom);
  const { containerRef, dimensions } = useContainerSize();
  const { theme } = useTheme();
  const gridRef = useRef<Grid>();
  const [, setIsReady] = useState(false);
  const rendererRef = useRef<WebGLRenderer | null>(null);

  const columns = Math.floor(dimensions.width / particleSize);
  const rows = Math.floor(dimensions.height / particleSize);

  useEffect(() => {
    if (columns > 0 && rows > 0) {
      gridRef.current = new Grid({ columns, rows });
      setIsReady(true); // force rerender
    }
  }, [columns, dimensions.height, dimensions.width, particleSize, rows]);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the default context menu from appearing
  };
  return (
    <div
      onContextMenu={handleContextMenu}
      ref={containerRef}
      className="w-full h-full relative cursor-pointer"
    >
      <Canvas
        orthographic
        camera={{
          right: dimensions.width,
          top: dimensions.height,
          position: [0, 0, 100],
        }}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
          cursor: "pointer",
        }} // TouchAction prevents scrolling on touch
        onCreated={(state) => {
          rendererRef.current = state.gl;
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <SimulationParticles dimensions={dimensions} theme={theme} />
      </Canvas>
    </div>
  );
};

export default Simulation;
