import { Dimension } from "@/types";
import { useEffect, useRef, useState } from "react";

export const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const { width, height } = container.getBoundingClientRect();

      if (width && height) {
        setDimensions({ width, height });
      }
    }
  }, []);

  return { containerRef, dimensions };
};
