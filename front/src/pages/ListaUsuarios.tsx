import { Box } from "@mui/material";
import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";

export const ListaUsuarios = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <div style={{marginTop:"120px"}}>Lista Usuarios</div>
      </Box>
      <Footer />
    </>
  );
};
