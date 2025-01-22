import { getApiLocal } from "../Api/apiBack";

export interface IDireccion {
    id: number;
    tipo: string;
    }

export const apiDireccion = () => {
  const getDireccion = async () => {
    const url = "direccion";
    const result = await getApiLocal({ url });
    return result;
  };

  return {
    getDireccion,
  };
};
