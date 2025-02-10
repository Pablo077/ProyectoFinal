import { Buttons } from "../../components/Buttons";
import { Modals } from "../../components/Modals";
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { Typography } from "@mui/material";
import { colores } from "../../styles/colors";
import { apiVehiculo } from "../../service/Vehiculo/apiVehiculo";
import { useContext, useState } from "react";
import { useSnack } from "../../hook/useSnack";
import { VehiculoContext } from "../../context/VehiculoContext";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  vehiculo: Vehiculo;
}

export const ModalProducto = (props: Props) => {
  const { openModal, setOpenModal, vehiculo } = props;
  const { cargarVehiculos } = useContext(VehiculoContext);
  const { deleteVehiculo } = apiVehiculo();
  const { SnackStatus } = useSnack();
  const [openSnack, setOpenSnack] = useState(false);
  const [alertSnack, setAlertSnack] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [mensajeSnack, setMensajeSnack] = useState("");

  const handleOk = async (vehiculo: Vehiculo) => {
    try {
      const response = await deleteVehiculo(vehiculo.id);
      
      setMensajeSnack(response);
      setAlertSnack(() =>
        response === "Borrado exitoso" ? "success" : "error"
      );
      setOpenSnack(true);
      if (response === "Borrado exitoso") {
        cargarVehiculos();
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <SnackStatus
        mensaje={mensajeSnack}
        open={openSnack}
        setOpen={setOpenSnack}
        tipoAlert={alertSnack}
      />

      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography textAlign={"center"} color={colores.Jasper}>
          Desea eliminar el siguiente vehículo
        </Typography>
        <Typography marginTop={"10px"}>Marca: {vehiculo?.marca}</Typography>
        <Typography>Modelo: {vehiculo?.modelo}</Typography>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Buttons
            variant="contained"
            styles={{
              backgroundColor: colores.Jasper,
              color: colores.AntiFlashWhite,
            }}
            text="Confirmar"
            onClick={() => handleOk(vehiculo)}
          />
          <Buttons
            variant="contained"
            styles={{
              backgroundColor: colores.CornflowerBlue,
              color: colores.PennBlue,
              marginLeft: "10px",
            }}
            text="Cancelar"
            onClick={handleClose}
          />
        </div>
      </Modals>
    </>
  );
};
