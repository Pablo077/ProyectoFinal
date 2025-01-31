import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "left",
        py: 2, // Padding en el eje Y (arriba y abajo)
        mt: "auto", // Empuja el footer al final si el contenedor principal usa flexbox
      }}
    >
      <Typography variant="body2">© 2025 Drive Punilla. Todos los derechos reservados.</Typography>
    </Box>
  );
};
