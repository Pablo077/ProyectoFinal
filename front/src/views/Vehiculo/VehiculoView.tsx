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
  const [imagenSeleccionada, setImagenSeleccionada] = useState(archivos[0]);
  const { vehiculo } = useContext(VehiculoContext);
  const navigate = useNavigate();

  const cargarImagen = (archivo: string) => {
    const url = `${linkFotosArchivos(
      vehiculo.marca,
      vehiculo.modelo,
      archivo
    )}`;
    console.log(url);
    return url;
  };

  const back = () =>{
    navigate("/");
  }

  useEffect(() => {
    if (vehiculo?.filesName) {
      try {
        const parsedFiles = JSON.parse(vehiculo.filesName);
        if (parsedFiles?.images?.length) {
          setArchivos(parsedFiles.images);
          setImagenSeleccionada(cargarImagen(parsedFiles.images[0]));
        }
      } catch (error) {
        console.error("Error al parsear filesName:", error);
      }
    }
  }, [vehiculo]);

  const Style: React.CSSProperties = {
    margin: "1px",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>{`${vehiculo.marca}${vehiculo.modelo}${vehiculo.motor} Lts`}</h1>
        </div>

        <div style={{marginTop: "10px", cursor: "pointer"}} onClick={()=>back()}>
          <Icon path={mdiArrowLeftCircle} size={3} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          

          <Card sx={{ width: 400, height: 250 }}>
            <CardMedia
              component="img"
              height="100%"
              image={imagenSeleccionada}
              alt="Imagen del vehículo"
            />
          </Card>
          

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
                <Grid columns={{ xs: 3 }} key={index}>
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
        <div style={{ marginLeft: "20px", marginBottom: "80px" }}>
          <h2 style={Style}>{`Caja: ${vehiculo.caja.tipo}`}</h2>
          <h2 style={Style}>{`Dirección: ${vehiculo.direccion.tipo}`}</h2>
          <h2 style={Style}>{`Pasajeros: ${vehiculo.pasajeros}`}</h2>
          <h2 style={Style}>{`Valijas chicas: ${vehiculo.valijasChicas}`}</h2>
          <h2 style={Style}>{`Valijas grandes: ${vehiculo.valijasGrandes}`}</h2>
        </div>
      </div>
    </div>
  );
};
