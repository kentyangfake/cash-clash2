"use client";
import { fetchLegislators } from "@/utils/api";
import { Context } from "@/context/context";
import { Legislator } from "@/utils/types";
import { useContext, useEffect } from "react";
import { parseStrNumber } from "@/utils/parseNumber";

export default function Home() {
  const { legislators, initialLegislators, setLegislators } =
    useContext(Context);

  useEffect(() => {
    async function getLegislators() {
      const legislatorsRawData = await fetchLegislators("/api/legislators");
      const finallegislatorsData = legislatorsRawData.map((obj) =>
        parseStrNumber(obj)
      );
      setLegislators(finallegislatorsData);
      initialLegislators.current = finallegislatorsData;
    }

    getLegislators();
  }, []);
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>資訊對比分析</h1>
      {legislators.map((legislator) => (
        <div>{legislator.姓名}</div>
      ))}
    </main>
  );
}
