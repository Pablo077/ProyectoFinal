import { useState, useEffect, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import isBetween from "dayjs/plugin/isBetween";
import { styled, Typography, Box, Divider } from "@mui/material";
import { apiReserva } from "../../../service/Reserva/apiReserva";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { colores } from "../../../styles/colors";
import { useLocation } from "react-router-dom";

dayjs.extend(isBetween);
dayjs.locale("es");

const CustomDateCalendar = styled(DateCalendar)({
  backgroundColor: colores.PennBlue,
  color: colores.AntiFlashWhite,
  borderRadius: "8px",
  border: "solid 1px",
  padding: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Opcional, para un efecto más elegante
  "& .MuiPickersDay-root": {
    color: colores.AntiFlashWhite,
    "&.Mui-selected": {
      backgroundColor: colores.CornflowerBlue,
    },
    "&.Mui-disabled": {
      color: colores.CornflowerBlue,
    },
    "&.MuiPickersDay-today": {
      borderColor: colores.AntiFlashWhite, // Cambiar el color del borde del círculo que marca la fecha de hoy
      borderWidth: "2px",
      borderStyle: "solid",
    },
  },
  "& .MuiTypography-root": {
    color: colores.AntiFlashWhite, // Cambiar el color de las letras de los días
  },
  "& .MuiSvgIcon-root": {
    color: colores.AntiFlashWhite, // Cambiar el color de las letras de los días
  },
});
interface Props {
  fechaInicio: dayjs.Dayjs | null;
  setFechaInicio: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  fechaFin: dayjs.Dayjs | null;
  setFechaFin: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}

export const Reservas = (props:Props) => {
  const { fechaInicio, setFechaInicio, fechaFin, setFechaFin } = props;
  const { reservaByVehiculo } = apiReserva();
  const [reservas, setReservas] = useState<{ start: Dayjs; end: Dayjs }[]>([]);
  const [error, setError] = useState(false);
  const { vehiculo } = useContext(VehiculoContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const CargarDatos = async () => {
    if (vehiculo) {
      try {
        const response = await reservaByVehiculo(vehiculo); 
        const reservasApi = response.map(
          (reserva: { fechaInicio: string; fechaFin: string }) => ({
            start: dayjs(reserva.fechaInicio),
            end: dayjs(reserva.fechaFin),
          })
        );
        setReservas(reservasApi);
      } catch (error) {
        console.error("Error cargando reservas:", error);
        setError(true);
      }
    }
  };
  

  const cargarFechasBusqueda = () => {
    // const storedDateInicio = localStorage.getItem("dateInicio");
    // const storedDateFinal = localStorage.getItem("dateFinal");

    const storedDateInicio = queryParams.get("fechaInicio");
    const storedDateFinal = queryParams.get("fechaFin");
    
    
    if (storedDateInicio) {
      setFechaInicio(dayjs(storedDateInicio));
    }
    if (storedDateFinal) {
      setFechaFin(dayjs(storedDateFinal));
    }
  }	

  // Función para deshabilitar fechas reservadas
  const shouldDisableDate = (date: Dayjs) => {
    return reservas.some(
      (reserva) =>
        date.isBetween(reserva.start, reserva.end, "day", "[]") || // Deshabilitar fechas entre la fecha de inicio y fin
        date.isSame(reserva.start, "day") || // Deshabilitar la fecha de inicio
        date.isSame(reserva.end, "day") // Deshabilitar la fecha de fin
    );
  };

  useEffect(() => {
    CargarDatos();
    cargarFechasBusqueda();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Divider sx={{ borderColor: colores.AntiFlashWhite, margin: "10px" }} />
      <Typography component="h4" variant="h4" marginLeft={"10px"}>
        Reservas
      </Typography>
      {error ? (
        <Typography component="h5" variant="h5" marginLeft={"10px"} align="center" color={colores.Jasper}>
          Error en la carga de reservas, por favor intenta más tarde
        </Typography>
      ) : (
        <Box display="flex" justifyContent="center" gap={4} p={2}>
          {/* Calendario para la Fecha de Inicio */}
          <Box textAlign="center">
            <CustomDateCalendar
              value={fechaInicio}
              onChange={(newDate) => setFechaInicio(newDate)}
              shouldDisableDate={shouldDisableDate}
            />
          </Box>

          {/* Calendario para la Fecha de Fin */}
          <Box textAlign="center">
            <CustomDateCalendar
              value={fechaFin}
              onChange={(newDate) => setFechaFin(newDate)}
              shouldDisableDate={shouldDisableDate}
            />
          </Box>
        </Box>
      )}
    </LocalizationProvider>
  );
};
