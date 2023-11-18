import React from 'react'
import logo from "../assets/marquinhos.png"

export default function NavBar() {
  return (
    <nav className='bg-[#dc143c] flex flex-row justify-between'>
            <div className='w-1/12 h-1/12 p-2'>
                <img src={logo} alt="" />
            </div>
            <div className='h-1/12 flex items-center p-2'>
               <ul className='flex flex-row justify-center items-center gap-5 text-white text-lg font-semibold'>
                    <li className='cursor-pointer'>Carros</li>
                    <li className='cursor-pointer'>Motos</li>
                    <li className='cursor-pointer'>Financiar</li>
               </ul>
            </div>
    </nav>
  )
}
