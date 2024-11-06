import { Grid } from "@/components/simulation/Grid";
import { MaterialOptionsType } from "@/components/simulation/materials/Material";
import SimulationParticles from "@/components/simulation/SimulationParticles";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { Canvas } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Color, WebGLRenderer } from "three";

type SimulationProps = {
  isPlaying: boolean;
  particleSize: number;
  selectedMaterial: MaterialOptionsType;
  materialColorRef: MutableRefObject<Color>;
};

const Simulation = ({
  particleSize,
  isPlaying,
  selectedMaterial,
  materialColorRef,
}: Readonly<SimulationProps>) => {
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

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer">
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
        <SimulationParticles
          isPlaying={isPlaying}
          dimensions={dimensions}
          materialColorRef={materialColorRef}
          selectedMaterial={selectedMaterial}
          particleSize={particleSize}
          theme={theme}
        />
      </Canvas>
    </div>
  );
};

export default Simulation;
