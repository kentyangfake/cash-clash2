/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
"use client";
import { ReactNode, createContext, useRef, useState } from "react";

export interface Page {
  text: "資訊對比分析" | "資金來源分析" | "政治獻金明細";
  path:
    | "/compare"
    | "/source-analysis"
    | "/legislator"
    | `/legislator/${string}`;
}

export const options: Page[] = [
  { text: "資訊對比分析", path: "/compare" },
  { text: "資金來源分析", path: "/source-analysis" },
  { text: "政治獻金明細", path: "/legislator" },
];

interface ContextProviderProps {
  children: ReactNode;
}

export interface Legislator {
  姓名: string;
  [key: string]: string | number;
}

export const Context = createContext<{
  legislators: Legislator[];
  setLegislators: React.Dispatch<React.SetStateAction<Legislator[]>>;
  initialLegislators: React.MutableRefObject<Legislator[]>;
}>({
  legislators: [],
  setLegislators: () => {},
  initialLegislators: { current: [] },
});

export default function ContextProvider({ children }: ContextProviderProps) {
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const initialLegislators = useRef<Legislator[]>([]);

  return (
    <Context.Provider
      value={{
        legislators,
        setLegislators,
        initialLegislators,
      }}
    >
      {children}
    </Context.Provider>
  );
}
