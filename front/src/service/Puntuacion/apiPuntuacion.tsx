import { getApiLocal, postApiLocal } from "../Api/apiBack";


export const apiPuntuacion = () => {
  const tabla = "puntuacion";

  const puntuacionesByUserVehiculo = async (valores: any) => {
    const url = `${tabla}/PuntuacionesByUserVehiculo`;
    const result = await postApiLocal({ url, valores });
    return result;
  }

  const guardarPuntuacion = async (valores: any) => {
    const url = `${tabla}`;
    const result = await postApiLocal({ url, valores });
    return result;
  }

  const getPuntuacionesPromedio = async () => {
    const url = `${tabla}//PuntuacionesPromedio`;
    const result = await getApiLocal({ url });
    return result;
  }


  return { puntuacionesByUserVehiculo, guardarPuntuacion, getPuntuacionesPromedio }
}
