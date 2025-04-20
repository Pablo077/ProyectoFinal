import { deleteApiLocal, getApiLocal, postApiLocal } from "../Api/apiBack";

export interface ICategoria {
  id: number;
  nombre: string;
  user: User;
}

interface User {
  id: number;
  email: string;
}

export const apiCategoria = () => {
  const tabla = "categoria";

  const getCategoria = async () => {
    const url = `${tabla}`;
    const result = await getApiLocal({ url });
    return result;
  };

  const saveCategoria = async (valores: any) => {
    const url = `${tabla}`;
    const result = await postApiLocal({ url, valores });
    return result;
  };

  const deleteVehiculo = async (id: number) => {
    const url = `${tabla}`;
    const result = await deleteApiLocal(url, id);
    return result;
  };

  return {
    getCategoria,
    saveCategoria,
    deleteVehiculo,
  };
};
