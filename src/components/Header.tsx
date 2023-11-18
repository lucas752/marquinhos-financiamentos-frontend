import React from 'react'
import { AiFillThunderbolt } from "react-icons/ai";

export default function Header() {
  return (
        <header className='bg-[#565651] flex flex-row justify-center  items-center p-1'>
            <p className='text-[#ffffff]'>Marquinhos Financiamentos</p>
            <p><AiFillThunderbolt color="#f3bc26"/></p>
        </header>
  )
}
