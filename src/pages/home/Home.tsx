import React from 'react'
import logo from "../../assets/marquinhos.png"
import { AiFillThunderbolt } from "react-icons/ai";
import rust from "../../assets/rusteze5.png"

export function Home() {
  return (
    <main className='w-full h-screen flex flex-col bg-slate-50'>
        <header className='bg-[#565651] flex flex-row justify-center  items-center p-1'>
            <p className='text-[#ffffff]'>Marquinhos Financiamentos</p>
            <p><AiFillThunderbolt color="#f3bc26"/></p>
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
        <section className='flex flex-row gap-10 p-6 mt-18'>
            <div className='w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white  duration-500 cursor-pointer hover:scale-105'>
                <p className='font-semibold'>Soluções Personalizadas</p>
                <p>Sabemos que cada cliente é único, e é por isso que oferecemos soluções de financiamento personalizadas para atender às suas necessidades específicas. </p>
            </div>
            <div className='w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white duration-500 cursor-pointer hover:scale-105'>
                <p className='font-semibold'>Processo Descomplicado</p>
                <p>Na Marquinhos Financiamentos, simplificamos o processo de financiamento para que você possa se concentrar na empolgação de escolher o carro perfeito.</p>
            </div>
            <div className='w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white  duration-500 cursor-pointer hover:scale-105'>
                <p className='font-semibold'>Taxas Competitivas</p>
                <p>Oferecemos taxas de juros competitivas para garantir que você obtenha o melhor valor possível ao financiar seu carro.</p>
            </div>
        </section>
        <section className='flex flex-row justify-center mt-4'>
            <div className='w-1/12 h-1/12'>
                <img src={rust} alt="" />
            </div>
        </section>
       
        <footer className='bg-[#565651] w-full flex flex-row justify-center p-1 mt-auto'>
            <p className='text-[#ffffff]'>&copy; Marquinhos Financiamentos</p>
        </footer>
    </main>
  )
}
