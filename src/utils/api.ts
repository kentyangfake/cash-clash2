import { Legislator } from "./types";
import { parseStrNumber } from "./parseNumber";

export async function fetchLegislators(): Promise<Legislator[]> {
    const res = await fetch("/api/legislators");
    const json = await res.json();
    const finallegislatorsData = json.map((obj: Legislator) =>
          parseStrNumber(obj)
        );
    return finallegislatorsData;
  }