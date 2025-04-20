import { useContext, useEffect, useState } from "react";
import { Caracteristicas } from "./components/Caracteristicas";
import { FotosDetalles } from "./components/FotosDetalles";
import { getCookie } from "../../utils/utils";
import { Reservas } from "./components/Reservas";
import { PoliticasUso } from "./components/PoliticasUso";
import { HistorialReservas } from "./components/HistorialReservas";
import { PuntuacionesUsuarios } from "./components/PuntuacionesUsuarios";
import {
  apiPuntuacion,
  iPuntuacion,
  iPuntuacionPromedio,
} from "../../service/Puntuacion/apiPuntuacion";
import { VehiculoContext } from "../../context/VehiculoContext";

export const VehiculoView = () => {
  const { vehiculo } = useContext(VehiculoContext);
  const [apiData, setApiData] = useState<any>(null);
  const { getPuntuacionesByVehiculo, getPuntuacionesPromedio } =
    apiPuntuacion();
  const [puntuaciones, setPuntuaciones] = useState<iPuntuacion[]>([]);
  const [puntuacionesPromedio, setPuntuacionesPromedio] = useState<
    iPuntuacionPromedio[]
  >([]);

  const cargarPuntuaciones = async () => {
    const result = await getPuntuacionesByVehiculo(vehiculo.id.toString());
    setPuntuaciones(result);
  };

  const cargarPuntuacionesPromedio = async () => {
    const result = await getPuntuacionesPromedio();
    setPuntuacionesPromedio(result);
  };

  useEffect(() => {
    const cookieData = getCookie("user");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      setApiData(parsedData);
    }
  }, []);

  return (
    <div>
      <FotosDetalles />
      {apiData && <Reservas />}
      {apiData && (
        <HistorialReservas
          userId={apiData.id}
          cargarPuntuaciones={cargarPuntuaciones}
          cargarPuntuacionesPromedio={cargarPuntuacionesPromedio}
        />
      )}
      {apiData && (
        <PuntuacionesUsuarios
          puntuaciones={puntuaciones}
          cargarPuntuaciones={cargarPuntuaciones}
          puntuacionesPromedio={puntuacionesPromedio}
          cargarPuntuacionesPromedio={cargarPuntuacionesPromedio}
        />
      )}
      <Caracteristicas />
      <PoliticasUso />
    </div>
  );
};
