import { postApiLocal } from "../Api/apiBack";

interface Login {
  email: string;
  password: string;
}

interface Register extends Login{
  nombre: string;
  apellido: string;
}

export const apiUsers = () => {
  const login = async (valores: Login) => {
    const url = "auth/login";
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const register = async (valores: Register) =>{
    const url = "auth/register";
    const result = await postApiLocal({ valores, url });
    return result;
  }

  return {
    login,
    register,
  };
};
