import React from "react";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";

interface VehiculoContextType {
  vehiculos: Vehiculo[];
  setVehiculos: (vehiculos: Vehiculo[]) => void;
  vehiculo: Vehiculo;
  setVehiculo: (vehiculo: Vehiculo) => void;
  vehiculosDisponibles: Vehiculo[];
  setVehiculosDisponibles: React.Dispatch<React.SetStateAction<Vehiculo[]>>;
  cargarVehiculos: () => Promise<void>;
  openSnack: boolean;
  setOpenSnack : React.Dispatch<React.SetStateAction<boolean>>;
  alertSnack: "success" | "error" | "info" | "warning";
  setAlertSnack: React.Dispatch<React.SetStateAction<"success" | "error" | "info" | "warning">>;
  mensajeSnack: string;
  setMensajeSnack: React.Dispatch<React.SetStateAction<string>>;
}

// Crear el contexto con el tipo VehiculoContextType
export const VehiculoContext = React.createContext<VehiculoContextType>({} as VehiculoContextType);