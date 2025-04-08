import { postApiLocal, deleteApiLocal } from "../Api/apiBack";
import { userList } from "../Users/apiUsers";
import { Vehiculo } from "../Vehiculo/apiVehiculo";

export interface IFavorito {
  id: number;
  user: userList;
  vehiculo: Vehiculo;
}

export const apiFavorito = () => {
  const tabla = "favorito";

  const saveFavoritos = async (valores: any) => {
    const url = `${tabla}`;
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const favoritoUser = async (valores: any) => {
    const url = `${tabla}/FavoritoUser`;
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const deleteFavorito = async (id: number) => {
          const url = tabla;
          const result = await deleteApiLocal(url, id);
          return result;
      };

  return {
    saveFavoritos,
    favoritoUser,
    deleteFavorito,
  };
};
