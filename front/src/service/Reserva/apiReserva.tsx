import { getApiLocal, postApiLocal } from "../Api/apiBack";

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
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const getReservas = async () => {
    const url = `${tabla}/`;
    const result = await getApiLocal({ url });
    return result;
  };

  const reservaByVehiculo = async (valores: any) => {
    const url = `${tabla}/reservaByVehiculo`;
    const result = await postApiLocal({ url, valores });
    return result;
  };

  return {
    disponibilidad,
    getReservas,
    reservaByVehiculo,
  };
};
