import Particle from "@/components/simulation/materialsThree/Particle";
import { backgroundColorDark } from "@/lib/colorsThree";
import { Color } from "three";

type EmptyPreviewProps = {
  color?: Color;
};

class EmptyPreview extends Particle {
  constructor(
    index: number,
    { color = backgroundColorDark }: EmptyPreviewProps
  ) {
    super(index, { color });
  }
}

export default EmptyPreview;
