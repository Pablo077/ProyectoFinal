import { deleteApiLocal, getApiLocal, postApiLocal, putApiLocal } from "../Api/apiBack";
import { Vehiculo } from "../Vehiculo/apiVehiculo";

export interface ICaracteristca {
    id: number;
    nombre: string;
    icono: number;
    vehiculo: Vehiculo;
}

export const apiCaracteristica = () => {
    const tabla = "caracteristica";

    const getCaracteristicas = async () => {
        const url = tabla;
        const result = await getApiLocal({ url });
        return result;
    };

    const saveCaracteristica = async (valores: any) => {
        const url = tabla;
        const result = await postApiLocal({ url, valores });
        return result
    }

    const updateCaracteristica = async (valores: any) => {
        const url = tabla;
        const result = await putApiLocal({ url, valores });
        return result.data
    }

    const deleteCaracteristica = async (id: number) => {
        const url = tabla;
        const result = await deleteApiLocal(url, id);
        return result;
    };

    const getCaracteristicasVehiculo = async (valores:Vehiculo) => {
        const url = `${tabla}/caracteristicaVehiculo`;
        // url = "caracteristica/caracteristicaVehiculo"
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
