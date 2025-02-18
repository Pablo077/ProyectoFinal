import { useContext, useState } from "react";
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
import { VehiculoContext } from "../../context/VehiculoContext";


export const IngresarProductosViews = () => {
  const column = 2;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const { JsonInfo } = DataInputs();
  const formJson = JsonInfo;
  const { cargarInputGrid } = CargarInputGrid();
  const { cargarVehiculo } = apiVehiculo();
 const { setOpenSnack, setMensajeSnack, setAlertSnack } =
     useContext(VehiculoContext);

  const onSubmit = async (values: any) => {
    // Combinar imágenes y valores del formulario
    const formData = new FormData();

    // Agregar los valores del formulario
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Obtener marca y modelo del formulario
    const marca = values.marca?.replace(/\s+/g, "_") || "Desconocido";
    const modelo = values.modelo?.replace(/\s+/g, "_") || "Desconocido";

    let renamedFiles: File[] = [];
    let fileNames: string[] = [];

    // Renombrar imágenes y agregarlas a FormData
    files.forEach((file, index) => {
      const extension = file.name.split(".").pop(); // Obtener extensión del archivo
      const nuevoNombre = `${marca}_${modelo}_${index + 1}.${extension}`; // Nuevo nombre

      // Crear un nuevo archivo con el nombre cambiado
      const renamedFile = new File([file], nuevoNombre, { type: file.type });

      renamedFiles.push(renamedFile);
      fileNames.push(nuevoNombre); // Guardamos el nombre en un array
      formData.append("images", renamedFile);
    });

    // Guardar la imagen principal con el nuevo nombre
    const imagenPrincipal =
      mainImageIndex !== null
        ? renamedFiles[mainImageIndex]?.name
        : "sin_imagen_principal";
    formData.append("mainImage", imagenPrincipal);

    // Crear un JSON con los nombres de los archivos y convertirlo en string
    const fileNamesJson = JSON.stringify({ images: fileNames });
    formData.append("filesName", fileNamesJson); // Enviar JSON como string en FormData



    // Enviar datos al servidor
    try {
      const response = await cargarVehiculo(formData);
      setMensajeSnack(response);
      setAlertSnack(() => response === "Vehículo guardado correctamente" ? "success" : "error");
      setOpenSnack(true);
      if (response === "Vehículo guardado correctamente") {
        setTimeout(() => {
          window.location.href = "/"; // Redirige a la página principal
        }, 3000);
      }
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
                {files.length > 0 && mainImageIndex != null && (
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

      {
        (files.length === 0 || mainImageIndex === null) && (
          <div style={{ textAlign: "center" }}>
            <h5>Recuerda seleccionar imágenes e indicar la principal marcándola con una estrella</h5>
          </div>
        )
      }

    </div>
  );
};
