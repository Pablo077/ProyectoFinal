import { postApiLocal } from "../Api/apiBack";

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

  return {
    saveFavoritos,
    favoritoUser,
  };
};
