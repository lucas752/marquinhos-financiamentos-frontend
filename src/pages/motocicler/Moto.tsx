import { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AiFillThunderbolt } from "react-icons/ai";
import { api } from "../../services/api";
import { Vehicle } from "../../interfaces/vehicle";
import { Financing } from "../../interfaces/financing";
import { FipeInformation } from "../../interfaces/fipeInformation";
import { toast } from "react-toastify";

type OptionType = {
  value: string;
  label: string;
};

export function Moto() {
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
  const vehicleType = "MOTORCYCLES";

  useEffect(() => {
    const brands = async () => {
      try {
        const response = await api.get("/vehicle", {
          params: {
            type: vehicleType,
          },
        });
        setBrands(response.data);
      } catch (error) {
        toast.error("Ocorreu um erro ao buscar as marcas!", {
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
    };
    brands();
  }, []);

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
          type: vehicleType,
          brandId: Number(model),
        },
      });
      setModels(response.data);
      setModelDisabled(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os modelos!", {
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
  };

  const getYear = async (model: string | null) => {
    try {
      const response = await api.get(`/vehicle/year`, {
        params: {
          type: vehicleType,
          brandId: Number(selectedBrandOption?.value),
          yearId: Number(model),
        },
      });
      setYears(response.data);
      setYearDisabled(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os anos!", {
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
  };

  const getVehicleInformations = async (yearCode: string | null) => {
    try {
      const response = await api.get(
        `/vehicle/model/${vehicleType}/${Number(
          selectedBrandOption?.value
        )}/${Number(selectedModelOption?.value)}/${yearCode}`
      );
      setVehicle(response.data);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os modelos!", {
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
      vehicle?.price.replace("R$ ", "").replace(".", "").replace(",", ".")
    );

    if (downPayment > formattedPrice) {
      toast.warn(
        "O valor da entrada tem que ser menor que o preço do veículo!",
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
            amountFinanced: Number(
              vehicle?.price
                .replace("R$ ", "")
                .replace(".", "")
                .replace(",", ".")
            ),
            numberInstallments: numberInstallments,
            downPayment: downPayment,
          },
        });
        setFinancingResults(response.data);
      } catch (error) {
        toast.error("Ocorreu um erro interno, tente novamente mais tarde!", {
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
    <div className="mt-10">
      <h1 className="flex text-[#f3bc26] text-4xl font-bold pb-4 justify-center">
        Simule o financiamento da sua moto dos sonhos!
      </h1>
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
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? "red" : "#c9c9c9",
                    borderWidth: "2px",
                    borderRadius: "1.5rem",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: state.menuIsOpen ? "red" : "#c9c9c9",
                    },
                  }),
                }}
                required
              />
              <Select
                onChange={(option) => handleChangeModel(option)}
                options={modelOptions}
                placeholder={"Modelo"}
                className="w-72"
                isDisabled={modelDisabled}
                value={selectedModelOption}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? "red" : "#c9c9c9",
                    borderWidth: "2px",
                    borderRadius: "1.5rem",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: state.menuIsOpen ? "red" : "#c9c9c9",
                    },
                  }),
                }}
                required
              />
              <Select
                onChange={(option) => handleChangeYear(option)}
                options={yearOptions}
                placeholder={"Ano"}
                className="w-72"
                isDisabled={yearDisabled}
                value={selectedYearOption}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? "red" : "#c9c9c9",
                    borderWidth: "2px",
                    borderRadius: "1.5rem",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: state.menuIsOpen ? "red" : "#c9c9c9",
                    },
                  }),
                }}
                required
              />
            </section>
            <section className="flex flex-1 flex-col items-center gap-2 mt-5">
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
                    {financingResults.installmentsValue.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
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
    </div>
  );
}
