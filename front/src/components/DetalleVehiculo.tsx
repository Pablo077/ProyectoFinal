import { Box, Typography } from "@mui/material";
import { colores } from "../styles/colors";


interface Props {
    titulo: string;
    detalle: string | number;
}

export const DetalleVehiculo = ({titulo, detalle}:Props) => {
  return (
    <Box display="flex" alignItems="center">
    <Typography variant="h6" component="h4" sx={{color:colores.CornflowerBlue}}>
      {titulo}
    </Typography>
    <Typography variant="body1" component="h4" sx={{ marginLeft: "5px", marginTop:"3px", color:colores.AntiFlashWhite }}>
      {detalle}
    </Typography>
  </Box>
  )
}
