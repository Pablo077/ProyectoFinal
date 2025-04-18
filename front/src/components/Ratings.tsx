import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { colores } from "../styles/colors";

interface Props {
  titulo: boolean;
  tituloContenido?: string;
  name:
    | "simple-controlled"
    | "simple-uncontrolled"
    | "read-only"
    | "disabled"
    | "no-value";
  valor?: number | null;
  valueControlled?: number | null;
  setValueControlled?: (value: number | null) => void;
}

export const Ratings = (props: Props) => {
  const {
    name,
    titulo,
    valor,
    tituloContenido,
    valueControlled,
    setValueControlled = () => {},
  } = props;
  const [value, setValue] = useState<number | null>(valor || null);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      {titulo && <Typography component="legend">{tituloContenido}</Typography>}

      <Rating
        name={name}
        value={name === "simple-controlled" ? valueControlled : value}
        onChange={(event, newValue) => {
          name === "simple-controlled"
            ? setValueControlled(newValue)
            : setValue(newValue);
        }}
        readOnly={name === "read-only"}
        disabled={name === "disabled"}
        sx={{
          "& .MuiRating-iconFilled": {
            color: colores.Saffron, // Color de las estrellas llenas (amarillo dorado)
          },
          "& .MuiRating-iconEmpty": {
            color: colores.SlateGray, // Color de las estrellas vacías (gris)
          },
        }}
      />
    </Box>
  );
};
