import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { apiPuntuacion, iPuntuacion } from "../../../service/Puntuacion/apiPuntuacion";
import { Box, Typography } from "@mui/material";
import { ColumnTablas, Tablas } from "../../../components/Tablas";
import { Ratings } from "../../../components/Ratings";
import { formatearFecha } from '../../../utils/utils';

const columns: ColumnTablas[] = [
  { id: "fecha", label: "Fecha" },
  { id: "usuario", label: "Usuario" },
  { id: "valoracion", label: "Valoración" },
  { id: "resena", label: "Reseña" },

  
];

export const PuntuacionesUsuarios = () => {
  const { vehiculo } = useContext(VehiculoContext);
  const { getPuntuacionesByVehiculo } = apiPuntuacion();
  const [puntuaciones, setPuntuaciones] = useState<iPuntuacion[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const cargarDatos = async () => {
    const data = {
      vehiculoId: vehiculo.id,
    };
    const result = await getPuntuacionesByVehiculo(data);
    setPuntuaciones(result);
  };

    useEffect(() => {
      const mappedRows = puntuaciones.map((puntuacion) => ({
        fecha: formatearFecha(puntuacion.fechaPuntuacion.toString()),
        fechaOrdenar: new Date(puntuacion.fechaPuntuacion).getTime(), 
        usuario: puntuacion.reserva.user.lastname + " " + puntuacion.reserva.user.firstname,
        valoracion: <Ratings name="read-only" titulo={false} valor={puntuacion.valor}/>,
        resena: puntuacion.resena,
      }));
  
      const sortedRows = mappedRows.sort((a, b) => b.fechaOrdenar - a.fechaOrdenar);
      setRows(sortedRows);
    }, [puntuaciones]);

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
        <Typography variant="h4" component="h1">
          Opiniones de usuarios
        </Typography>

        <div
          style={{
            width: "85%",
            textAlign: "center",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <Tablas columns={columns} rows={rows} />
        </div>
      </Box>
    </>
  );
};
