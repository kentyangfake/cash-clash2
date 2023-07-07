'use client'
import Link from 'next/link';
import { useContext } from 'react';
import { Context, Page, options } from '../../context/context';

export default function Header() {
  const { page, setPage } = useContext(Context);

  function handleOptionClick(option: Page) {
    setPage(option);
  }

  return (
    <div className='flex items-center w-full px-3 py-8 bg-zinc-400 sticky top-0 z-20'>
      <div className='font-bold tracking-wide mr-5'>2016 政治獻金資訊平台</div>
      <div className='flex gap-8'>
        {options.map((option) => (
          <Link
            key={option.text}
            href={option.path}
            style={{ textDecoration: 'none' }}
          >
            <div className={`${(page?.text === option.text) && 'bg-gray-100'} p-3 rounded-md text-base cursor-pointer text-gray-700 hover:bg-gray-200`}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}