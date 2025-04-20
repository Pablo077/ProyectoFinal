import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";

import { SnackMensaje } from "../components/SnackMensaje";
import { CategoriasViews } from "../views/Categorias/CategoriasViews";


export const Categorías = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <SnackMensaje />
      <CategoriasViews />
      <Footer />
    </Box>
  )
}
