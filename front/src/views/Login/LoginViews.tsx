import { DynamicForm } from "../../components/Formik/DynamicForm";
import { coloresDesignados } from "../../styles/colors";
import { campos, formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useContext } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";


export const LoginViews = () => {
  const {login} = apiUsers()  
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
  useContext(VehiculoContext);
  
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
   
    <div style={{ margin: "auto" }}>
      <div style={{ textAlign: "center", color:coloresDesignados.Letra }}>
        <h1>Login</h1>
      </div>
      <div style={{ textAlign: "center", color:coloresDesignados.Letra }}>
        <h3>Ingrese sus datos para iniciar sesión</h3>
      </div>
      <div style={{width:"70%", margin:"auto"}}>
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
