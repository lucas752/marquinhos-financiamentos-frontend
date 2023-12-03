import VehicleForm from "../../components/VehicleForm";

export function Car() {
  return (
    <div className="mt-10">
      <h1 className="flex text-[#f3bc26] text-4xl font-bold pb-4 justify-center">
        Simule o financiamento do seu carro dos sonhos!
      </h1>
      <VehicleForm vehicleType="CARS" />
    </div>
  );
}
