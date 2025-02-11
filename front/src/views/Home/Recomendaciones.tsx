import { useEffect, useContext } from "react";
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";
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
  const { setVehiculo, vehiculos, cargarVehiculos } = useContext(VehiculoContext);
  const navigate = useNavigate();

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
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          {
            vehiculos ?
          vehiculos.slice(0, 10).map((vehiculo) => (
            <Grid columns={{ xs: 5, sm: 5, md: 2 }} key={vehiculo?.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                <CardMedia
                  component="img"
                  height="190"
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


                <div style={{ textAlign: "center", width: "100%" }}>
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "16px",
                      textAlign: "center",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "100%", 
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
          )):
          <></>
          }
        </Grid>
      </div>
    </>
  );
};
