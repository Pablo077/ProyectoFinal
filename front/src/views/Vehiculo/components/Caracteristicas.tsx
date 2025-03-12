import { Typography, Divider } from "@mui/material";
import { colores } from "../../../styles/colors";
import { Iconos } from "../../Caracteristicas/components/Iconos";
import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { apiCaracteristica } from "../../../service/Caracterica/apiCaracteristica";

export const Caracteristicas = () => {
  const {vehiculo} = useContext(VehiculoContext);  
  const [caracteristica, setCaracteristicas] = useState([]);
  const { getCaracteristicasVehiculo } = apiCaracteristica();

  const CargarCaracteristicas = async () => {
    const result = await getCaracteristicasVehiculo(vehiculo);
    setCaracteristicas(result);
  };

  useEffect(() => {
    if (vehiculo) {
      CargarCaracteristicas();
    }
  }, []);

  return (
    <div>
      <Divider sx={{ borderColor: colores.AntiFlashWhite, margin: "10px" }} />
      <Typography variant="h6" component="h2" margin={"20px 10px 10px 10px"}>
        Caracteristicas del vehículo
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          margin: "40px",
        }}
      >
        {caracteristica?.map((carac: any) => (
          <div key={carac.id} style={{ display: "flex", alignItems: "center", margin: "16px" }}>
            <Iconos iconNumber={carac.icono} size={1.5} />
            <Typography sx={{ marginLeft: "10px" }}>{carac.nombre}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
