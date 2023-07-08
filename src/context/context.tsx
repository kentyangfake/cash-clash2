/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
"use client";
import { ReactNode, createContext, useRef, useState } from "react";

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
