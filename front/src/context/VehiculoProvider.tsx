import { useState } from "react";
import { VehiculoContext } from "./VehiculoContext";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";
import { apiVehiculo } from "../service/Vehiculo/apiVehiculo";

export const VehiculoProvider = ({ children }: any) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculo, setVehiculo] = useState<Vehiculo>({} as Vehiculo);
  const { getVehiculos } = apiVehiculo();

  const cargarVehiculos = async () => {
    const result = await getVehiculos();
    setVehiculos(result);
  };


  return (
    <VehiculoContext.Provider value={{ vehiculos, setVehiculos, vehiculo, setVehiculo, cargarVehiculos }}>
      {children}
    </VehiculoContext.Provider>
  );
};