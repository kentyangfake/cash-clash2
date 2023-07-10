'use client';
import LegislatorSelector from '@/components/Selector/LegislatorSelector';
import { useLegislator } from '@/utils/provider';
import { Legislator } from '@/utils/types';
import { useEffect, useRef, useState } from 'react';

export default function Compare() {
  const { data, isLoading, isFetching, isError } = useLegislator();
  const [selectedLegislators, setSelectedLegislators] = useState<Legislator[]>([
    { 姓名: '', 總收入: 0 },
    { 姓名: '', 總收入: 0 },
  ]);
  const initialLegislatorsSet = useRef<boolean>(false);

  useEffect(() => {
    if (data && !initialLegislatorsSet.current) {
      setSelectedLegislators([data[0], data[1]]);
      initialLegislatorsSet.current = true;
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>資訊對比分析</h1>
      {isError && <p>Oh no, there was an error</p>}
      {(isLoading || isFetching) && <p>Loading...</p>}
      {data && (
        <div className="w-full">
          <LegislatorSelector
            initialLegislators={data}
            selectedLegislators={selectedLegislators}
            setSelectedLegislators={setSelectedLegislators}
          />
        </div>
      )}
    </main>
  );
}
