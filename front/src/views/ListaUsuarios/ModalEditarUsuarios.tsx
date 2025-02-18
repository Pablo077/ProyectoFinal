import { Modals } from "../../components/Modals";
import { userList } from "../../service/Users/apiUsers";
import { Typography } from "@mui/material";
import { colores } from "../../styles/colors";
import { DynamicForm } from "../../components/Formik/DynamicForm";
import { DataInputs } from "./DataInputs";
import { useContext } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";
import { apiUsers } from "../../service/Users/apiUsers";
import { erroresAxios } from "../../utils/utils";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: userList;
  cargarDatos: () => Promise<void>;
}

export const ModalEditarUsuarios = (props: Props) => {
  const { openModal, setOpenModal, user, cargarDatos } = props;
  const { formData } = DataInputs();
  const { updateUser } = apiUsers();
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

  const onSubmit = async (values: any) => {
    try {
      user.rol = values.rol === 1 ? "USER" : "ADMIN";

      const response = await updateUser(user);
      
      if (response.id) {
        await cargarDatos();
        setMensajeSnack("Se actualizó el rol");
        setAlertSnack("success");
        setOpenSnack(true);
        setOpenModal(false);
      } else {
        setMensajeSnack("Error al actualizar");
        setAlertSnack("error");
        setOpenSnack(true);
      }
    } catch (error) {
      setMensajeSnack(erroresAxios(error).data);
      setAlertSnack("error");
      setOpenSnack(true);
    }
  };

  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography textAlign={"center"} color={colores.AntiFlashWhite}>
          Editar Rol
        </Typography>

        <div style={{ marginTop: "30px" }}>
          <DynamicForm
            column={1}
            formJson={formData(user)}
            onSubmit={onSubmit}
            textoBoton="Actualizar"
          />
        </div>
      </Modals>
    </>
  );
};
