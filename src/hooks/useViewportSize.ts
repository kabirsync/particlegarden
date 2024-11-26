import { useState, useEffect } from "react";

interface ViewportSize {
  width: number;
  height: number;
}

export const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportSize;
};
