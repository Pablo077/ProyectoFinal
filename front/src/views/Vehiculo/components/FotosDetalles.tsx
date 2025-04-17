import { useState, useContext, useEffect } from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { linkFotosArchivos } from "../../../utils/utils";
import { coloresDesignados } from "../../../styles/colors";
import { DetalleVehiculo } from "../../../components/DetalleVehiculo";

export const FotosDetalles = () => {
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
    navigate(-1);
  };

  // Cargar las imágenes al montar el componente
  useEffect(() => {
    if (vehiculo?.filesName) {
      try {
        const parsedFiles = JSON.parse(vehiculo.filesName);
        if (
          Array.isArray(parsedFiles?.images) &&
          parsedFiles.images.length > 0
        ) {
          setArchivos(parsedFiles.images);
          setImagenSeleccionada(cargarImagen(parsedFiles.images[0]));
        }
      } catch (error) {
        console.error("Error al parsear filesName:", error);
      }
    }
  }, [vehiculo]);

  return (
    <div>
      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
          <Typography variant="h4" component="h1">
            {`${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.motor} Lts`}
          </Typography>
        </div>
        <div style={{ marginTop: "16px", cursor: "pointer" }} onClick={back}>
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
                <Grid size={{ xs: 3 }} key={index}>
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
          <DetalleVehiculo titulo="Caja:" detalle={vehiculo && vehiculo.caja.tipo}/>
          <DetalleVehiculo titulo="Dirección:" detalle={vehiculo && vehiculo.direccion.tipo}/>
          <DetalleVehiculo titulo="Categoría:" detalle={vehiculo && vehiculo.categoria.nombre}/>
          <DetalleVehiculo titulo="Pasajeros:" detalle={vehiculo && vehiculo.pasajeros}/>
          <DetalleVehiculo titulo="Valijas chicas:" detalle={vehiculo && vehiculo.valijasChicas}/>
          <DetalleVehiculo titulo="Valijas grandes:" detalle={vehiculo && vehiculo.valijasGrandes}/>
        </div>
      </div>
    </div>
  );
};
