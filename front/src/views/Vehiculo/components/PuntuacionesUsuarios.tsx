import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import {
  apiPuntuacion,
  iPuntuacion,
  iPuntuacionPromedio,
} from "../../../service/Puntuacion/apiPuntuacion";
import { Box, Typography } from "@mui/material";
import { ColumnTablas, Tablas } from "../../../components/Tablas";
import { Ratings } from "../../../components/Ratings";
import { formatearFecha } from "../../../utils/utils";
import { PuntuacionesPromedio } from "../../../components/PuntuacionesPromedio";

const columns: ColumnTablas[] = [
  { id: "fecha", label: "Fecha" },
  { id: "usuario", label: "Usuario" },
  { id: "valoracion", label: "Valoración" },
  { id: "resena", label: "Reseña" },
];

interface Props {
  puntuaciones: iPuntuacion[];
  cargarPuntuaciones: () => Promise<void>;
  puntuacionesPromedio: iPuntuacionPromedio[];
  cargarPuntuacionesPromedio: () => Promise<void>;
}

export const PuntuacionesUsuarios = (props: Props) => {
  const {
    puntuaciones,
    cargarPuntuaciones,
    cargarPuntuacionesPromedio,
    puntuacionesPromedio,
  } = props;
  const { vehiculo } = useContext(VehiculoContext);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const mappedRows = puntuaciones.map((puntuacion) => ({
      fecha: formatearFecha(puntuacion.fechaPuntuacion.toString()),
      fechaOrdenar: new Date(puntuacion.fechaPuntuacion).getTime(),
      usuario:
        puntuacion.reserva.user.lastname +
        " " +
        puntuacion.reserva.user.firstname,
      valoracion: (
        <Ratings name="read-only" titulo={false} valor={puntuacion.valor} />
      ),
      resena: puntuacion.resena,
    }));

    const sortedRows = mappedRows.sort(
      (a, b) => b.fechaOrdenar - a.fechaOrdenar
    );
    setRows(sortedRows);
  }, [puntuaciones]);

  useEffect(() => {
    cargarPuntuaciones();
  }, []);

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
        <Typography variant="h4" component="h1">
          Opiniones de usuarios
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "85%",
            margin: "auto",
          }}
        >
          <PuntuacionesPromedio
            vehiculoId={vehiculo.id}
            puntuacionesPromedio={puntuacionesPromedio}
            cargarPuntuacionesPromedio={cargarPuntuacionesPromedio}
          />
        </div>

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
