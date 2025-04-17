import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface Props{
    cantidad: string;
    value: number;
    promedio: string;
}

export const HalfRatings = (props:Props) => {
    const {cantidad, value = 0, promedio} = props;
  return (
    <Stack spacing={1}>
        <Typography component="legend">{cantidad}</Typography>
      <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
      <Typography component="legend">({promedio})</Typography>
    </Stack>
  )
}
