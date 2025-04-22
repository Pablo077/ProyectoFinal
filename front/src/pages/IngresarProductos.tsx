import { Box } from "@mui/material";
import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { IngresarProductosViews } from "../views/IngresarProductos/IngresarProductosViews";
import { SnackMensaje } from "../components/SnackMensaje";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";

export const IngresarProductos = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        <div style={{ color: "white", marginTop: "100px", flex: 1 }}>
          <IngresarProductosViews />
        </div>
      </Box>
      <WhatsAppButton />
      <Footer />
    </>
  );
};
