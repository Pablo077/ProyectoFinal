import { useState } from "react";
import { VehiculoContext } from "./VehiculoContext";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";
import { apiVehiculo } from "../service/Vehiculo/apiVehiculo";

export const VehiculoProvider = ({ children }: any) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculo, setVehiculo] = useState<Vehiculo>({} as Vehiculo);
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState<Vehiculo[]>([]);
  const { getVehiculos } = apiVehiculo();

  const [openSnack, setOpenSnack] = useState(false);
  const [alertSnack, setAlertSnack] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [mensajeSnack, setMensajeSnack] = useState("");

  const cargarVehiculos = async () => {
    const result = await getVehiculos();
    setVehiculos(result);
  };

  return (
    <VehiculoContext.Provider
      value={{
        vehiculos,
        setVehiculos,
        vehiculo,
        setVehiculo,
        vehiculosDisponibles,
        setVehiculosDisponibles,
        cargarVehiculos,
        alertSnack,
        mensajeSnack,
        openSnack,
        setMensajeSnack,
        setOpenSnack,
        setAlertSnack,
      }}
    >
      {children}
    </VehiculoContext.Provider>
  );
};
