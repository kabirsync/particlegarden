import SimulationParticles from "@/components/simulation/SimulationParticles";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Canvas } from "@react-three/fiber";
import { MouseEvent, useRef } from "react";
import { WebGLRenderer } from "three";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();
  const { theme } = useTheme();
  const rendererRef = useRef<WebGLRenderer | null>(null);

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
