import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

interface CardsProps {
  actions: boolean;
  cardMedia: boolean;
  cardContent: boolean;
  children?: ReactNode;
  children2?: ReactNode;
  image?: string;
  sxBox?: SxProps<Theme> | undefined;
  sxCard?: SxProps<Theme> | undefined;
  sxCardMedia?: SxProps<Theme> | undefined;
  sxCardActions?: SxProps<Theme> | undefined;
  tituloImagen?: string;
}

export const Cards = (props: CardsProps) => {
  const {
    children,
    children2,
    actions,
    sxBox,
    sxCard,
    sxCardMedia,
    sxCardActions,
    cardMedia,
    cardContent,
    image,
    tituloImagen,
  } = props;
  return (
    <Box sx={sxBox}>
      <Card variant="outlined" sx={sxCard}>
        {cardMedia && (
          <CardMedia sx={sxCardMedia} image={image} title={tituloImagen} />
        )}
        {cardContent && (
          <CardContent sx={{ padding: "10px 10px 0px 10px", minHeight: 72 }}>
            {children}
          </CardContent>
        )}
        {actions && (
          <CardActions sx={sxCardActions}>
            {children2}
            {/* <Button size="small">{tituloButton}</Button> */}
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
