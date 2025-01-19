import { DynamicForm } from "../../components/Formik/DynamicForm"
import { coloresDesignados } from "../../styles/colors";
import { formJsonIP, IingPr } from "./components/DataInputs";

export const IngresarProductosViews = () => {
     const onSubmit = async (values: IingPr) => {
        
       console.log(values);
      };
  return (
    <div style={{ margin: "auto", width: "50%" }}>
          <div style={{ textAlign: "center", color:coloresDesignados.Letra }}>
            <h1>Agregar un producto</h1>
          </div>
          <div style={{ textAlign: "center" }}>
            <DynamicForm
              column={1}
              formJson={formJsonIP}
              onSubmit={onSubmit}
              textoBoton="Ingresar"
            />
          </div>
        </div>
  )
}
