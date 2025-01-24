import { useState } from "react";
import { coloresDesignados } from "../../styles/colors";
import { SubirImagenes } from "./components/SubirImagenes";
import Grid from '@mui/material/Grid2';
import { DataInputs } from "./components/DataInputs";
import { InitialValues } from "../../components/Formik/components/InitialValues";
import { Validation } from "../../components/Formik/components/Validation";
import { SwitchInput } from "../../components/Formik/components/SwitchInput";
import { CargarInputGrid } from "../../components/Formik/components/CargarInputGrid";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";

export const IngresarProductosViews = () => {
  const [column, setColumn] = useState(2);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const { JsonInfo } = DataInputs();
  const formJson = JsonInfo;
  const { cargarInputGrid } = CargarInputGrid();

  const onSubmit = async (values: any) => {
    console.log(values)
  }



  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
        <h1>Agregar un producto</h1>
      </div>



      <div>
        <Formik
          initialValues={InitialValues(JsonInfo)}
          validationSchema={Validation(JsonInfo)}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ values, touched, errors, handleChange }) => (

            <Form noValidate>

                  <SubirImagenes
                    files={files}
                    setFiles={setFiles}
                    mainImageIndex={mainImageIndex}
                    previews={previews}
                    setMainImageIndex={setMainImageIndex}
                    setPreviews={setPreviews}
                  />
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
              


              




              {/* Botón para subir imágenes */}
              {files.length > 0 && (
                <Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
                  Subir Imágenes
                </Button>
              )}

            </Form>
          )}
        </Formik>
      </div>



    </div>
  );
};
