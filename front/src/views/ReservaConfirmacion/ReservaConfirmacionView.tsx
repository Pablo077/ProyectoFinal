import { Typography } from "@mui/material";
import { Buttons } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { colores } from "../../styles/colors";
import { useContext } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";

export const ReservaConfirmacionView = () => {
  const navigate = useNavigate();
  const {setVehiculosDisponibles} = useContext(VehiculoContext);

  const handleClick = () => {
    setVehiculosDisponibles([]);
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "16%" }}>
      <Typography variant="h4" component="h1" color={colores.LightGreen}>
        Reserva confirmada
      </Typography>
      <Typography variant="h6" component="h6" marginTop={"20px"}>
        Gracias por elegirnos, su reserva ha sido confirmada.
      </Typography>
      <div style={{ marginTop: "20px" }}>
        <Buttons
          text="VOLVER AL INICIO"
          variant="contained"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
