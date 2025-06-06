import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { Box } from "@mui/material";
import { RegisterViews } from "../views/Register/RegisterViews";
import { SnackMensaje } from "../components/SnackMensaje";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";

export const Register = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        <RegisterViews />
      </Box>
      <WhatsAppButton />
      <Footer />
    </>
  );
};
