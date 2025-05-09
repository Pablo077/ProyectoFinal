import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const WhatsAppButton = () => {
  const phoneNumber = "+5493548405343";
  const message = "¡Hola! Tengo una consulta sobre el alquiler de autos. ¿Podrían ayudarme? ¡Gracias!";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Fab
      color="success"
      aria-label="WhatsApp"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
        zIndex: 1000, // Asegura que el botón esté sobre otros elementos
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

