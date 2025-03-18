import { postApiLocal } from "../Api/apiBack";
import { Vehiculo } from "../Vehiculo/apiVehiculo";

export interface IReserva {
  marca: string | null;
  modelo: string | null;
  pasajeros: number | null;
  dateInicio: Date | null;
  dateFinal: Date | null;
}

export const apiReserva = () => {
  const tabla = "reserva";

  const disponibilidad = async (valores: any) => {
    const url = `${tabla}/disponibilidad`;
    const result = await postApiLocal<Vehiculo[]>({ valores, url });
    return result;
  };

  return {
    disponibilidad,
  };
};
