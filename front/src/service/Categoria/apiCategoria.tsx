import { getApiLocal } from "../Api/apiBack";

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

    return {
        getCategoria,
    }
}