import { Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { userData } from "../../../../utils/utils";
import { VehiculoContext } from "../../../../context/VehiculoContext";
import { Buttons } from "../../../../components/Buttons";
import { Variant } from "@mui/material/styles/createTypography";
import { colores } from "../../../../styles/colors";

interface Props {
  fechaInicio: dayjs.Dayjs | null;
  fechaFin: dayjs.Dayjs | null;
}

export const RealizarReservas = (props: Props) => {
  const { fechaInicio, fechaFin } = props;
  const [user, setUser] = useState<any>(null);
  const { vehiculo } = useContext(VehiculoContext);
  const variantTitulo: Variant | undefined = "body1";
  const colorDato = colores.Saffron;
  const [expanded, setExpanded] = useState(false);

  // const onSubmit = async (values: any) => {
  //     console.log(values);
  // }

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const userResponse = userData();
    if (userResponse) {
      setUser(userResponse);
    }
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" textAlign={"center"}>
        Formulario de reserva
      </Typography>
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant={variantTitulo} component="h4">
          Inicio:{" "}
          <span style={{ color: colorDato }}>
            {fechaInicio
              ? dayjs(fechaInicio).format("DD-MM-YYYY").toString()
              : ""}
          </span>
        </Typography>
        <Typography variant={variantTitulo} component="h4">
          Fin:{" "}
          <span style={{ color: colorDato }}>
            {fechaFin ? dayjs(fechaFin).format("DD-MM-YYYY").toString() : ""}
          </span>
        </Typography>
        <Typography variant={variantTitulo} component="h4">
          Nombre:{" "}
          <span style={{ color: colorDato }}>{user ? user.firstname : ""}</span>
        </Typography>
        <Typography variant={variantTitulo} component="h4">
          Apellido:{" "}
          <span style={{ color: colorDato }}>{user ? user.lastname : ""}</span>
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant={variantTitulo} component="h4">
            Correo electrónico:{" "}
            <span style={{ color: colorDato }}>{user ? user.email : ""}</span>
          </Typography>
          <Typography variant={variantTitulo} component="h4">
            Marca:{" "}
            <span style={{ color: colorDato }}>
              {vehiculo ? vehiculo.marca : ""}
            </span>
          </Typography>
          <Typography variant={variantTitulo} component="h4">
            Modelo:{" "}
            <span style={{ color: colorDato }}>
              {vehiculo ? vehiculo.modelo : ""}
            </span>
          </Typography>
          <Typography variant={variantTitulo} component="h4">
            Motor:{" "}
            <span style={{ color: colorDato }}>
              {vehiculo ? vehiculo.motor : ""} Lts
            </span>
          </Typography>
        </Collapse>
        <IconButton
          aria-label={expanded ? "Ver menos" : "Ver más"}
          onClick={handleToggle}
          size="small"
        >
          {
          expanded ? <>
          <ExpandLessIcon sx={{color:colores.CornflowerBlue}}/>
          <Typography variant="body2" component="h4" color={colores.CornflowerBlue}>
            Ver menos
          </Typography>
          </> 
          : <>
          <ExpandMoreIcon sx={{color:colores.CornflowerBlue}}/>
          <Typography variant="body2" component="h4" color={colores.CornflowerBlue}>
            Ver más
          </Typography> 
          </>}
        </IconButton>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Buttons text="RESERVAR" variant="contained" />
        </div>
      </div>
    </div>
  );
};
