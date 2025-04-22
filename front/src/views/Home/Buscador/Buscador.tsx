import { Typography } from "@mui/material";
import { InputsBuscador } from "./components/InputsBuscador";
import { useContext, useState } from "react";
import { Resultados } from "./components/Resultados";
import { colores } from "../../../styles/colors";
import { VehiculoContext } from "../../../context/VehiculoContext";
import dayjs, { Dayjs } from "dayjs";

export const Buscador = () => {
  const {vehiculosDisponibles, setVehiculosDisponibles} = useContext(VehiculoContext);
  const [fechaInicio, setFechaInicio] = useState<String>("");
  const [fechaFin, setFechaFin] = useState<String>("");

  return (
    <div
      style={{
        backgroundColor: colores.PennBlue,
        margin: "16px",
        padding: "16px",
        borderRadius: "8px",
        border: `2px solid ${colores.CornflowerBlue}`,
      }}
    >
      <Typography component="h5" variant="h5" align="center" marginBottom={2}>
        Buscar
      </Typography>
      <div style={{ width: "70%", margin: "auto" }}>
        <InputsBuscador setVehiculos={setVehiculosDisponibles} setFechaFin={setFechaFin} setFechaInicio={setFechaInicio}/>
      </div>
      <div style={{ marginLeft: "-10px" }}>
        <Resultados vehiculos={vehiculosDisponibles} fechaInicio={fechaInicio} fechaFin={fechaFin}/>
      </div>
    </div>
  );
};
