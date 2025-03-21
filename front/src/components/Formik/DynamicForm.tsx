import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import { InitialValues } from "./components/InitialValues";
import { Validation } from "./components/Validation";
import { Props } from "./interface";
import { CargarInputGrid } from "./components/CargarInputGrid";
import { SwitchInput } from "./components/SwitchInput";
import { Buttons } from "../Buttons";

export const DynamicForm = (props: Props) => {
  const { formJson, onSubmit, textoBoton, column, textoBotonSecondary = "", ButtonSecondary = false, functionSecondary } = props;
  const { cargarInputGrid } = CargarInputGrid();

  const handleSecondary = () => {
    if (functionSecondary)
      functionSecondary();
  }

  return (
    <div>
      <Formik
        initialValues={InitialValues(formJson)}
        validationSchema={Validation(formJson)}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, touched, errors, handleChange }) => (
          <Form noValidate>
            {column === 1 ? (
              <SwitchInput
                errors={errors}
                formJson={formJson}
                handleChange={handleChange}
                touched={touched}
                values={values}
              />
            ) : (
              <Grid container spacing={2}>
                {cargarInputGrid({
                  values,
                  touched,
                  errors,
                  handleChange,
                  column,
                  formJson,
                })}
              </Grid>
            )}
            <div style={{ textAlign: "center", marginTop: "20px" }}>

              <Buttons
                tipo="submit"
                variant="contained"
                styles={{ marginTop: "10px" }}
                text={textoBoton}
              />

              {
                ButtonSecondary &&
                <Buttons
                  onClick={handleSecondary}
                  variant="contained"
                  styles={{ marginTop: "10px", marginLeft: "10px" }}
                  text={textoBotonSecondary}
                />
              }

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
