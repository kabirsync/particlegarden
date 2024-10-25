import { useContainerSize } from "@/hooks/useContainerSize";
import { Container, Sprite, Stage, Text } from "@pixi/react";
import { BlurFilter, TextStyle } from "pixi.js";
import { useMemo } from "react";
const Simulation = () => {
  const { containerRef, dimensions } = useContainerSize();
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";
  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ backgroundColor: "black" }}
      >
        <Sprite image={bunnyUrl} x={300} y={150} />
        <Sprite image={bunnyUrl} x={500} y={150} />
        <Sprite image={bunnyUrl} x={400} y={200} />
        <Container x={200} y={200}>
          <Text
            text="Hello World"
            anchor={0.5}
            x={220}
            y={150}
            filters={[blurFilter]}
            style={
              new TextStyle({
                align: "center",
                fill: "0xffffff",
                fontSize: 50,
                letterSpacing: 20,
                dropShadow: true,
                dropShadowColor: "#E72264",
                dropShadowDistance: 6,
              })
            }
          />
        </Container>
      </Stage>
    </div>
  );
};

export default Simulation;
