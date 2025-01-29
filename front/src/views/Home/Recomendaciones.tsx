import { useEffect, useState } from "react";
import { apiVehiculo, Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiBagSuitcase, mdiBagChecked, mdiCarShiftPattern, mdiSteering  } from "@mdi/js";
import { CajaDireccion } from "../../components/CajaDireccion";

export const Recomendaciones = () => {
  const { getVehiculos } = apiVehiculo();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  const cargarVehiculos = async () => {
    const result = await getVehiculos();
    console.log(result);
    setVehiculos(result);
  };

  const cargarURL = (marca: string, modelo: string, principal: string) => {
    let marca2 = marca.replace(/ /g, "_");
    let modelo2 = modelo.replace(/ /g, "_");
    let dato = `${marca2}_${modelo2}/${principal}`;

    console.log(dato);

    return `http://localhost:8080/fotos/${dato}`;
  };

  const handleClick = () => {
    //window.location.href = "/Vehiculo";
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
              <a href="/Vehiculo" onClick={handleClick}>
                <Card>
                  <CardMedia
                    component="img"
                    height="180"
                    onClick={handleClick}
                    image={cargarURL(
                      vehiculo.marca,
                      vehiculo.modelo,
                      vehiculo.mainImage
                    )}
                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  />
                </Card>
              </a>
              <div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{ margin: "0px", textAlign: "center", fontSize: "16px" }}
                  >{`${vehiculo.marca} ${vehiculo.modelo} - ${vehiculo.motor} Lts`}</p>
                </div>

                <div style={{ display:"flex", justifyContent: "center", margin:"0px", padding:"0px" }}>
                  <CajaDireccion texto={vehiculo.pasajeros.toString()} path={mdiAccountMultiple} size={0.6} />
                  <CajaDireccion texto={vehiculo.valijasGrandes.toString()} path={mdiBagSuitcase} size={0.6} />
                  <CajaDireccion texto={vehiculo.valijasChicas.toString()} path={mdiBagChecked} size={0.6} />
                </div>

                <div style={{ display:"flex", justifyContent: "center", margin:"0px", padding:"0px" }}>
                  <CajaDireccion texto={vehiculo.caja.tipo} path={mdiCarShiftPattern} size={0.6} />
                  <CajaDireccion texto={vehiculo.direccion.tipo} path={mdiSteering} size={0.6} />
                </div>

              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
