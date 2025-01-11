import { DynamicForm } from "../../components/Formik/DynamicForm";
import { campos, formJson } from "./components/DataInputs";

export const LoginViews = () => {
  const onSubmit = async (values: campos) => {
    console.log(values);
  };

  return (
    <div>
      <DynamicForm
        column={1}
        formJson={formJson}
        onSubmit={onSubmit}
        textoBoton="Ingresar"
      />
    </div>
  );
};
