"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Page {
  text: "資訊對比分析" | "資金來源分析" | "政治獻金明細";
  path: "/" | "/source-analysis" | "/legislator" | `/legislator/${string}`;
}

const options: Page[] = [
  { text: "資訊對比分析", path: "/" },
  { text: "資金來源分析", path: "/source-analysis" },
  { text: "政治獻金明細", path: "/legislator" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex items-center w-full px-8 py-3 bg-gray-300 sticky top-0 z-20">
      <Link href={"/"} className="font-bold tracking-wide mr-24">
        2016 政治獻金資訊平台
      </Link>
      <div className="flex gap-8">
        {options.map((option) => (
          <Link key={option.text} href={option.path} className="no-underline">
            <div
              className={`${
                pathname === option.path && "bg-gray-50"
              } p-3 rounded-md text-base cursor-pointer text-gray-700 hover:bg-gray-200`}
            >
              {option.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
