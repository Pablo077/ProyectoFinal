import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { coloresDesignados } from "../../styles/colors";
import { SubirImagenes } from "./components/SubirImagenes";
import { Button } from "@mui/material";
import { Inputs } from "./components/Inputs";

export const IngresarProductosViews = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    // detalle: Yup.string()
    //   .required("La observación es requerida")
    //   .max(255, "La observación debe tener menos de 200 caracteres"),
  });



  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
        <h1>Agregar un producto</h1>
      </div>

      <Formik
        initialValues={{ nombre: "", detalle: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Valores a enviar:", values);
        }}
      >
        {({ values, touched, errors, handleChange, handleSubmit  }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Inputs
              errors={errors}
              touched={touched}
              value={values}
              onChange={handleChange}
            />

            <SubirImagenes
              files={files}
              setFiles={setFiles}
              mainImageIndex={mainImageIndex}
              previews={previews}
              setMainImageIndex={setMainImageIndex}
              setPreviews={setPreviews}
            />

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
  );
};
