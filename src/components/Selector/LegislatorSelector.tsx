import { Legislator } from '@/utils/types';
import { SetStateAction, useEffect, useState } from 'react';

interface LegislatorSelectorProps {
  initialLegislators: Legislator[];
  selectedLegislators: Legislator[];
  setSelectedLegislators: React.Dispatch<SetStateAction<Legislator[]>>;
}

// const OptionWrapper = styled.div<OptionWrapperProps>`
//   height: ${({ height }) => height};
//   transition: height 0.7s;
//   overflow-y: auto;
//   position: absolute;
//   z-index: 10;
//   border-radius: 5px;

//   &::-webkit-scrollbar {
//     width: 5px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background-color: #676b6b;
//   }

//   &::-webkit-scrollbar-track {
//     background-color: #a4a4a3;
//   }
// `;

// const Option = styled.button`
//   width: 100%;
//   padding: 10px 0;
//   border: 0;
//   border-bottom: 0.5px solid #aaadad;
//   cursor: pointer;
//   color: #676b6b;

//   &:disabled {
//     cursor: not-allowed;
//     background-color: #efefef;
//     color: #aaadad;
//   }

//   &:not(:disabled):hover {
//     border-left: 5px solid #60aafe;
//     font-weight: 700;
//   }
// `;

export default function LegislatorSelector({
  initialLegislators,
  selectedLegislators,
  setSelectedLegislators,
}: LegislatorSelectorProps) {
  const [legislators, setLegislators] =
    useState<Legislator[]>(initialLegislators);
  const [clickedSelector, setClickedSelector] = useState<number | null>(null);
  const [input, setInput] = useState<string[]>(['', '']);

  function handleSelectorClick(index: number) {
    setLegislators(initialLegislators);
    if (clickedSelector !== index) {
      setClickedSelector(index);
      return;
    }
    setClickedSelector(null);
  }

  function handleLegislatorSelect(legislatorName: string, index: number) {
    const output = [...selectedLegislators];
    const legislator = legislators.find(
      (legislator) => legislator.姓名 === legislatorName
    );
    if (legislator) {
      output[index] = legislator;
      setSelectedLegislators(output);
      setClickedSelector(null);
      setInput(['', '']);
    }
  }

  function filterLegislator(input: string) {
    const newLegislators = initialLegislators.filter((legislator) =>
      legislator.姓名.includes(input)
    );
    newLegislators && setLegislators(newLegislators);
  }

  function handleSearchInput(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    filterLegislator(e.target.value);
    const newInput = [...input];
    newInput[index] = e.target.value;
    setInput(newInput);
  }

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setClickedSelector(null);
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full flex justify-center gap-[2.5vw] mb-8">
      {selectedLegislators.map((legislator, parentIndex) => (
        <div className="w-full relative" key={parentIndex}>
          <div className=" text-sm pt-0 pr-0 pb-1 pl-3">
            政治人物 {selectedLegislators.length > 1 && parentIndex + 1}
          </div>
          <div
            className={`${
              parentIndex === clickedSelector
                ? 'bg-[#60aafe] text-white'
                : 'bg-[#efefef]'
            } w-full h-12 rounded px-3 cursor-pointer relative flex items-center`}
            onClick={() => handleSelectorClick(parentIndex)}
          >
            {legislator?.姓名}
            <div className="flex items-center justify-center absolute top-[50%] right-[10px] -translate-y-1/2">
              <div>拉</div>
            </div>
          </div>
          <div
            className={`${
              parentIndex === clickedSelector ? 'h-[330px]' : 'h-0'
            } w-full transition-all duration-700 overflow-y-auto absolute z-10 rounded`}
          >
            <div className="w-full p-3 bg-[#efefef] sticky top-0 left-0">
              <input
                className="w-full h-10 px-3 outline-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearchInput(parentIndex, e)
                }
                value={input[parentIndex]}
                placeholder="搜尋候選人..."
              />
            </div>
            {legislators.length > 0 ? (
              legislators.map((legislator, index) => (
                <button
                  className="w-full py-2 border-b-[0.5px] border-zinc-800 cursor-pointer text-[#676b6b] disabled:cursor-not-allowed bg-[#efefef] disabled:text-[#aaadad]"
                  key={index}
                  disabled={
                    selectedLegislators.findIndex(
                      (obj) => obj.姓名 === legislator.姓名
                    ) !== -1
                  }
                  onClick={() =>
                    handleLegislatorSelect(legislator.姓名, parentIndex)
                  }
                >
                  {legislator.姓名}
                </button>
              ))
            ) : (
              <button className="w-full py-2 border-b-[0.5px] border-zinc-800 bg-[#efefef] text-[#676b6b] cursor-not-allowed">
                查無此人
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
