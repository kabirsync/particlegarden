import Particle from "@/components/simulation/materials/Particle";
import { backgroundColorDark } from "@/lib/colors";
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
