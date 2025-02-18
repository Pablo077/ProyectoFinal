import { Box } from "@mui/material";
import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { ListaUsuariosView } from "../views/ListaUsuarios/ListaUsuariosView";
import { SnackMensaje } from "../components/SnackMensaje";


export const ListaUsuarios = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <SnackMensaje />
        <div style={{marginTop:"120px"}}>
          <ListaUsuariosView />
        </div>
      </Box>
      <Footer />
    </>
  );
};
