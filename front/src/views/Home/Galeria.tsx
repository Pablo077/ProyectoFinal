import { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { VehiculoContext } from "../../context/VehiculoContext";
import { linkFotosArchivos } from "../../utils/utils";
import Grid from "@mui/material/Grid2"; // Import Grid2
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { useNavigate } from "react-router-dom";

export const Galeria = () => {
  const { vehiculos, setVehiculo } = useContext(VehiculoContext);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (vehiculos?.length > 0 && vehiculos[0]?.filesName) {
      try {
        const parsedData = JSON.parse(vehiculos[0].filesName);
        setImagenes(Array.isArray(parsedData.images) ? parsedData.images : []);
      } catch (error) {
        console.error("Error al parsear JSON de imágenes:", error);
        setImagenes([]);
      }
    }
  }, [vehiculos]);

  if (!vehiculos || vehiculos.length === 0) {
    return <Typography>No hay imágenes disponibles</Typography>;
  }

  const handleClick = (vehiculo: Vehiculo) => {
      setVehiculo(vehiculo);
      navigate("/Vehiculo");
    };
  
    const { marca, modelo, mainImage } = vehiculos[0];
  return (
    <div>
      <div>
        <Box width="100%" display="flex" flexDirection="column">
          {/* Galería Principal */}
          <Grid container spacing={1}>
            {/* Imagen Principal */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }}>
              <Box
                component="img"
                src={linkFotosArchivos(marca, modelo, mainImage)}
                alt="Imagen Principal"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            </Grid>

            {/* Contenedor de imágenes secundarias */}
            <Grid
              size={{ xs: 12, md: 6 }}
              container
              spacing={1}
              sx={{ height: "100%" }}
            >
              {imagenes.slice(0, 4).map((img, index) => (
                <Grid size={{ xs: 6 }} key={index} sx={{ height: "50%" }}>
                  <Box
                    component="img"
                    src={linkFotosArchivos(marca, modelo, img)}
                    alt={`Imagen ${index + 1}`}
                    sx={{
                      width: "99%",
                      height: "99%",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        {/* Ver más */}
        <Typography
          onClick={() => handleClick(vehiculos[0])}
          sx={{
            cursor: "pointer",
            color: "white",
            textAlign:"right",
            marginTop:"-40px",
            p: 1,
            borderRadius: 1,
          }}
        >
          Ver más
        </Typography>
      </div>
    </div>
  );
};
