import { useState } from "react";
import Select from "react-select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AiFillThunderbolt } from "react-icons/ai";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export function Car() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [downPayment, setDownPayment] = useState(0.0);
  const [numberInstallments, setNumberInstallments] = useState(0);

  const handleChangeDownPayment = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setDownPayment(Number(value));
  };

  const handleChangeNumberInstallments = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setNumberInstallments(Number(value));
  };

  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };
  return (
    <div className="mt-10">
      <h1 className="flex text-[#f3bc26] text-4xl font-bold pb-4 justify-center">
        Simule o financiamento do seu carro dos sonhos!
      </h1>
      <div className="flex flex-col gap-5 justify-between sm:flex-row sm:gap-0 mt-4">
        <section className="flex flex-1 justify-center flex-col gap-8">
          <section className="flex gap-2 flex-col items-center">
            <Select
              defaultValue={selectedOption}
              onChange={(option) => handleChange(option)}
              options={options}
              placeholder={"Marca"}
              className="w-72"
            />
            <Select
              defaultValue={selectedOption}
              onChange={(option) => handleChange(option)}
              options={options}
              placeholder={"Modelo"}
              className="w-72"
              isDisabled
            />
            <Select
              defaultValue={selectedOption}
              onChange={(option) => handleChange(option)}
              options={options}
              placeholder={"Ano"}
              className="w-72"
              isDisabled={true}
            />
          </section>
          <section>
            <form action="" className="flex flex-1 flex-col items-center gap-2">
              <Input
                onChange={handleChangeDownPayment}
                placeholder="Entrada"
                type="number"
                min={0}
              ></Input>
              <Input
                onChange={handleChangeNumberInstallments}
                placeholder="Quantidade de parcelas"
                type="number"
                min={1}
              ></Input>
              <Button text="Calcular" />
            </form>
          </section>
        </section>
        <section className="flex flex-1 justify-center">
          <div className="flex flex-col bg-[#dc143c] shadow-lg rounded-2xl p-6 gap-3">
            <section>
              <p className="flex text-[#f3bc26] font-bold flex-row items-center">
                Katchau! <AiFillThunderbolt color="#f3bc26" />
              </p>
              <p className="text-white font-bold">
                Marca: ASTON MARTIN{" "}
                {
                  //financingResults.installmentsValue.toLocaleString("pt-BR", {
                  //style: "currency",
                  //currency: "BRL",
                  //})
                }
              </p>
              <p className="text-white font-bold">
                Modelo: DB9 Coupe 6.0 V12 510cv
              </p>
              <p className="text-white font-bold">Ano: 2016</p>
              <p className="text-white font-bold">
                Tipo de combustível: Gasolina
              </p>
              <p className="text-white font-bold">Preço: R$ 1.267.585,00</p>
            </section>
            <section>
              <p className="text-white font-bold">
                Parcela do Financiamento: R$ 32.188,33
              </p>
              <p className="text-white font-bold">
                Valor total final: R$ 1.931.299,66
              </p>
              <p className="text-white font-bold">
                Gostou?{" "}
                <a className="text-[#f3bc26]" href="">
                  Entre em contato!
                </a>
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
