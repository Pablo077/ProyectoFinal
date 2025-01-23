import { useState } from "react";
import { useFormik } from "formik";
import { coloresDesignados } from "../../styles/colors";
import * as Yup from "yup";
import { Button, Card, CardMedia, CardActions, IconButton, Grid, Badge } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";


export const IngresarProductosViews = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

  // Manejar la selección de múltiples imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles]; // Agregar nuevas imágenes
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file)); // Crear nuevas vistas previas

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Eliminar una imagen antes de subirla
  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);

    // Si eliminamos la imagen principal, resetear el estado
    if (mainImageIndex === index) {
      setMainImageIndex(null);
    } else if (mainImageIndex !== null && index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  // Marcar imagen como principal
  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
  };



  const formik = useFormik({
    initialValues: {
      nombre: "",

    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      detalle: Yup.string()
        .required("La observación es requerido")
        .max(255, "La observación debe tener menos de 200 caracteres"),
    }),
    onSubmit: async (values: any) => {
      if (files.length === 0) {
        alert("No hay imágenes para subir.");
        return;
      }

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append("files", file);
        if (index === mainImageIndex) {
          formData.append("mainImage", file.name); // Enviar nombre de la imagen principal
        }
      });

      try {
        /*  
        const response = await axios.post("/api/images/upload-multiple", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });*/

        alert("Imágenes subidas correctamente.");
        setFiles([]);
        setPreviews([]);
        setMainImageIndex(null);
      } catch (error) {
        console.error("Error al subir imágenes:", error);
        alert("Error al subir imágenes.");
      }
    },
  });


  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <div style={{ textAlign: "center", color: coloresDesignados.Letra }}>
        <h1>Agregar un producto</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>

        <div style={{ textAlign: "center", padding: 20 }}>
          {/* Input de archivo oculto */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Seleccionar Imágenes
            </Button>
          </label>

          {/* Vista previa de imágenes seleccionadas */}
          {previews.length > 0 && (
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              {previews.map((src, index) => (
                <Grid item key={index}>
                  <Badge
                    badgeContent={
                      mainImageIndex === index ? (
                        <StarIcon sx={{ color: "gold", fontSize: 24 }} />
                      ) : null
                    }
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Card sx={{ maxWidth: 150, position: "relative" }}>
                      <CardMedia component="img" height="100" image={src} alt={`Preview ${index}`} />
                      <CardActions sx={{ justifyContent: "center" }}>
                        {/* Botón para marcar como imagen principal */}
                        <IconButton
                          onClick={() => handleSetMainImage(index)}
                          color={mainImageIndex === index ? "primary" : "default"}
                        >
                          {mainImageIndex === index ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>

                        {/* Botón para eliminar la imagen */}
                        <IconButton onClick={() => handleRemoveImage(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Badge>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Botón para subir imágenes */}
          {files.length > 0 && (
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Subir Imágenes
            </Button>
          )}
        </div>



      </form>
    </div>
  )
}
