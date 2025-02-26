import { deleteApiLocal, getApiLocal, postApiLocal, putApiLocal } from "../Api/apiBack";
import { Vehiculo } from "../Vehiculo/apiVehiculo";

export interface ICaracteristca {
    id: number;
    nombre: string;
    icono: number;
    vehiculo: Vehiculo;
}

export const apiCaracteristica = () => {
    const url = "caracteristica";

    const getCaracteristicas = async () => {
        const result = await getApiLocal({ url });
        return result;
    };

    const saveCaracteristica = async (valores: ICaracteristca) => {
        const result = await postApiLocal({ url, valores });
        return result
    }

    const updateCaracteristica = async (valores: ICaracteristca) => {
        const result = await putApiLocal({ url, valores });
        return result.data
    }

    const deleteCaracteristica = async (id: number) => {
        const result = await deleteApiLocal(url, id);
        return result;
    };

    return {
        getCaracteristicas,
        updateCaracteristica,
        deleteCaracteristica,
        saveCaracteristica,
    }
}
