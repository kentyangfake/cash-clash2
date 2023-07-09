import { Legislator } from "./types";

export async function fetchLegislators(url: string): Promise<Legislator[]> {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }