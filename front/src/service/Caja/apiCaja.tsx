import { getApiLocal } from "../Api/apiBack";


export interface ICaja {
    id: number;
    tipo: string;
}

export const apiCaja = () => {
  const getCajas = async () => {
    const url = "caja";
    const result = await getApiLocal({ url });
    return result;
  };

  return {
    getCajas,
  };
};
