import { Box, Typography } from "@mui/material";
import { coloresDesignados } from "../../styles/colors";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: coloresDesignados.FooterFondo,
        color: coloresDesignados.FooterLetra,
        textAlign: "left",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">© 2025 Drive Punilla. Todos los derechos reservados.</Typography>
    </Box>
  );
};
