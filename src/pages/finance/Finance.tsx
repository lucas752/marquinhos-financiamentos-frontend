import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { Financing } from "../../interfaces/financing";
import { toast } from "react-toastify";
import { AiFillThunderbolt } from "react-icons/ai";

export default function Finance() {
  const [downPayment, setDownPayment] = useState(0.0);
  const [amountFinanced, setAmountFinanced] = useState(0);
  const [numberInstallments, setNumberInstallments] = useState(0);
  const [financingResults, setFinancingResults] = useState<Financing>();

  const handleChangeDownPayment = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setDownPayment(Number(value));
  };

  const handleChangeAmountFinanced = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAmountFinanced(Number(value));
  };

  const handleChangeNumberInstallments = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setNumberInstallments(Number(value));
  };

  const handleCalcButton = async (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault();
    if (downPayment > amountFinanced) {
      toast.warn(
        "O valor da entrada tem que ser menor que o valor do financiamento!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      try {
        const response = await api.get("/financing", {
          params: {
            amountFinanced: amountFinanced,
            numberInstallments: numberInstallments,
            downPayment: downPayment,
          },
        });
        setFinancingResults(response.data);
      } catch (error) {
        toast.error("Ocorreu um erro!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-[#f3bc26] text-4xl font-bold pb-4">
          Simule o seu financiamento!
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleCalcButton}
            className="flex items-center flex-col gap-3"
          >
            <Input
              labelText="Valor da entrada:"
              placeholder="R$0.00"
              type="number"
              min={0}
              step={0.01}
              onChange={handleChangeDownPayment}
            />
            <Input
              labelText="Quantidade de parcelas:"
              placeholder="1"
              type="number"
              min={1}
              max={60}
              onChange={handleChangeNumberInstallments}
            />
            <Input
              labelText="Valor do financiamento: "
              placeholder="R$1000.00"
              type="number"
              step={0.01}
              min={1}
              onChange={handleChangeAmountFinanced}
            />
            <Button text="Calcular" />
          </form>
        </div>
        {financingResults ? (
          <div className="bg-[#dc143c] mt-3 shadow-lg rounded-2xl p-6">
            <p className="flex text-[#f3bc26] font-bold flex-row items-center">
              Katchau! <AiFillThunderbolt color="#f3bc26" />
            </p>
            <p className="text-white font-bold">
              Parcela do financiamento:{" "}
              {financingResults.installmentsValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-white font-bold">
              Valor total final:{" "}
              {financingResults.finalAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-white font-bold">
              Gostou?{" "}
              <a className="text-[#f3bc26]" href="">
                Entre em contato!
              </a>
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
