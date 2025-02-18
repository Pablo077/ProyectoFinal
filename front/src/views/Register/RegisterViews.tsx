import { useContext } from "react";
import { coloresDesignados } from "../../styles/colors";
import { DynamicForm } from "../../components/Formik/DynamicForm";
import { formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useNavigate } from "react-router-dom";
import { erroresAxios } from "../../utils/utils";
import { VehiculoContext } from "../../context/VehiculoContext";


export const RegisterViews = () => {
    const { register } = apiUsers();
    const navigate = useNavigate();
    const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

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
