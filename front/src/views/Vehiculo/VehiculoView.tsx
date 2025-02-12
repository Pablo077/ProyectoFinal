import { useState, useContext, useEffect } from "react";
import { Card, CardMedia, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { VehiculoContext } from "../../context/VehiculoContext";
import { linkFotosArchivos } from "../../utils/utils";
import { coloresDesignados } from "../../styles/colors";

export const VehiculoView = () => {
  const [archivos, setArchivos] = useState<string[]>([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>("");
  const { vehiculo } = useContext(VehiculoContext);
  const navigate = useNavigate();

  // Cargar la URL de la imagen
  const cargarImagen = (archivo: string) => {
    return linkFotosArchivos(vehiculo.marca, vehiculo.modelo, archivo);
  };

  // Navegar hacia atrás
  const back = () => {
    navigate("/");
  };

  // Cargar las imágenes al montar el componente
  useEffect(() => {
    if (vehiculo?.filesName) {
      try {
        const parsedFiles = JSON.parse(vehiculo.filesName);
        if (Array.isArray(parsedFiles?.images) && parsedFiles.images.length > 0) {
          setArchivos(parsedFiles.images);
          setImagenSeleccionada(cargarImagen(parsedFiles.images[0]));
        }
      } catch (error) {
        console.error("Error al parsear filesName:", error);
      }
    }
  }, [vehiculo]);

  // Estilos
  const style: React.CSSProperties = {
    margin: "1px",
  };

  return (
    <div>
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>{`${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.motor} Lts`}</h1>
        </div>
        <div style={{ marginTop: "10px", cursor: "pointer" }} onClick={back}>
          <Icon path={mdiArrowLeftCircle} size={3} />
        </div>
      </div>

      {/* Contenido Principal */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          flexWrap: "wrap", 
        }}
      >
        {/* Galería de Imágenes */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          {/* Imagen Principal */}
          <Card sx={{ width: 400, height: 250 }}>
            <CardMedia
              component="img"
              height="100%"
              image={imagenSeleccionada}
              alt="Imagen del vehículo"
              sx={{ objectFit: "cover" }}
            />
          </Card>

          {/* Miniaturas de Imágenes */}
          <Card
            sx={{
              width: 400,
              p: 1,
              backgroundColor: coloresDesignados.Fondo,
              border: "none",
            }}
          >
            <Grid
              container
              spacing={1}
              justifyContent="center"
              sx={{ backgroundColor: coloresDesignados.Fondo, border: "none" }}
            >
              {archivos.map((img, index) => (
                <Grid size={{ xs:3 }}  key={index}>
                  <CardMedia
                    component="img"
                    height="60"
                    image={cargarImagen(img)}
                    alt={`Imagen ${index + 1}`}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "5px",
                      "&:hover": { opacity: 0.7 },
                    }}
                    onClick={() => setImagenSeleccionada(cargarImagen(img))}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>

        {/* Detalles del Vehículo */}
        <div style={{ marginLeft: "20px", marginBottom: "80px" }}>
          <h2 style={style}>{`Caja: ${vehiculo.caja.tipo}`}</h2>
          <h2 style={style}>{`Dirección: ${vehiculo.direccion.tipo}`}</h2>
          <h2 style={style}>{`Categoría: ${vehiculo.categoria.nombre}`}</h2>
          <h2 style={style}>{`Pasajeros: ${vehiculo.pasajeros}`}</h2>
          <h2 style={style}>{`Valijas chicas: ${vehiculo.valijasChicas}`}</h2>
          <h2 style={style}>{`Valijas grandes: ${vehiculo.valijasGrandes}`}</h2>
        </div>
      </div>
    </div>
  );
};