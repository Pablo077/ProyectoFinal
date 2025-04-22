import { Box } from "@mui/material";
import { Navbar } from "../views/Home/Navbar";
import { Footer } from "../views/Home/Footer";
import { ReservaConfirmacionView } from "../views/ReservaConfirmacion/ReservaConfirmacionView";
import { WhatsAppButton } from "../views/Home/WhatsAppButton";

export const ReservaConfirmacion = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <ReservaConfirmacionView />
      <WhatsAppButton />
      <Footer />
    </Box>
  );
};
