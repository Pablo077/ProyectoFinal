import { Typography } from "@mui/material";
import { Modals } from "../../../../../components/Modals";
import { colores } from "../../../../../styles/colors";
import { Buttons } from "../../../../../components/Buttons";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalError = (props: Props) => {
  const { openModal, setOpenModal } = props;

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography
          variant="h5"
          component="h2"
          textAlign={"center"}
          color={colores.Jasper}
        >
          Error al realizar la reserva
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign={"center"}
          color={colores.AntiFlashWhite}
          marginTop={"10px"}
        >
          No se ha podido realizar la reserva. Por favor, intente nuevamente.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign={"center"}
          color={colores.AntiFlashWhite}
          marginTop={"0px"}
        >
          Si el problema persiste, contacte al administrador del sistema.
        </Typography>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Buttons text="CERRAR" variant="contained" onClick={handleClose} />
        </div>
      </Modals>
    </>
  );
};
