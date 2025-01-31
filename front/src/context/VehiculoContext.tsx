import React from "react";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";

interface VehiculoContextType {
  vehiculos: Vehiculo[];
  setVehiculos: (vehiculos: Vehiculo[]) => void;
  vehiculo: Vehiculo;
  setVehiculo: (vehiculo: Vehiculo) => void;
}

// Crear el contexto con el tipo VehiculoContextType
export const VehiculoContext = React.createContext<VehiculoContextType>({} as VehiculoContextType);