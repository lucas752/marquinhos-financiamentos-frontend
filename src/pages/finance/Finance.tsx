import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Finance() {
  const [downPayment, setDownPayment] = useState(0.0);
  const [amountFinanced, setAmountFinanced] = useState(1000);
  const [numberInstallments, setNumberInstallments] = useState(1);
  const [result, setResult] = useState(false);

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

  const calcButton = (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault();
    console.log("Valor da entrada " + downPayment);
    console.log("Valor financiado: " + amountFinanced);
    console.log("Número de parcelas: " + numberInstallments);
    setResult(true);
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col mt-10">
        <h1 className="text-[#f3bc26] text-4xl font-bold pb-4">
          Simule o seu financiamento!
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={calcButton}
            className="flex items-center flex-col gap-3"
          >
            <Input
              labelText="Valor da entrada:"
              placeholder="R$0.00"
              type="number"
              min={0}
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
              min={1000}
              onChange={handleChangeAmountFinanced}
            />
            <Button text="Calcular" />
          </form>
        </div>
        {result ? (
          <div className="bg-[#dc143c] mt-3 shadow-lg rounded-2xl p-6">
            <p className="text-[#f3bc26] font-bold ">Katchau!</p>
            <p className="text-white font-bold">Parcela do financiamento: </p>
            <p className="text-white font-bold">Valor total final: </p>
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
