import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { ReservaHistorialView } from "../views/ReservaHistorial/ReservaHistorialView";

export const ReservaHistorial = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <ReservaHistorialView />
      {/* <ReservaHistorialView /> */}
      <Footer />
    </Box>
  )
}
