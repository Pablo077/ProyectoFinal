import { Box, Typography } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Buscador } from "../views/Home/Buscador";
import { Categorias } from "../views/Home/Categorias";
import { Recomendaciones } from "../views/Home/Recomendaciones";
import { Footer } from "../views/Home/Footer";
import { Galeria } from "../views/Home/Galeria";
import { ListaVehiculos } from "../views/Home/ListaVehiculos";

export const Home = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box flex={1} mt={10} textAlign="center">
          <Typography variant="h4" component="h1">
            Flota de vehículos en alquiler
          </Typography>
        </Box>
        <Buscador />
        <Categorias />
        <Recomendaciones />
        <Box mt={3} mb={3}>
          <Galeria />
        </Box>
        <ListaVehiculos />
      </Box>
      <Footer />
    </>
  );
};
