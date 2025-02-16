import { getApiLocal, postApiLocal, putApiLocal } from "../Api/apiBack";

interface Login {
  email: string;
  password: string;
}

interface Register extends Login{
  firstname: string;
  lastname: string;
}

export interface userList extends Register {
  id: number;
  rol: string;
}

export const apiUsers = () => {
  const login = async (valores: Login) => {
    const url = "auth/user/login";
    const result = await postApiLocal({ valores, url });
    return result;
  };

  const register = async (valores: Register) =>{
    const url = "auth/user/register";
    const result = await postApiLocal({ valores, url });
    return result;
  }

  const getUsers = async () =>{
    const url = "auth/listUsers";
    const result = await getApiLocal({url});
    return result
  }

  const updateUser = async (valores: userList) =>{
    const url = "auth/updateUser";
    const result = await putApiLocal({url, valores});
    return result.data
  }

  return {
    login,
    register,
    getUsers,
    updateUser,
  };
};
