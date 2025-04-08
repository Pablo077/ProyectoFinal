import { postApiLocal, deleteApiLocal } from "../Api/apiBack";

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
