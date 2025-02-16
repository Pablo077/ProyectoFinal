import { Modals } from "../../components/Modals";
import { userList } from "../../service/Users/apiUsers";
import { Typography } from '@mui/material';
import { colores } from "../../styles/colors";
import { DynamicForm } from "../../components/Formik/DynamicForm";
import { DataInputs } from "./DataInputs";
import { useContext } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";
import { apiUsers } from "../../service/Users/apiUsers";

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    user: userList;
}


export const ModalEditarUsuarios = (props: Props) => {
    const { openModal, setOpenModal, user } = props;
    const { formData } = DataInputs();
    const {updateUser} = apiUsers();
    //const {setOpenSnack, setMensajeSnack, setAlertSnack} = useContext(VehiculoContext)


    const onSubmit = async (values: any) => {
       user.rol = values.rol === 1 ? "USER" : "ADMIN"
       const response = await updateUser(user);
        console.log(response)
    }

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
    )
}
