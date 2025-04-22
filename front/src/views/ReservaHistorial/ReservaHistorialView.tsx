import { useEffect, useState } from "react";
import { formatearFecha, userData } from "../../utils/utils";
import { apiReserva } from "../../service/Reserva/apiReserva";
import { ColumnTablas, Tablas } from "../../components/Tablas";
import { Box, Typography } from "@mui/material";

const columns: ColumnTablas[] = [
  { id: "fechaInicio", label: "Inicio" },
  { id: "fechaFin", label: "Fin" },
  { id: "marca", label: "Marca" },
  { id: "modelo", label: "Modelo" },
  { id: "motor", label: "Motor" },
  { id: "caja", label: "Caja" },
  { id: "categoria", label: "Categoría" },
  { id: "direccion", label: "Dirección" },
];

export const ReservaHistorialView = () => {
  const [user, setUser] = useState<any>(null);
  const { historialReservasUser } = apiReserva();
  const [reservas, setReservas] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);
  


  const getHistorialReservas = async () => {
    if (user) {
      const response = await historialReservasUser(user);
      setReservas(response);
    } else {
      console.error("No hay usuario autenticado");
    }
  };

  useEffect(() => {
    getHistorialReservas();
  }, [user]);

  useEffect(() => {
      const mappedRows = reservas.map((reserva) => {
        const [anio, mes, dia] = reserva.fechaFin.split("-").map(Number);
        const fechaFin = new Date(anio, mes - 1, dia); // Crear la fecha correctamente
       
  
        return {
          fechaInicio: formatearFecha(reserva.fechaInicio),
          fechaFin: formatearFecha(reserva.fechaFin),
          fechaOrdenar: fechaFin.getTime(),
          marca: reserva.vehiculo.marca,
          modelo: reserva.vehiculo.modelo,
          motor: reserva.vehiculo.motor,
          caja: reserva.vehiculo.caja.tipo,
          categoria: reserva.vehiculo.categoria.nombre,
          direccion: reserva.vehiculo.direccion.tipo,

         
        };
      });
  
      const sortedRows = mappedRows.sort(
        (a, b) => b.fechaOrdenar - a.fechaOrdenar
      );
      setRows(sortedRows);
    }, [reservas]);

  useEffect(() => {
    const userResponse = userData();
    if (userResponse) {
      setUser(userResponse);
    }
  }, []);

  return (
    <>
      <Box flex={1} mt={10} textAlign="center" marginTop={"10%"}>
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
