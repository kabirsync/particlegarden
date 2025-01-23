import SimulationParticles from "@/components/simulation/SimulationParticles";
import {
  drawModeAtom,
  isCanvasHoveredRefAtom,
  strokeSizeRefAtom,
} from "@/components/simulation/simulationState";
import { useTheme } from "@/components/theme/useTheme";
import { useContainerSize } from "@/hooks/useContainerSize";
import { useViewportSize } from "@/hooks/useViewportSize";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { MouseEvent, useRef, useEffect } from "react";
import { WebGLRenderer } from "three";

const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();
  const viewportSize = useViewportSize();
  const { theme } = useTheme();
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const [isCanvasHoveredRef] = useAtom(isCanvasHoveredRefAtom);
  const [strokeSizeRef] = useAtom(strokeSizeRefAtom);
  // const [drawModeRef] = useAtom(drawModeRefAtom);
  const [drawMode] = useAtom(drawModeAtom);
  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the default context menu from appearing
  };

  const getCursorStyle = () => {
    const drawShapes = ["circle", "rectangle", "triangle", "diamond"];
    return drawShapes.includes(drawMode) ? "crosshair" : "pointer";
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (isCanvasHoveredRef.current) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -1 : 1;
        const newSize = Math.max(
          1,
          Math.min(50, strokeSizeRef.current + delta)
        );
        strokeSizeRef.current = newSize;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [containerRef, isCanvasHoveredRef, strokeSizeRef]);

  return (
    <div
      onContextMenu={handleContextMenu}
      ref={containerRef}
      className="w-full h-full relative"
      style={{ cursor: getCursorStyle(), touchAction: "none" }}
    >
      <Canvas
        key={`${viewportSize.width}-${viewportSize.height}`}
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
        }}
        onCreated={(state) => {
          rendererRef.current = state.gl;
        }}
        onMouseEnter={() => {
          isCanvasHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isCanvasHoveredRef.current = false;
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
