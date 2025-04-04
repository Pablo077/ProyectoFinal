import Icon from "@mdi/react";
import Typography from "@mui/material/Typography";
import { colores } from "../styles/colors";

interface Props {
  texto: string;
  path: string;
  size: number;
}

export const CajaDireccion = (props: Props) => {
  const { texto, path, size } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
      <Icon path={path} size={size} color={colores.PennBlue}/>

      <Typography component="p" variant="body2" color={colores.PennBlue}>
        {texto}
      </Typography>
    </div>
  );
};
