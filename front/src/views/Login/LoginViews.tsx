import { DynamicForm } from "../../components/Formik/DynamicForm";
import { coloresDesignados } from "../../styles/colors";
import { campos, formJson } from "./components/DataInputs";

export const LoginViews = () => {
  const onSubmit = async (values: campos) => {
    console.log(values);
  };

  return (
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
  );
};
