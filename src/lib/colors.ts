import { Color } from "three";
export const sandColor = new Color("#dcb159");
export const woodColor = new Color("#332211");

export const backgroundColorDark = new Color("#09090b");
export const backgroundColorLight = new Color("#f4f4f5");

export const transparentColor = new Color("#09090b");

const rgbToHSB = (r: number, g: number, b: number) => {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return { h, s, v };
};

// Convert HSB back to RGB
const hsbToRGB = ({ h, s, v }: { h: number; s: number; v: number }) => {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let rgb = [0, 0, 0];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return rgb.map((channel) => channel + m);
};

// Function to vary color similar to p5's varyColor
export const varyColor = (
  color: Color,
  hueRange = 10,
  satRange = 0.1,
  briRange = 0.1
): Color => {
  const { h, s, v } = rgbToHSB(color.r, color.g, color.b);
  const newH = (h + (Math.random() * 2 - 1) * hueRange + 360) % 360;
  const newS = Math.min(1, Math.max(0, s + (Math.random() * 2 - 1) * satRange));
  const newV = Math.min(1, Math.max(0, v + (Math.random() * 2 - 1) * briRange));
  const [r, g, b] = hsbToRGB({ h: newH, s: newS, v: newV });
  return new Color(r, g, b);
};
