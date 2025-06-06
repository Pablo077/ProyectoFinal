import { getApiLocal, postApiLocal } from "../Api/apiBack";
import { IReserva } from "../Reserva/apiReserva";

export interface iPuntuacion {
  id: number;
  reserva: IReserva;
  valor: number;
  fechaPuntuacion: Date;
  resena: string;
}

export interface iPuntuacionPromedio {
  vehiculoId: number;
  promedio: number;
  cantidad: number;
}



export const apiPuntuacion = () => {
  const tabla = "puntuacion";

  const puntuacionesByUserVehiculo = async (userId:string, vehiculoId: string ) => {
    const url = `${tabla}/PuntuacionesByUserVehiculo/${userId}/${vehiculoId}`;
    const result = await getApiLocal({ url });
    return result;
  };

  const guardarPuntuacion = async (valores: any) => {
    const url = `${tabla}`;
    const result = await postApiLocal({ url, valores });
    return result;
  };

  const getPuntuacionesPromedio = async () => {
    const url = `${tabla}/PuntuacionesPromedio`;
    const result = await getApiLocal({ url });
    return result;
  };

  const getPuntuacionesByVehiculo = async (vehiculoId: string) => {
    const url = `${tabla}/PuntuacionesByVehiculo/${vehiculoId}`;
    const result = await getApiLocal({ url });
    return result;
  };

  return {
    puntuacionesByUserVehiculo,
    guardarPuntuacion,
    getPuntuacionesPromedio,
    getPuntuacionesByVehiculo,
  };
};
