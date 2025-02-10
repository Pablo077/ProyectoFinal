import { Buttons } from "../../components/Buttons";
import { Modals } from "../../components/Modals";
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { Typography } from "@mui/material";
import { colores } from "../../styles/colors";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  vehiculo: Vehiculo;
}

export const ModalProducto = (props: Props) => {
  const { openModal, setOpenModal, vehiculo } = props;

const handleClose = () =>{
    setOpenModal(false)
}

  return (
    <Modals open={openModal} setOpen={setOpenModal}>
      <Typography textAlign={"center"} color={colores.Jasper}>
        Desea eliminar el siguiente vehículo
      </Typography>
      <Typography marginTop={"10px"}>Marca: {vehiculo?.marca}</Typography>
      <Typography>Modelo: {vehiculo?.modelo}</Typography>
      <div style={{marginTop:"10px", textAlign:"center"}}>
        <Buttons
          variant="contained"
          styles={{
            backgroundColor: colores.Jasper,
            color: colores.AntiFlashWhite
          }}
          text="Confirmar"
        />
        <Buttons
          variant="contained"
          styles={{
            backgroundColor: colores.CornflowerBlue,
            color: colores.PennBlue,
            marginLeft:"10px",
          }}
          text="Cancelar"
          onClick={handleClose}
        />
      </div>
    </Modals>
  );
};
