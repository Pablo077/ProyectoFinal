import { postApiLocal, getApiLocal, deleteApiLocal } from "../Api/apiBack";

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  motor: number;
  pasajeros: number;
  valijasGrandes: number;
  valijasChicas: number;
  caja: Caja;
  direccion: Direccion;
  mainImage: string;
  filesName: string;
}

export interface Caja {
  id: number;
  tipo: string;
}

export interface Direccion {
  id: number;
  tipo: string;
}

export const apiVehiculo = () => {
  let url = "vehiculo";
  
  const cargarVehiculo = async (valores: any) => {
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const getVehiculos = async () => {
    url = "vehiculo/getVehiculos";
    const result = await getApiLocal({ url });
    return result;
  };

  const deleteVehiculo = async (id: number) => {
    url = "vehiculo";
    const result = await deleteApiLocal(url, id);
    return result;
  };
  return {
    cargarVehiculo,
    getVehiculos,
    deleteVehiculo,
  };
};
