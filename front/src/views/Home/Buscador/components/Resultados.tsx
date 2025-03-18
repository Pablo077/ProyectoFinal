import { SxProps, Theme, Grid2, Typography } from "@mui/material";
import { Cards } from "../../../../components/Cards";
import { Vehiculo } from "../../../../service/Vehiculo/apiVehiculo";
import { colores } from "../../../../styles/colors";
import { linkFotosArchivos } from "../../../../utils/utils";

interface Props {
  vehiculos: Vehiculo[];
}

const sxCard: SxProps<Theme> = {
  backgroundColor: colores.CornflowerBlue,
  margin: "8px",
};

const sxCardMedia: SxProps<Theme> = {
  height: 160,
};

export const Resultados = (props: Props) => {
  const { vehiculos } = props;

  return (
    <Grid2 container columns={10}>
      {vehiculos.map((vehiculo) => (
        <Grid2 size={{ xs: 2, md: 2 }} key={vehiculo.id}>
          <Cards
            actions={true}
            sxCard={sxCard}
            cardMedia={true}
            image={linkFotosArchivos(
              vehiculo.marca,
              vehiculo.modelo,
              vehiculo.mainImage
            )}
            tituloImagen={vehiculo.modelo}
            sxCardMedia={sxCardMedia}
            onClickButton={() => console.log("Click en botón")}
            tituloButton="Ver más"
          >
            <Typography component="div" variant="h5">{vehiculo.marca}</Typography>
            <Typography variant="body2">
              {vehiculo.modelo} con capacidad para {vehiculo.pasajeros} pasajeros
            </Typography>
            
            
          </Cards>
        </Grid2>
      ))}
    </Grid2>
  );
};
