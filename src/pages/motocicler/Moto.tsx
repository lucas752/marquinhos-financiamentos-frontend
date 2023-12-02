import VehicleForm from "../../components/VehicleForm";

export function Moto() {
  return (
    <div className="mt-10">
      <h1 className="flex text-[#f3bc26] text-4xl font-bold pb-4 justify-center">
        Simule o financiamento da sua moto dos sonhos!
      </h1>
      <VehicleForm vehicleType="MOTORCYCLES" />
    </div>
  );
}
