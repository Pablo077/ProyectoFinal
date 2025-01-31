import { useState } from "react";
import { VehiculoContext } from "./VehiculoContext";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";

export const VehiculoProvider = ({ children }: any) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculo, setVehiculo] = useState<Vehiculo>({} as Vehiculo);

  return (
    <VehiculoContext.Provider value={{ vehiculos, setVehiculos, vehiculo, setVehiculo }}>
      {children}
    </VehiculoContext.Provider>
  );
};