import * as PIXI from "pixi.js";

export const squareTexture = PIXI.Texture.WHITE; // Create a single neutral base texture for the squares
export const sandColor = new PIXI.Color("#dcb159");
export const backgroundColorDark = new PIXI.Color("#09090b");
export const backgroundColorLight = new PIXI.Color("#d4d4d8");

export const backgroundColorDarkNumerical = 0x09090b; // Dark - for Stagec component as it does not accept Pixi.Color needs numerical color
export const backgroundColorLightNumerical = 0xd4d4d8; // Light - for Stagec component as it does not accept Pixi.Color needs numerical color
