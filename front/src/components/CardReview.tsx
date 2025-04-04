import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { colores } from "../styles/colors";
import { CajaDireccion } from "./CajaDireccion";
import { Vehiculo } from "../service/Vehiculo/apiVehiculo";
import {
  mdiAccountMultiple,
  mdiBagSuitcase,
  mdiBagChecked,
  mdiCarShiftPattern,
  mdiSteering,
} from "@mdi/js";
import { Box } from "@mui/material";

interface Props {
  vehiculo: Vehiculo;
  image: string;
  handleClick: (vehiculo: Vehiculo) => void;
  actions: boolean;
  cargarFavorito: ({
    vehiculo,
    user,
  }: {
    vehiculo: Vehiculo;
    user: any;
  }) => Promise<void>;
  user: any;
}

export const CardReview = (props: Props) => {
  const { vehiculo, image, handleClick, actions, cargarFavorito, user } = props;

  return (
    <Card sx={{ backgroundColor: colores.CornflowerBlue }}>
      <span onClick={() => handleClick(vehiculo)}>
        <Box sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ backgroundColor: colores.PennBlue }}
                aria-label="recipe"
              >
                {vehiculo.marca[0].toUpperCase()}
              </Avatar>
            }
            //   action={
            //     <IconButton aria-label="settings">
            //       <MoreVertIcon />
            //     </IconButton>
            //   }
            title={vehiculo.marca}
            subheader={vehiculo.modelo}
            sx={{ padding: "9px" }}
          />
          <CardMedia
            component="img"
            height="160"
            image={image}
            alt={vehiculo.marca + " " + vehiculo.modelo}
          />
          <CardContent sx={{ padding: "9px 9px 9px 9px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px",
                padding: "0px",
              }}
            >
              <CajaDireccion
                texto={`${vehiculo.pasajeros.toString()} Personas`}
                path={mdiAccountMultiple}
                size={1}
              />
              <CajaDireccion
                texto={`${vehiculo.valijasGrandes.toString()} Grandes`}
                path={mdiBagSuitcase}
                size={1}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px",
                padding: "0px",
              }}
            >
              <CajaDireccion
                texto={`${vehiculo.valijasChicas.toString()} Chicas`}
                path={mdiBagChecked}
                size={1}
              />
              <CajaDireccion
                texto={vehiculo.caja.tipo}
                path={mdiCarShiftPattern}
                size={1}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0px",
                padding: "0px",
              }}
            >
              <CajaDireccion
                texto={vehiculo.direccion.tipo}
                path={mdiSteering}
                size={1}
              />
            </div>
          </CardContent>
        </Box>
      </span>
      {actions && (
        <CardActions disableSpacing sx={{ padding: "0px" }}>
          <IconButton aria-label="add to favorites" onClick={() => cargarFavorito({ vehiculo, user })}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
