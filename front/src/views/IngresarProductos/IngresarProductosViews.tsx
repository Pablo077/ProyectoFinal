import { useState } from "react";
import { coloresDesignados } from "../../styles/colors";
import { SubirImagenes } from "./components/SubirImagenes";
import Grid from "@mui/material/Grid2";
import { DataInputs } from "./components/DataInputs";
import { InitialValues } from "../../components/Formik/components/InitialValues";
import { Validation } from "../../components/Formik/components/Validation";
import { CargarInputGrid } from "../../components/Formik/components/CargarInputGrid";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { apiVehiculo } from "../../service/Vehiculo/apiVehiculo";

export const IngresarProductosViews = () => {
  const column = 2;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const { JsonInfo } = DataInputs();
  const formJson = JsonInfo;
  const { cargarInputGrid } = CargarInputGrid();
  const {cargarVehiculo} = apiVehiculo();

  const onSubmit = async (values: any) => {
    // Combinar imágenes y valores del formulario
    const formData = new FormData();

    // Agregar los valores del formulario
    for (const key in values) {
      formData.append(key, values[key]);
    }

    //Agregamos que imagen es la principal a mostrar
    formData.append("mainImageIndex", mainImageIndex ? mainImageIndex.toString() : "sin imagen principal");

    // Agregar las imágenes
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    // 🔍 Ver datos en consola antes de enviar
    //console.log("Datos en FormData:");
    //formData.forEach((value, key) => console.log(key, value));
    //console.log(mainImageIndex)

    // Enviar datos al servidor
    try {
      const response = await cargarVehiculo(formData);
      console.log(response);
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (response.ok) {
      //   console.log("Formulario enviado con éxito");
      // } else {
      //   console.error("Error al enviar el formulario");
      // }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div style={{ margin: "auto" }}>
      <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
        <h1>Agregar vehículo</h1>
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
              <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
                <div style={{ flex: 1 }}>
                  <SubirImagenes
                    files={files}
                    setFiles={setFiles}
                    mainImageIndex={mainImageIndex}
                    previews={previews}
                    setMainImageIndex={setMainImageIndex}
                    setPreviews={setPreviews}
                  />
                </div>
                <div style={{ flex: 1 }}>
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
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                {/* Botón para subir imágenes */}
                {files.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    type="submit"
                  >
                    Cargar vehículo
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
