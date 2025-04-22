import { Box } from "@mui/material";
import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { LoginViews } from "../views/Login/LoginViews";
import { SnackMensaje } from "../components/SnackMensaje";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";

export const Login = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        <LoginViews />
      </Box>
      <WhatsAppButton />
      <Footer />
    </>
  );
};
