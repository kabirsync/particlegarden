import { Dimension } from "@/types";
import { useLayoutEffect, useRef, useState } from "react";

export const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const container = containerRef.current;
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        if (width && height) {
          setDimensions({ width, height });
        }
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return { containerRef, dimensions };
};
