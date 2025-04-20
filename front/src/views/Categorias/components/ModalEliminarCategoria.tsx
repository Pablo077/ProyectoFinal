import React, { useContext } from "react";
import { Modals } from "../../../components/Modals";
import { Typography } from "@mui/material";
import { colores } from "../../../styles/colors";
import { ICategoria } from "../../../service/Categoria/apiCategoria";
import { Buttons } from "../../../components/Buttons";
import { apiCategoria } from "../../../service/Categoria/apiCategoria";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { erroresAxios } from "../../../utils/utils";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoria: ICategoria | undefined;
  cargarDatos: () => Promise<void>;
}

export const ModalEliminarCategoria = (props: Props) => {
  const { openModal, setOpenModal, categoria, cargarDatos } = props;
  const { deleteVehiculo } = apiCategoria();
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

  const handleDelete = async () => {
    try {
      if (categoria) {
        const response = await deleteVehiculo(categoria.id);

        if (response === "Borrado exitoso") {
          setMensajeSnack(response);
          setAlertSnack("success");
          setOpenSnack(true);
          setOpenModal(false);
          cargarDatos();
        } else {
          setMensajeSnack("Error al eliminar la categoria");
          setAlertSnack("error");
          setOpenSnack(true);
          setOpenModal(false);
        }
      }
    } catch (error) {
      setMensajeSnack("No se puede eliminar la categoria");
      setAlertSnack("error");
      setOpenSnack(true);
    }
  };

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
          color={colores.AntiFlashWhite}
        >
          Eliminar Categoria
        </Typography>

        <Typography
          variant="body1"
          component="h2"
          textAlign={"center"}
          color={colores.Jasper}
          marginTop={1.5}
        >
          ¿Deseas eliminar la categoria {categoria?.nombre}?
        </Typography>

        <Typography
          variant="caption"
          component="h2"
          textAlign={"center"}
          color={colores.Saffron}
          marginTop={1.5}
          style={{
            maxWidth: "200px", // Limitar el ancho del texto
            margin: "0 auto", // Centrar el texto horizontalmente
            whiteSpace: "normal", // Permitir saltos de línea
            wordWrap: "break-word", // Forzar el salto de línea si es necesario
          }}
        >
          Recuerda que si la categoría tiene vehículos asociados, no podrás
          eliminarla.
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <Buttons
            text="Confirmar"
            variant="contained"
            onClick={handleDelete}
          />
          <Buttons text="Cancelar" variant="contained" onClick={handleClose} />
        </div>
      </Modals>
    </>
  );
};
