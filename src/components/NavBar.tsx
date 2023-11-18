import React from 'react'
import logo from "../assets/marquinhos.png"

export default function NavBar() {
  return (
    <nav className='bg-[#dc143c] flex flex-row justify-between'>
            <div className='w-1/12 h-1/12 p-2'>
              <a href="/"> <img src={logo} alt="" /></a>
            </div>
            <div className='h-1/12 flex items-center p-2'>
               <ul className='flex flex-row justify-center items-center gap-5 text-white text-lg font-semibold'>
                    <li className='cursor-pointer'><a href="/car">Carros</a></li>
                    <li className='cursor-pointer'><a href="/moto">Motos</a></li>
                    <li className='cursor-pointer'><a href="/finance">Financiar</a></li>
               </ul>
            </div>
    </nav>
  )
}
