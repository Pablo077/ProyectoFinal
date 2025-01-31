import { useEffect, useContext } from "react";
import { apiVehiculo, Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  mdiAccountMultiple,
  mdiBagSuitcase,
  mdiBagChecked,
  mdiCarShiftPattern,
  mdiSteering,
} from "@mdi/js";
import { CajaDireccion } from "../../components/CajaDireccion";
import { VehiculoContext } from "../../context/VehiculoContext";
import { useNavigate } from "react-router-dom";
import { linkFotosArchivos } from "../../utils/utils";

export const Recomendaciones = () => {
  const { getVehiculos } = apiVehiculo();
  const { setVehiculo, vehiculos, setVehiculos } = useContext(VehiculoContext);
  const navigate = useNavigate();

  const cargarVehiculos = async () => {
    const result = await getVehiculos();
    setVehiculos(result);
  };

  const handleClick = (vehiculo: Vehiculo) => {
    setVehiculo(vehiculo);
    navigate("/Vehiculo");
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <>
      <div>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {vehiculos.slice(0, 10).map((vehiculo) => (
            <Grid columns={{ xs: 6, sm: 4, md: 2 }} key={vehiculo.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  onClick={() => handleClick(vehiculo)}
                  image={linkFotosArchivos(
                    vehiculo.marca,
                    vehiculo.modelo,
                    vehiculo.mainImage
                  )}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                />
              </Card>
              <div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      margin: "0px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >{`${vehiculo.marca} ${vehiculo.modelo} - ${vehiculo.motor} Lts`}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <CajaDireccion
                    texto={vehiculo.pasajeros.toString()}
                    path={mdiAccountMultiple}
                    size={0.6}
                  />
                  <CajaDireccion
                    texto={vehiculo.valijasGrandes.toString()}
                    path={mdiBagSuitcase}
                    size={0.6}
                  />
                  <CajaDireccion
                    texto={vehiculo.valijasChicas.toString()}
                    path={mdiBagChecked}
                    size={0.6}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <CajaDireccion
                    texto={vehiculo.caja.tipo}
                    path={mdiCarShiftPattern}
                    size={0.6}
                  />
                  <CajaDireccion
                    texto={vehiculo.direccion.tipo}
                    path={mdiSteering}
                    size={0.6}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
