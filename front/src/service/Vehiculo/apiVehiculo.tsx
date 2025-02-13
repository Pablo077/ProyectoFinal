import { postApiLocal, getApiLocal, deleteApiLocal, putApiLocal } from "../Api/apiBack";

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
  categoria: Categoria;
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

export interface Categoria {
  id: number;
  nombre: string;
}

export const apiVehiculo = () => {
  let url = "vehiculo";
  
  const cargarVehiculo = async (valores: any) => {
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const deleteVehiculo = async (id: number) => {
    const result = await deleteApiLocal(url, id);
    return result;
  };

  const putVehiculo = async (valores: any) =>{
    const result = await putApiLocal({valores, url});
    return result.data;
  }

  const getVehiculos = async () => {
    url = "vehiculo/getVehiculos";
    const result = await getApiLocal({ url });
    return result;
  };

  return {
    cargarVehiculo,
    getVehiculos,
    deleteVehiculo,
    putVehiculo,
  };
};
