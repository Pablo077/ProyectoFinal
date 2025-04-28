import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { apiReserva } from "../../../service/Reserva/apiReserva";
import { apiPuntuacion } from "../../../service/Puntuacion/apiPuntuacion";
import { ColumnTablas, Tablas } from "../../../components/Tablas";
import { Box, Typography } from "@mui/material";
import { Ratings } from "../../../components/Ratings";
import { AccionesHistorialReserva } from "./AccionesHistorialReserva/AccionesHistorialReserva";
import { formatearFecha } from "../../../utils/utils";

const columns: ColumnTablas[] = [
  { id: "fechaInicio", label: "Inicio" },
  { id: "fechaFin", label: "Fin" },
  { id: "valoracion", label: "Valoración" },
  { id: "resena", label: "Reseña" },
  { id: "acciones", label: "Acciones" },
];

interface Props {
  userId: number;
  cargarPuntuaciones: () => Promise<void>;
  cargarPuntuacionesPromedio: () => Promise<void>;
}

export const HistorialReservas = (props: Props) => {
  const { userId, cargarPuntuaciones, cargarPuntuacionesPromedio } = props;
  const hoy = new Date();
  const { vehiculo } = useContext(VehiculoContext);
  const { historialReserva } = apiReserva();
  const { puntuacionesByUserVehiculo } = apiPuntuacion();
  const [reservas, setReservas] = useState<any[]>([]);
  const [puntuacion, setPuntuacion] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const cargarHistorial = async () => {
    const result = await historialReserva(userId.toString(), vehiculo.id.toString());
    setReservas(result);
  };

  const cargarPuntuacion = async () => {
    const result = await puntuacionesByUserVehiculo(userId.toString(), vehiculo.id.toString());
    setPuntuacion(result);
  };

  const buscarPuntuacion = (reservaId: number, dato: string) => {
    const puntuacionEncontrada = puntuacion.find(
      (p) => p.reserva.id === reservaId
    );
    if (dato === "valor") {
      return puntuacionEncontrada ? puntuacionEncontrada.valor : null;
    }
    if (dato === "resena") {
      return puntuacionEncontrada ? puntuacionEncontrada.resena : null;
    }
  };

  useEffect(() => {
    const mappedRows = reservas.map((reserva) => {
      const [anio, mes, dia] = reserva.fechaFin.split("-").map(Number);
      const fechaFin = new Date(anio, mes - 1, dia); // Crear la fecha correctamente
     

      return {
        fechaInicio: formatearFecha(reserva.fechaInicio),
        fechaFin: formatearFecha(reserva.fechaFin),
        fechaOrdenar: fechaFin.getTime(),
        valoracion: buscarPuntuacion(reserva.id, "valor") != null && (
            <Ratings
              name="read-only"
              titulo={false}
              valor={buscarPuntuacion(reserva.id, "valor")}
            />
          ),
        resena: buscarPuntuacion(reserva.id, "resena"),
        acciones: buscarPuntuacion(reserva.id, "valor") == null &&
          hoy >= fechaFin && (
            <AccionesHistorialReserva
              reserva={reserva}
              cargaDatos={cargaDatos}
            />
          ),
      };
    });

    const sortedRows = mappedRows.sort(
      (a, b) => b.fechaOrdenar - a.fechaOrdenar
    );
    setRows(sortedRows);
  }, [reservas, puntuacion]);

  const cargaDatos = async () => {
    cargarHistorial();
    cargarPuntuacion();
    cargarPuntuaciones();
    cargarPuntuacionesPromedio();
  }

  useEffect(() => {
    cargaDatos();
  }, []);

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
        <Typography variant="h4" component="h1">
          Historial de reservas
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
