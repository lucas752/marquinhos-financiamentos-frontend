import React, { useState } from "react";

import rust from "../../assets/rusteze5.png";
import sally from "../../assets/Sally.webp";

import Modal from "react-modal";
import axios from "axios";

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchData = async () => {
    try {
      const requestData = {
        messages: [{ role: "user", content: content }],
        do_sample: true,
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.95,
      };

      const result = await axios.post(
        "http://localhost:5000/api/get_maritalk_response",
        requestData
      );

      setResponse(result.data.answer);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <>
      <section className="flex flex-row justify-center">
        <div className="flex flex-col justify-center  items-center mt-10 w-9/12">
          <h1 className="text-[#f3bc26] text-4xl font-bold">
            Bem-vindo à Marquinhos Financiamentos
          </h1>
          <h2 className="text-[#f3bc26] text-3xl font-bold">
            Sua Jornada para o Carro ou a Moto dos Sonhos Começa Aqui!
          </h2>
        </div>
      </section>
      <section className="flex flex-row gap-10 p-6 mt-18">
        <div className="w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white  duration-500 cursor-pointer hover:scale-105">
          <p className="font-semibold">Soluções Personalizadas</p>
          <p>
            Sabemos que cada cliente é único, e é por isso que oferecemos
            soluções de financiamento personalizadas para atender às suas
            necessidades específicas.{" "}
          </p>
        </div>
        <div className="w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white duration-500 cursor-pointer hover:scale-105">
          <p className="font-semibold">Processo Descomplicado</p>
          <p>
            Na Marquinhos Financiamentos, simplificamos o processo de
            financiamento para que você possa se concentrar na empolgação de
            escolher o carro perfeito.
          </p>
        </div>
        <div className="w-4/12 shadow-md hover:shadow-xl rounded-2xl flex flex-col justify-center items-center p-2 gap-5 hover:bg-[#f3bc26] hover:text-white  duration-500 cursor-pointer hover:scale-105">
          <p className="font-semibold">Taxas Competitivas</p>
          <p>
            Oferecemos taxas de juros competitivas para garantir que você
            obtenha o melhor valor possível ao financiar seu carro.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mt-4">
        <div className="w-1/12 h-1/12">
          <img src={rust} alt="" />
        </div>
        <div className="flex flex-row justify-center items-center mt-4 gap-4">
          <div className="w-1/12 h-1/12">
            <img src={sally} alt="" />
          </div>
          <h3 className="">
            Ainda tem dúvidas? tire algumas antes com a Sally clicando logo
            abaixo
          </h3>
        </div>
        <div>
          <button
            className="bg-[#f3bc26] p-2 rounded-[12px] hover:scale-105 duration-500"
            onClick={openModal}
          >
            Conversar
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Exemplo de Modal"
          className={"flex justify-center items-center"}
        >
          <div className=" flex flex-col bg-white w-7/12 p-2 gap-4">
            <div className="flex flex-col self-end  w-7/12">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className=" focus:border-[#dc143c] focus:outline-none border-2 p-2 rounded-3xl"
              />
              <button onClick={fetchData} className="self-end">
                Obter Resposta
              </button>
            </div>

            <div className="flex flex-col self-start w-7/12">{response}</div>
          </div>

          <button onClick={closeModal}>Fechar Modal</button>
        </Modal>
      </section>
    </>
  );
}
