import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

interface CardsProps {
  actions: boolean;
  cardMedia: boolean;
  children: ReactNode;
  image?: string;
  onClickButton: () => void;
  sxCard?: SxProps<Theme> | undefined;
  sxCardMedia?: SxProps<Theme> | undefined;
  tituloButton?: string;
  tituloImagen?: string;
}

export const Cards = (props: CardsProps) => {
  const {
    children,
    actions,
    sxCard,
    sxCardMedia,
    cardMedia,
    image,
    tituloImagen,
    tituloButton
  } = props;
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={sxCard}>
        {cardMedia && (
          <CardMedia sx={sxCardMedia} image={image} title={tituloImagen} />
        )}
        <CardContent sx={{padding:"10px 10px 0px 10px", minHeight:72}}>{children}</CardContent>
        {actions && (
          <CardActions>
            <Button size="small">{tituloButton}</Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
