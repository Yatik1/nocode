export function rgbaToHex(rgba: string): string {
    const match = rgba.match(
      /rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([\d.]+))?\s*\)/
    );

    if (!match) return rgba; 

    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : 255;

    const toHex = (val: number) => val.toString(16).padStart(2, "0").toUpperCase();

    return a === 255
     ? `#${toHex(r)}${toHex(g)}${toHex(b)}`
     : `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  }