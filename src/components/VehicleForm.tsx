import { useEffect, useState } from "react";
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
} from "react-select";
import { FipeInformation } from "../interfaces/fipeInformation";
import { Vehicle } from "../interfaces/vehicle";
import { Financing } from "../interfaces/financing";
import { api } from "../services/api";
import Input from "./Input";
import Button from "./Button";
import { AiFillThunderbolt } from "react-icons/ai";
import { errorToast } from "../functions/errorToast";
import { warnToast } from "../functions/warnToast";

type OptionType = {
  value: string;
  label: string;
};

export default function VehicleForm(props: { vehicleType: string }) {
  const [financingResults, setFinancingResults] = useState<Financing>();
  const [selectedBrandOption, setSelectedBrandOption] =
    useState<OptionType | null>(null);
  const [selectedModelOption, setSelectedModelOption] =
    useState<OptionType | null>(null);
  const [selectedYearOption, setSelectedYearOption] =
    useState<OptionType | null>(null);
  const [downPayment, setDownPayment] = useState(0.0);
  const [numberInstallments, setNumberInstallments] = useState(0);
  const [brands, setBrands] = useState<FipeInformation[]>([]);
  const [models, setModels] = useState<FipeInformation[]>([]);
  const [years, setYears] = useState<FipeInformation[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [modelDisabled, setModelDisabled] = useState(true);
  const [yearDisabled, setYearDisabled] = useState(true);

  const selectStyles = {
    control: (
      base: CSSObjectWithLabel,
      state: ControlProps<OptionType, false, GroupBase<OptionType>>
    ) => ({
      ...base,
      borderColor: state.isFocused ? "red" : "#c9c9c9",
      borderWidth: "2px",
      borderRadius: "1.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: state.menuIsOpen ? "red" : "#c9c9c9",
      },
    }),
  };

  useEffect(() => {
    const brands = async () => {
      try {
        const response = await api.get("/vehicle", {
          params: {
            type: props.vehicleType,
          },
        });
        setBrands(response.data);
      } catch (error) {
        errorToast("Ocorreu um erro ao buscar as marcas!");
      }
    };
    brands();
  }, [props.vehicleType]);

  const brandOptions = brands.map((brand) => ({
    value: brand.code,
    label: brand.name,
  }));

  const modelOptions = models.map((model) => ({
    value: model.code,
    label: model.name,
  }));

  const yearOptions = years.map((year) => ({
    value: year.code,
    label: year.name,
  }));

  const getModel = async (model: string | null) => {
    try {
      const response = await api.get(`/vehicle/model`, {
        params: {
          type: props.vehicleType,
          brandId: Number(model),
        },
      });
      setModels(response.data);
      setModelDisabled(false);
    } catch (error) {
      errorToast("Ocorreu um erro ao buscar os modelos!");
    }
  };

  const getYear = async (model: string | null) => {
    try {
      const response = await api.get(`/vehicle/year`, {
        params: {
          type: props.vehicleType,
          brandId: Number(selectedBrandOption?.value),
          yearId: Number(model),
        },
      });
      setYears(response.data);
      setYearDisabled(false);
    } catch (error) {
      errorToast("Ocorreu um erro ao buscar os anos!");
    }
  };

  const getVehicleInformations = async (yearCode: string | null) => {
    try {
      const response = await api.get(
        `/vehicle/model/${props.vehicleType}/${Number(
          selectedBrandOption?.value
        )}/${Number(selectedModelOption?.value)}/${yearCode}`
      );
      setVehicle(response.data);
    } catch (error) {
      errorToast("Ocorreu um erro ao buscar os modelos!");
    }
  };

  const handleChangeDownPayment = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setDownPayment(Number(value));
  };

  const handleChangeNumberInstallments = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setNumberInstallments(Number(value));
  };

  const handleChangeBrand = (option: OptionType | null) => {
    setSelectedBrandOption(option);
    setSelectedModelOption(null);
    setModelDisabled(true);
    setSelectedYearOption(null);
    setYearDisabled(true);
    if (option?.value != undefined) {
      getModel(option?.value);
    }
  };

  const handleChangeModel = (option: OptionType | null) => {
    setSelectedModelOption(option);
    setSelectedYearOption(null);
    setYearDisabled(true);
    if (option?.value != undefined) {
      getYear(option?.value);
    }
  };

  const handleChangeYear = (option: OptionType | null) => {
    setSelectedYearOption(option);
    if (option?.value != undefined) {
      getVehicleInformations(option?.value);
    }
  };

  const handleCalcButton = async (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault();

    const formattedPrice = Number(
      vehicle?.price.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
    );

    if (downPayment > formattedPrice) {
      warnToast("O valor da entrada tem que ser menor que o preço do veículo!");
    } else {
      try {
        const response = await api.get("/financing", {
          params: {
            amountFinanced: formattedPrice,
            numberInstallments: numberInstallments,
            downPayment: downPayment,
          },
        });
        setFinancingResults(response.data);
      } catch (error) {
        errorToast("Ocorreu um erro interno, tente novamente mais tarde!");
      }
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-between sm:flex-row sm:gap-0 mt-4">
      <section className="flex flex-1 justify-center flex-col gap-7">
        <form onSubmit={handleCalcButton} className="flex flex-col">
          <section className="flex gap-2 flex-col items-center">
            <Select
              onChange={(option) => handleChangeBrand(option)}
              options={brandOptions}
              placeholder={"Marca"}
              className="w-72"
              value={selectedBrandOption}
              styles={selectStyles}
              required
            />
            <Select
              onChange={(option) => handleChangeModel(option)}
              options={modelOptions}
              placeholder={"Modelo"}
              className="w-72"
              isDisabled={modelDisabled}
              value={selectedModelOption}
              styles={selectStyles}
              required
            />
            <Select
              onChange={(option) => handleChangeYear(option)}
              options={yearOptions}
              placeholder={"Ano"}
              className="w-72"
              isDisabled={yearDisabled}
              value={selectedYearOption}
              styles={selectStyles}
              required
            />
          </section>
          <section className="flex flex-1 flex-col items-center gap-2 mt-5">
            <Input
              onChange={handleChangeDownPayment}
              placeholder="Entrada"
              type="number"
              min={0}
              step={0.01}
            ></Input>
            <Input
              onChange={handleChangeNumberInstallments}
              placeholder="Quantidade de parcelas"
              type="number"
              min={1}
              max={60}
            ></Input>
            <Button text="Calcular" />
          </section>
        </form>
      </section>
      <section className="flex flex-1 justify-center">
        {vehicle ? (
          <div className="flex flex-col bg-[#dc143c] shadow-lg rounded-2xl p-6 gap-3">
            <section>
              <p className="flex text-[#f3bc26] font-bold flex-row items-center">
                Katchau! <AiFillThunderbolt color="#f3bc26" />
              </p>
              <p className="text-white font-bold">Marca: {vehicle.brand}</p>
              <p className="text-white font-bold">Modelo: {vehicle.model}</p>
              <p className="text-white font-bold">Ano: {vehicle.modelYear}</p>
              <p className="text-white font-bold">
                Tipo de combustível: {vehicle.fuel}
              </p>
              <p className="text-white font-bold">Preço: {vehicle.price}</p>
            </section>
            {financingResults ? (
              <section>
                <p className="text-white font-bold">
                  Parcela do Financiamento:{" "}
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
              </section>
            ) : (
              <p></p>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
}
