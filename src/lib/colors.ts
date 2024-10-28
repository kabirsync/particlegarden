import * as PIXI from "pixi.js";

export const squareTexture = PIXI.Texture.WHITE; // Create a single neutral base texture for the squares
export const grainColor = new PIXI.Color("#d4d4d8"); // Light
export const sandColor = new PIXI.Color("#dcb159");
export const backgroundColor = new PIXI.Color("#09090b");
export const backgroundColorDarkNumerical = 0x09090b; // Dark - for Stagec component as it does not accept Pixi.Color needs numerical color
export const backgroundColorLightNumerical = 0xd4d4d8; // Light - for Stagec component as it does not accept Pixi.Color needs numerical color
