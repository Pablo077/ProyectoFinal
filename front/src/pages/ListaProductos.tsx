import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { ListaProductosViews } from "../views/ListaProductos/ListaProductosViews";

export const ListaProductos = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <ListaProductosViews />
      <Footer />
    </Box>
  );
};
