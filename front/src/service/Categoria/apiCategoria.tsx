import { getApiLocal, postApiLocal } from "../Api/apiBack";

export interface ICategoria {
    id:number;
    nombre: string;
    user: User;
}

interface User {
    id: number,
    email: string,
}

export const apiCategoria = () =>{

    const getCategoria = async () =>{
        const url = "categoria";
        const result = await getApiLocal({url});
        return result;
    }

    const saveCategoria = async (valores: any) =>{
        const url = "categoria";
        const result = await postApiLocal({url, valores});
        return result;
    }

    return {
        getCategoria,
        saveCategoria,
    }
}