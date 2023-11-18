import React from 'react'
import logo from "../../assets/marquinhos.png"

export function Home() {
  return (
    <main className='w-full h-screen flex flex-col'>
        <header className='bg-[#565651] flex flex-row justify-center p-1'>
            <p className='text-[#ffffff]'>Marquinhos Financiamentos</p>
        </header>
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
        <section className='flex flex-row justify-center'>
            <div className='flex flex-col justify-center  items-center mt-10 w-9/12'>
                <h1 className='text-[#f3bc26] text-4xl font-bold'>Bem-vindo à Marquinhos Financiamentos</h1>
                <h2 className='text-[#f3bc26] text-3xl font-bold'>Sua Jornada para o Carro ou a Moto dos Sonhos Começa Aqui!</h2>
            </div>
        </section>
       
        <footer className='bg-[#565651] w-full flex flex-row justify-center p-1 mt-auto'>
            <p className='text-[#ffffff]'>&copy; Marquinhos Financiamentos</p>
        </footer>
    </main>
  )
}
