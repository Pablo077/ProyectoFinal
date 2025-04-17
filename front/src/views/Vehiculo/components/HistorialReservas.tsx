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
  { id: "usuario", label: "Usuario" },
  { id: "acciones", label: "Acciones" },
];


interface Props {
  userId: number;
}

export const HistorialReservas = (props: Props) => {
  const { userId } = props;
  const { vehiculo } = useContext(VehiculoContext);
  const { historialReserva } = apiReserva();
  const { puntuacionesByUserVehiculo } = apiPuntuacion();
  const [reservas, setReservas] = useState<any[]>([]);
  const [puntuacion, setPuntuacion] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [valueRating, setValueRating] = useState<number | null>(null);

  const cargarHistorial = async () => {
    const data = {
      vehiculoId: vehiculo.id,
      userId: userId,
    };
    const result = await historialReserva(data);
    setReservas(result);
  }

  const cargarPuntuacion = async () => {
    const data = {
      vehiculoId: vehiculo.id,
      userId: userId,
    };
    const result = await puntuacionesByUserVehiculo(data);
    setPuntuacion(result);
  }

  const buscarPuntuacion = (reservaId: number, dato: string) => {
    const puntuacionEncontrada = puntuacion.find((p) => p.reserva.id === reservaId);
    if(dato === "valor"){
      return puntuacionEncontrada ? puntuacionEncontrada.valor : null;
    }
    if(dato === "resena"){  
      return puntuacionEncontrada ? puntuacionEncontrada.resena : null;
    }
  };


  useEffect(() => {
    const mappedRows = reservas.map((reserva) => ({
      fechaInicio: formatearFecha(reserva.fechaInicio),
      fechaFin: formatearFecha(reserva.fechaFin),
      fechaOrdenar: new Date(reserva.fechaFin).getTime(), 
      valoracion: <Ratings name="read-only" titulo={false} valor={buscarPuntuacion(reserva.id, "valor")}/>,
      resena: buscarPuntuacion(reserva.id, "resena"),
      usuario: reserva.user.firstname + " " + reserva.user.lastname,
      acciones: buscarPuntuacion(reserva.id, "valor") == null && <AccionesHistorialReserva reserva={reserva} cargarPuntuacion={cargarPuntuacion} cargarHistorial={cargarHistorial}/>
    }));

    const sortedRows = mappedRows.sort((a, b) => b.fechaOrdenar - a.fechaOrdenar);
    setRows(sortedRows);
  }, [reservas, puntuacion]);

  useEffect(() => {
    cargarHistorial();
    cargarPuntuacion();
  }, [])

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"80px"}>
        <Typography variant="h4" component="h1">
          Historial de reservas
        </Typography>
      <div style={{ width:"85%", textAlign: "center", margin: "auto", marginTop: "20px" }}>
        <Tablas columns={columns} rows={rows} />
      </div>
      </Box>
    </>
  )
}
