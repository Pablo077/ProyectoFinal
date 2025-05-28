import { Typography } from "@mui/material";
import { Modals } from "../../../components/Modals";
import { colores } from "../../../styles/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  reEnvio: boolean;
}

export const ModalEspera = (props: Props) => {
  const { openModal, setOpenModal, reEnvio } = props;
  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography
          textAlign={"center"}
          color={colores.LightGreen}
          variant="h6"
          component={"div"}
        >
           {
            reEnvio ?
            "Reenviando correo, por favor espere..." :
            "Registrando usuario, por favor espere..."
           }
          
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
