import { Box, Typography } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Buscador } from "../views/Home/Buscador/Buscador";
import { Categorias } from "../views/Home/Categorias";
import { Footer } from "../views/Home/Footer";
import { Galeria } from "../views/Home/Galeria";
import { SnackMensaje } from "../components/SnackMensaje";
import { ListaVehiculos } from "../views/Home/ListaVehiculos/ListaVehiculos";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/utils";
import { MenuBotonesUser } from "../views/Home/MenuBotonesUser";
import { Recomendaciones } from "../views/Home/Recomendaciones/Recomendaciones";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";


export const Home = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    const cookieData = getCookie("user");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      setApiData(parsedData);
    }
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        {apiData && (
          <Box textAlign="right" mt={6} marginTop={"90px"}>
            <MenuBotonesUser />
          </Box>
        )}
        <Box flex={1} mt={10} textAlign="center">
          <Typography variant="h4" component="h1" marginTop="10px">
            Flota de vehículos en alquiler
          </Typography>
        </Box>
        {apiData && <Buscador />}
        <Categorias />
        <Recomendaciones />
        <Box mt={3} mb={3}>
          <Galeria />
        </Box>
        <ListaVehiculos />
      </Box>
      <WhatsAppButton />
      <Footer />
    </>
  );
};
