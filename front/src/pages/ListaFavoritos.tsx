import { Box } from "@mui/material";
import { SnackMensaje } from "../components/SnackMensaje";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { ListaFavoritosView } from "../views/ListaFavoritos/ListaFavoritosView";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";

export const ListaFavoritos = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        <div style={{ marginTop: "120px" }}>
          <ListaFavoritosView />
        </div>
      </Box>
      <WhatsAppButton />
      <Footer />
    </>
  );
};
