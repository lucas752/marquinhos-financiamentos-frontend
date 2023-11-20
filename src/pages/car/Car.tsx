import React from 'react'
import { FaSearch } from "react-icons/fa";

export function Car() {
  return (
    <>
      <section>
        <div className='flex flex-row justify-between items-center p-2'>
          <div className='py-2'>
            <h2 className='text-3xl font-semibold'>Carros</h2>
          </div>
          <div className='py-2 flex flex-row gap-2 mr-10'>
            <input type="text" placeholder='Pesquisar...' className=' focus:border-[#dc143c] focus:outline-none   border-2 p-2 rounded-3xl' />
            <button className='hover:scale-110 duration-500'><FaSearch size={20}  /></button>
          </div>
        </div>
      </section>
      <section>
        
      </section>
    </>
  )
}
