import { postApiLocal } from "../Api/apiBack";

interface Login {
  email: string;
  password: string;
}

export const apiUsers = () => {
  const login = async (valores: Login) => {
    const url = "auth/login";
    const result = await postApiLocal({ valores, url });
    return result;
  };

  return {
    login,
  };
};
