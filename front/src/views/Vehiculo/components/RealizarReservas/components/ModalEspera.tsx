import { Typography } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Modals } from "../../../../../components/Modals";
import { colores } from "../../../../../styles/colors";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export const ModalEspera = (props: Props) => {
  const { openModal, setOpenModal } = props;
  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography
          textAlign={"center"}
          color={colores.LightGreen}
          variant="h6"
          component={"div"}
        >
            "Registrando reserva, por favor espere..."
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <CircularProgress sx={{ color: colores.Saffron }}/>
        </Box>
      </Modals>
    </>
  );
};
