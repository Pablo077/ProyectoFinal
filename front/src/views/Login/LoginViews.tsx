import { DynamicForm } from "../../components/Formik/DynamicForm";
import { coloresDesignados } from "../../styles/colors";
import { campos, formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useSnack } from "../../hook/useSnack";
import { useState } from "react";

export const LoginViews = () => {
  const {login} = apiUsers()  
  const { SnackStatus } = useSnack();
  const [openSnack, setOpenSnack] = useState(false);
  const [alertSnack, setAlertSnack] = useState<"success" | "error" | "info" | "warning">("success");
  const [mensajeSnack, setMensajeSnack] = useState("");
  
  const onSubmit = async (values: campos) => {
   
    try {
      const response = await login(values);
      if(response.rol){
        let jsonData = JSON.stringify(response);
        document.cookie = `user=${jsonData}; path=/; max-age=1800`; // max-age de 1800 segundos (30 minutos)
        if(response.rol == "ADMIN"){
          window.location.href = "/administracion"; // Redirige a la página principal
        }
        else{
          window.location.href = "/";
        }
      }
    } catch (error) {
      setMensajeSnack("Usuario o contraseña incorrectos");
      setAlertSnack("error");
      setOpenSnack(true);
      console.error(error);
    }
  };

  return (
    <>
    <SnackStatus
        mensaje={mensajeSnack}
        open={openSnack}
        setOpen={setOpenSnack}
        tipoAlert={alertSnack}
      />
    <div style={{ margin: "auto", width: "50%" }}>
      <div style={{ textAlign: "center", color:coloresDesignados.Letra }}>
        <h1>Login</h1>
      </div>
      <div style={{ textAlign: "center", color:coloresDesignados.Letra }}>
        <h3>Ingrese sus datos para iniciar sesión</h3>
      </div>
      <div style={{ textAlign: "center" }}>
        <DynamicForm
          column={1}
          formJson={formJson}
          onSubmit={onSubmit}
          textoBoton="Ingresar"
        />
      </div>
    </div>
    </>
  );
};
