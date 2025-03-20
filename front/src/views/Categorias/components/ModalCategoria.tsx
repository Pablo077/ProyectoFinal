import React, { useContext, useEffect, useState } from "react";
import { Modals } from "../../../components/Modals";
import { Button, Typography, IconButton, Box, Grid2 } from "@mui/material";
import { colores } from "../../../styles/colors";
import { Formik, Form } from "formik";
import { CargarInputGrid } from "../../../components/Formik/components/CargarInputGrid";
import { InitialValues } from "../../../components/Formik/components/InitialValues";
import { Validation } from "../../../components/Formik/components/Validation";
import DeleteIcon from "@mui/icons-material/Delete";
import { formJson } from "./DataInputs";
import { apiCategoria } from "../../../service/Categoria/apiCategoria";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { Cards } from "../../../components/Cards";
import { getCookie } from "../../../utils/utils";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  cargarDatos: () => Promise<void>;
}

export const ModalCategoria = (props: Props) => {
  const { openModal, setOpenModal, cargarDatos } = props;
  const [apiData, setApiData] = useState<any>(null);
  const column = 2;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { cargarInputGrid } = CargarInputGrid();
  const { saveCategoria } = apiCategoria();
  const { setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);

  // Manejar la selección de una imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Eliminar la imagen antes de subirla
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (values: any) => {
    // Combinar imágenes y valores del formulario
    const formData = new FormData();

    // Agregar los valores del formulario
    for (const key in values) {
      formData.append(key, values[key]);
    }

    if (file) {
      const extension = file.name.split(".").pop(); // Obtener extensión del archivo
      const nombreCorregido = values.nombre.replace(/ /g, "_"); // Reemplazar espacios por guiones bajos
      const nuevoNombre = `${nombreCorregido}_idUser_${apiData.id}.${extension}`; // Nuevo nombre

      // Crear un nuevo archivo con el nombre cambiado
      const renamedFile = new File([file], nuevoNombre, { type: file.type });

      // Guardamos el nombre en un array
      formData.append("mainImage", nuevoNombre);
      formData.append("file", renamedFile);
    }
    //Enviar datos al servidor
    try {
      const response = await saveCategoria(formData);
      if (response.id) {
        cargarDatos();
        setMensajeSnack("Se ingresa valor correctamente");
        setAlertSnack("success");
        setOpenSnack(true);
        setOpenModal(false);
      } else {
        setMensajeSnack("Error al actualizar");
        setAlertSnack("error");
        setOpenSnack(true);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
      // Obtener la respuesta de la API de las cookies
      const cookieData = getCookie("user");
      if (cookieData) {
        // Convertir la cadena JSON en un objeto
        const parsedData = JSON.parse(cookieData);
        setApiData(parsedData);
      }
    }, []);

  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography variant="h5" component="h2" textAlign={"center"} color={colores.AntiFlashWhite}>
          Agregar Categoria
        </Typography>
        <div style={{ marginTop: preview ? "4%" : "-7%" }}>
          <Formik
            initialValues={InitialValues(formJson)}
            validationSchema={Validation(formJson)}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values, touched, errors, handleChange }) => (
              <Form noValidate>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 6, md: 6 }}>
                    {preview && (
                      <Cards
                        actions={true}
                        cardMedia={true}
                        cardContent={false}
                        image={preview}
                        tituloImagen="Preview"
                        children2={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "100%",
                            }}
                          >
                            <IconButton
                              onClick={handleRemoveImage}
                              sx={{ color: colores.Jasper }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                        sxCardMedia={{ height: 120 }}
                        sxCardActions={{
                          backgroundColor: colores.PennBlue,
                        }}
                      ></Cards>
                    )}
                    <div style={{ textAlign: "center", marginTop: preview ? "5%" : "30%"}}>
                      {/* Input de archivo oculto */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="file-input"
                      />
                      <label htmlFor="file-input">
                        <Button variant="contained" component="span">
                          Seleccionar Imagen
                        </Button>
                      </label>
                    </div>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 6 }}>
                    <div style={{ marginTop:"40px" }}>
                      {cargarInputGrid({
                        values,
                        touched,
                        errors,
                        handleChange,
                        column,
                        formJson,
                      })}
                    </div>
                  </Grid2>
                </Grid2>

                <div style={{ textAlign: "center" }}>
                  {/* Botón para subir imágenes */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    type="submit"
                  >
                    Cargar categoría
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modals>
    </>
  );
};
