import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { CaracteristicasViews } from "../views/Caracteristicas/CaracteristicasViews";
import { SnackMensaje } from "../components/SnackMensaje";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";


export const Caracteristicas = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <SnackMensaje />
      <CaracteristicasViews />
      <WhatsAppButton />
      <Footer />
    </Box>
  );
};
