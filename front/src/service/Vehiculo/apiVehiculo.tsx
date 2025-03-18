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
  const tabla = "vehiculo";
  
  const cargarVehiculo = async (valores: any) => {
    const url = tabla;
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const deleteVehiculo = async (id: number) => {
    const url = tabla;
    const result = await deleteApiLocal(url, id);
    return result;
  };

  const putVehiculo = async (valores: any) =>{
    const url = tabla;
    const result = await putApiLocal({valores, url});
    return result.data;
  }

  const getVehiculos = async () => {
    // url = "vehiculo/getVehiculos";
    const url = `${tabla}/getVehiculos`;
    const result = await getApiLocal({ url });
    return result;
  };

  const getMarcas = async () => {
    const url = `${tabla}/getMarcas`;
    const result = await getApiLocal({ url });
    return result;
  }

  const getModelos = async (marca: string) => {
    const url = `${tabla}/getModelos/${marca}`;
    const result = await getApiLocal({ url });
    return result;
  }

  return {
    cargarVehiculo,
    getVehiculos,
    deleteVehiculo,
    putVehiculo,
    getMarcas,
    getModelos,
  };
};
