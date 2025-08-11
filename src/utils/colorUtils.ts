/**
 * Color Theory Utilities
 * Provides functions for color calculations and conversions
 */

export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

interface TheColorApiResponse {
  name?: {
    value?: string;
  };
}

export const HUE_DELTA = 360 / 12;

/**
 * Convert hex to RGB
 * @param hex - Hex color string
 * @returns RGB color object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex
 * @param r - Red component
 * @param g - Green component
 * @param b - Blue component
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert RGB to HSL
 * @param r - Red component
 * @param g - Green component
 * @param b - Blue component
 * @returns HSL color object
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 * @param h - Hue component
 * @param s - Saturation component
 * @param l - Lightness component
 * @returns RGB color object
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Create a Color object from hex
 * @param hex - Hex color string
 * @returns Promise<Color> object including fetched color name
 */
export async function createColor(hex: string): Promise<Color> {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const name = await getColorName(hex);

  return { hex, rgb, hsl, name };
}

/**
 * Get complementary color
 * @param color - Color object
 * @returns Promise<Color> Complementary color object
 */
export async function getComplementary(color: Color): Promise<Color> {
  const hsl = color.hsl;
  const complementaryHue = (hsl.h + 6 * HUE_DELTA) % 360;
  const rgb = hslToRgb(complementaryHue, hsl.s, hsl.l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return createColor(hex);
}

/**
 * Get analogous colors
 * @param color - Color object
 * @returns Promise<Color[]> Array of analogous color objects
 */
export async function getAnalogous(color: Color): Promise<Color[]> {
  const hsl = color.hsl;
  const analogous1Hue = (hsl.h + 1 * HUE_DELTA) % 360;
  const analogous2Hue = (hsl.h - 1 * HUE_DELTA + 360) % 360;

  const rgb1 = hslToRgb(analogous1Hue, hsl.s, hsl.l);
  const rgb2 = hslToRgb(analogous2Hue, hsl.s, hsl.l);

  const hex1 = rgbToHex(rgb1.r, rgb1.g, rgb1.b);
  const hex2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);

  const [c1, c2] = await Promise.all([createColor(hex1), createColor(hex2)]);
  return [c1, c2];
}

/**
 * Get triadic colors
 * @param color - Color object
 * @returns Promise<Color[]> Array of triadic color objects
 */
export async function getTriadic(color: Color): Promise<Color[]> {
  const hsl = color.hsl;
  const triadic1Hue = (hsl.h + 4 * HUE_DELTA) % 360;
  const triadic2Hue = (hsl.h - 4 * HUE_DELTA + 360) % 360;

  const rgb1 = hslToRgb(triadic1Hue, hsl.s, hsl.l);
  const rgb2 = hslToRgb(triadic2Hue, hsl.s, hsl.l);

  const hex1 = rgbToHex(rgb1.r, rgb1.g, rgb1.b);
  const hex2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);

  const [c1, c2] = await Promise.all([createColor(hex1), createColor(hex2)]);
  return [color, c1, c2];
}

/**
 * Get tetradic colors
 * @param color - Color object
 * @returns Promise<Color[]> Array of tetradic color objects
 */
export async function getTetradic(color: Color): Promise<Color[]> {
  const hsl = color.hsl;
  const tetradic1Hue = (hsl.h + 4 * HUE_DELTA) % 360; // +4
  const tetradic2Hue = (hsl.h + 6 * HUE_DELTA) % 360; // +6
  const tetradic3Hue = (hsl.h - 2 * HUE_DELTA + 360) % 360; // -2

  const rgb1 = hslToRgb(tetradic1Hue, hsl.s, hsl.l);
  const rgb2 = hslToRgb(tetradic2Hue, hsl.s, hsl.l);
  const rgb3 = hslToRgb(tetradic3Hue, hsl.s, hsl.l);

  const hex1 = rgbToHex(rgb1.r, rgb1.g, rgb1.b);
  const hex2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);
  const hex3 = rgbToHex(rgb3.r, rgb3.g, rgb3.b);

  const [c1, c2, c3] = await Promise.all([
    createColor(hex1),
    createColor(hex2),
    createColor(hex3),
  ]);
  return [color, c1, c2, c3];
}

/**
 * Get tint (lighter version)
 * @param color - Color object
 * @returns Promise<Color> Tint color object
 */
export async function getTint(color: Color): Promise<Color> {
  const hsl = color.hsl;
  const newLightness = Math.min(100, hsl.l + 30);
  const rgb = hslToRgb(hsl.h, hsl.s, newLightness);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return createColor(hex);
}

/**
 * Get shade (darker version)
 * @param color - Color object
 * @returns Promise<Color> Shade color object
 */
export async function getShade(color: Color): Promise<Color> {
  const hsl = color.hsl;
  const newLightness = Math.max(0, hsl.l - 30);
  const rgb = hslToRgb(hsl.h, hsl.s, newLightness);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return createColor(hex);
}

/**
 * Get color name using The Color API
 * @param hex - Hex color string (e.g. #ff0000)
 * @returns Promise<string> - Color name from API or fallback
 */
export async function getColorName(hex: string): Promise<string> {
  const hexNoHash = hex.replace('#', '');
  try {
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${hexNoHash}`);
    if (!res.ok) throw new Error(`Color API error: ${res.status}`);
    const data: TheColorApiResponse = await res.json();
    const apiName = data.name?.value;
    return apiName || 'Custom Color';
  } catch (e) {
    console.warn('Falling back color name for', hex, e);
    return 'Custom Color';
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise<boolean> - True if copy was successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}
