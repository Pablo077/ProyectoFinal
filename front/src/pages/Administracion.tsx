import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Buscador } from "../views/Home/Buscador/Buscador";
import { Footer } from "../views/Home/Footer";
import { Galeria } from "../views/Home/Galeria";
import { MenuBotones } from "../views/Administracion/components/MenuBotones";
import { getCookie } from "../utils/utils";
import { SnackMensaje } from "../components/SnackMensaje";
import { ListaVehiculos } from "../views/Home/ListaVehiculos/ListaVehiculos";
import { Recomendaciones } from "../views/Home/Recomendaciones/Recomendaciones";

export const Administracion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    // Obtener la respuesta de la API de las cookies
    const cookieData = getCookie("user");
    if (cookieData) {
      // Convertir la cadena JSON en un objeto
      const parsedData = JSON.parse(cookieData);
      setApiData(parsedData);
    }

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h5" color="error">
          No disponible en dispositivos móviles
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <SnackMensaje />
      {apiData?.rol === "ADMIN" ? (
        <Box textAlign="right" mt={6} marginTop={"90px"}>
          <MenuBotones />
        </Box>
      ) : (
        <></>
      )}
      <Box flex={1} mt={10} textAlign="center" marginTop={"40px"}>
        <Typography variant="h4" component="h1">
          Flota de vehículos en alquiler
        </Typography>
      </Box>
      <Buscador />
      <Recomendaciones />
      <Box mt={3} mb={3}>
        <Galeria />
      </Box>
      <ListaVehiculos />
      <Footer />
    </Box>
  );
};
