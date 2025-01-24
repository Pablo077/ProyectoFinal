import { postApiLocal } from "../Api/apiBack";

export const apiVehiculo = () => {
  const cargarVehiculo = async (valores: any) => {
    const url = "vehiculo";
    const result = await postApiLocal({ valores, url });
    return result;
  };

  return {
    cargarVehiculo,
  };
};
