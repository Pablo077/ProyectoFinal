import { useState } from "react";
import { useSnack } from "../../hook/useSnack";
import { coloresDesignados } from "../../styles/colors";
import { DynamicForm } from "../../components/Formik/DynamicForm";
import { formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { erroresAxios } from "../../utils/utils";


export const RegisterViews = () => {
    const { SnackStatus } = useSnack();
    const [openSnack, setOpenSnack] = useState(false);
    const [alertSnack, setAlertSnack] = useState<"success" | "error" | "info" | "warning">("success");
    const [mensajeSnack, setMensajeSnack] = useState("");
    const { register } = apiUsers();
    const navigate = useNavigate();


    const onSubmit = async (values: any) => {

        try {
            const valuesFinal = { ...values, idrol: 1 };
            const response = await register(valuesFinal);

            if (response.id) {
                setMensajeSnack("Registro exitoso");
                setAlertSnack("success");
                setOpenSnack(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2500);
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


    }



    return (
        <>
            <SnackStatus
                mensaje={mensajeSnack}
                open={openSnack}
                setOpen={setOpenSnack}
                tipoAlert={alertSnack}
            />
            <div style={{ margin: "auto" }}>
                <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
                    <h1>Registro</h1>
                </div>
                <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
                    <h3>Llene los campos requeridos</h3>
                </div>
                <div style={{ width: "70%", margin: "auto" }}>
                    <DynamicForm
                        column={1}
                        formJson={formJson}
                        onSubmit={onSubmit}
                        textoBoton="Registrar"
                    />
                </div>
            </div>
        </>
    )
}
