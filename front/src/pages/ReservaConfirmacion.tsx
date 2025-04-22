import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { ReservaConfirmacionView } from "../views/ReservaConfirmacion/ReservaConfirmacionView";

export const ReservaConfirmacion = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <ReservaConfirmacionView />
      <Footer />
    </Box>
  )
}
