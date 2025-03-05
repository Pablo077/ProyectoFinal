import { deleteApiLocal, getApiLocal, postApiLocal, putApiLocal } from "../Api/apiBack";
import { Vehiculo } from "../Vehiculo/apiVehiculo";

export interface ICaracteristca {
    id: number;
    nombre: string;
    icono: number;
    vehiculo: Vehiculo;
}

export const apiCaracteristica = () => {
    let url = "caracteristica";

    const getCaracteristicas = async () => {
        const result = await getApiLocal({ url });
        return result;
    };

    const saveCaracteristica = async (valores: any) => {
        url = "caracteristica";
        const result = await postApiLocal({ url, valores });
        return result
    }

    const updateCaracteristica = async (valores: any) => {
        const result = await putApiLocal({ url, valores });
        return result.data
    }

    const deleteCaracteristica = async (id: number) => {
        const result = await deleteApiLocal(url, id);
        return result;
    };

    const getCaracteristicasVehiculo = async (valores:Vehiculo) => {
        url = "caracteristica/caracteristicaVehiculo"
        const result = await postApiLocal({ url, valores });
        return result;
    };

    return {
        getCaracteristicas,
        updateCaracteristica,
        deleteCaracteristica,
        saveCaracteristica,
        getCaracteristicasVehiculo
    }
}
