import { useContext, useState } from "react";
import { colores, coloresDesignados } from "../../styles/colors";
import { DynamicForm } from "../../components/Formik/DynamicForm";
import { formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useNavigate } from "react-router-dom";
import { erroresAxios } from "../../utils/utils";
import { VehiculoContext } from "../../context/VehiculoContext";
import { ModalEspera } from "./components/ModalEspera";
import { Buttons } from "../../components/Buttons";


export const RegisterViews = () => {
  const { register, envioCorreo } = apiUsers();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [reEnvio, setReEnvio] = useState(false);
  const [userRegister, setUserRegister] = useState<any>({});
  const [registroOK, setRegistroOK] = useState(false);
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

  const onSubmit = async (values: any) => {
    setOpenModal(true);
    try {
      const valuesFinal = { ...values, idrol: 1 };
      setUserRegister(valuesFinal);
      const response = await register(valuesFinal);
      if (response.id) {
        setOpenModal(false);
        setRegistroOK(true);
      } else {
        setOpenModal(false);
        setMensajeSnack("Error al actualizar");
        setAlertSnack("error");
        setOpenSnack(true);
      }
    } catch (error) {
      setOpenModal(false);  
      setMensajeSnack(erroresAxios(error).data);
      setAlertSnack("error");
      setOpenSnack(true);
    }
  };

const handleLogin = () =>{
    navigate("/login");
    
}

const handleReenviarCorreo = async() => {
    setReEnvio(true);
    setOpenModal(true);
    const response = await envioCorreo(userRegister);
    
    if (response === "Se envía correo nuevamente"){
        setOpenModal(false);
        setMensajeSnack("Correo reenviado exitosamente");
        setAlertSnack("success");
        setOpenSnack(true);
    }
}

  return (
    <>
      <ModalEspera openModal={openModal} setOpenModal={setOpenModal} reEnvio={reEnvio}/>

      <div style={{ margin: "auto" }}>
        {registroOK ? (
          <>
            <div style={{ textAlign: "center", color: colores.LightGreen }}>
              <h1>Registro Exitoso!</h1>
            </div>

            <div style={{marginTop:"40px"}}>
              <Buttons
                text="Iniciar sesión"
                variant="contained"
                styles={{ marginRight: "20px" }}
                onClick={handleLogin}
              />
              <Buttons
                text="Reenviar correo de confirmación"
                variant="contained"
                onClick={handleReenviarCorreo}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{ textAlign: "center", color: coloresDesignados.Letra }}
            >
              <h1>Registro</h1>
            </div>
            <div
              style={{ textAlign: "center", color: coloresDesignados.Letra }}
            >
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
          </>
        )}
      </div>
    </>
  );
};
