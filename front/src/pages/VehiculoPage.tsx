import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { SnackMensaje } from "../components/SnackMensaje";
import { VehiculoView } from "../views/Vehiculo/VehiculoView";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../context/VehiculoContext";

export const VehiculoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { setVehiculo, vehiculos, cargarVehiculos, vehiculo } = useContext(VehiculoContext);
  const [vehiculoFind, setVehiculoFind] = useState<any>(null); // Cambia el tipo según tu modelo de datos


  const cargarPagina = () =>{
    // Convertir vehiculoId a número
    // const vehiculoId = Number(location.pathname.split("/").pop());
    const vehiculoId = Number(queryParams.get("vehiculoId"));
    // Buscar el vehículo por ID
    const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === vehiculoId);
    setVehiculoFind(vehiculos.find((vehiculo) => vehiculo.id === vehiculoId));
  }



  useEffect(() => {
    // Asegurarse de que la página esté bien arriba
    window.scrollTo(0, 0);
    cargarPagina();
  }, []);

  useEffect(() => {
    // Asegurarse de que la página esté bien arriba
    window.scrollTo(0, 0);

    // if (!vehiculo) {
    //   cargarVehiculos();
    //   return <>no esta</>;
    // }
  
    setVehiculo(vehiculoFind);
  }, [vehiculoFind]);

console.log(vehiculo)
  return (
    <div>
      <Navbar />
      <SnackMensaje />
      <div style={{ marginTop: "60px" }}>
        {
          vehiculo &&
        <VehiculoView />
        }
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
};
