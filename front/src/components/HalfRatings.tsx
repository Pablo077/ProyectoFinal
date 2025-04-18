import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { colores } from "../styles/colors";

interface Props {
  cantidad: string;
  promedio: number;
}

export const HalfRatings = (props: Props) => {
  const { cantidad, promedio } = props;
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography component="legend">{promedio}</Typography>
      <Rating
        name="half-rating-read"
        value={promedio}
        precision={0.5}
        readOnly
        sx={{
          "& .MuiRating-iconFilled": {
            color: colores.Saffron, // Color de las estrellas llenas (amarillo dorado)
          },
          "& .MuiRating-iconEmpty": {
            color: colores.SlateGray, // Color de las estrellas vacías (gris)
          },
        }}
      />
      <Typography component="legend">({cantidad})</Typography>
    </Stack>
  );
};
