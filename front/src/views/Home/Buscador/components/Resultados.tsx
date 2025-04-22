import { SxProps, Theme, Grid2, Typography, Button } from "@mui/material";
import { Cards } from "../../../../components/Cards";
import { Vehiculo } from "../../../../service/Vehiculo/apiVehiculo";
import { colores } from "../../../../styles/colors";
import { linkFotosArchivos } from "../../../../utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PuntuacionesPromedio } from "../../../../components/PuntuacionesPromedio";
import {
  apiPuntuacion,
  iPuntuacionPromedio,
} from "../../../../service/Puntuacion/apiPuntuacion";

interface Props {
  vehiculos: Vehiculo[];
  fechaInicio: String;
  fechaFin: String;
}

const sxCard: SxProps<Theme> = {
  backgroundColor: colores.CornflowerBlue,
  margin: "8px",
};

const sxCardMedia: SxProps<Theme> = {
  height: 160,
};

export const Resultados = (props: Props) => {
  const { vehiculos, fechaInicio, fechaFin } = props;
  const { getPuntuacionesPromedio } = apiPuntuacion();
  const [puntuacionesPromedio, setPuntuacionesPromedio] = useState<
    iPuntuacionPromedio[]
  >([]);
  const navigate = useNavigate();

  const cargarPuntuacionesPromedio = async () => {
    const result = await getPuntuacionesPromedio();
    setPuntuacionesPromedio(result);
  };

  const handleClick = (vehiculo: Vehiculo) => {
    const url = `/Vehiculo/?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&vehiculoId=${vehiculo.id}`;
    navigate(url);
  };

  return (
    <Grid2 container columns={10}>
      {vehiculos.map((vehiculo) => (
        <Grid2 size={{ xs: 2, md: 2 }} key={vehiculo.id}>
          <Cards
            actions={true}
            sxCard={sxCard}
            cardMedia={true}
            cardContent={true}
            image={linkFotosArchivos(
              vehiculo.marca,
              vehiculo.modelo,
              vehiculo.mainImage
            )}
            tituloImagen={vehiculo.modelo}
            sxCardMedia={sxCardMedia}
            sxBox={{ minWidth: 275 }}
            children2={
              <Button size="small" onClick={() => handleClick(vehiculo)}>
                Ver más
              </Button>
            }
          >
            <PuntuacionesPromedio
              vehiculoId={vehiculo.id}
              puntuacionesPromedio={puntuacionesPromedio}
              cargarPuntuacionesPromedio={cargarPuntuacionesPromedio}
            />
            <Typography component="div" variant="h5">
              {vehiculo.marca}
            </Typography>
            <Typography variant="body2" minHeight={40}>
              {vehiculo.modelo} con capacidad para {vehiculo.pasajeros}{" "}
              pasajeros
            </Typography>
          </Cards>
        </Grid2>
      ))}
    </Grid2>
  );
};
