import { DynamicForm } from "../../components/Formik/DynamicForm";
import { coloresDesignados } from "../../styles/colors";
import { campos, formJson } from "./components/DataInputs";
import { apiUsers } from "../../service/Users/apiUsers";
import { useContext } from "react";
import { VehiculoContext } from "../../context/VehiculoContext";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginViews = () => {
  const { login } = apiUsers();
  const navigate = useNavigate();
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

  const onSubmit = async (values: campos) => {
    try {
      const response = await login(values);
      if (response.rol) {
        let jsonData = JSON.stringify(response);
        document.cookie = `user=${jsonData}; path=/; max-age=1800`; // max-age de 1800 segundos (30 minutos)
        if (response.rol == "ADMIN") {
          navigate("/administracion");
        } else {
          navigate(-1);
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
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color={coloresDesignados.Letra}
        >
          Login
        </Typography>

        <Typography
          component="h3"
          variant="h5"
          align="center"
          color={coloresDesignados.Letra}
          marginTop={4}
        >
          Ingrese sus datos para iniciar sesión
        </Typography>

        <Typography
          component="p"
          variant="body2"
          align="center"
          color={coloresDesignados.Letra}
          marginBottom={4}
        >
          El inicio de sesión es obligatorio. Si aún no estás registrada/o, por
          favor regístrate.
        </Typography>

        <div style={{ width: "50%", margin: "auto" }}>
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
