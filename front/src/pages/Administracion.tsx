import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Buscador } from "../views/Home/Buscador";
import { Categorias } from "../views/Home/Categorias";
import { Recomendaciones } from "../views/Home/Recomendaciones";
import { Footer } from "../views/Home/Footer";
import { Galeria } from "../views/Home/Galeria";
import { ListaVehiculos } from "../views/Home/ListaVehiculos";
import { MenuBotones } from "../views/Administracion/MenuBotones";

export const Administracion = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el ancho según tu necesidad
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="error">
          No disponible en dispositivos móviles
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box textAlign="right" mt={6} marginTop={"80px"}>
        <MenuBotones />
      </Box>
      <Box flex={1} mt={10} textAlign="center" marginTop={"40px"}>
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
      <Footer />
    </Box>
  );
};
