"use client";
import { Legislator } from "@/utils/types";
import { useLegislator } from "@/utils/provider";
import { useState } from "react";

export default function Compare() {
  const { data, isLoading, isFetching, error } = useLegislator();
  const [selectedLegislators, setSelectedLegislators] = useState<Legislator[]>([
    { 姓名: "", 總收入: 0 },
    { 姓名: "", 總收入: 0 },
  ]);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>資訊對比分析</h1>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          {data.map((legislator: Legislator) => (
            <div key={legislator.姓名}>{legislator.姓名}</div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
