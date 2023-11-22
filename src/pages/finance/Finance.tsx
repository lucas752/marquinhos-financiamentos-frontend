import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Finance() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col">
        <h1 className="text-[#f3bc26] text-4xl font-bold p-4">
          Simule o seu financiamento!
        </h1>
        <div className="flex justify-center">
          <form action="" className="flex items-center flex-col gap-3">
            <Input
              labelText="Valor da entrada:"
              placeholder="R$0.00"
              type="number"
              min={0}
            />
            <Input
              labelText="Quantidade de parcelas:"
              placeholder="1"
              type="number"
              min={1}
            />
            <Input
              labelText="Valor do financiamento: "
              placeholder="R$1000.00"
              type="number"
              min={1000}
            />
            <Button text="Calcular" />
          </form>
        </div>
      </div>
    </div>
  );
}
