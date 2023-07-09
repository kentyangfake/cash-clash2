import { Legislator } from "./types";

export function parseStrNumber(obj: Legislator) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'string' && value.endsWith('%')) {
      acc[key] = parseFloat(value.replace('%', ''));
    } else if (typeof value === 'string' && value.includes(',')) {
      acc[key] = parseInt(value.replace(/,/g, ''), 10);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Legislator);
}
