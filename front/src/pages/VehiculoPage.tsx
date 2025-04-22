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
  const { setVehiculo, vehiculos, cargarVehiculos } =
    useContext(VehiculoContext);
  const [vehiculoFind, setVehiculoFind] = useState<any>(null);
  const [mostrar, setMostrar] = useState(false);

  const cargarPagina = async () => {
    const vehiculoId = Number(queryParams.get("vehiculoId"));
    if (vehiculos.length > 0) {
      const vehiculo = vehiculos.find((v) => v.id === vehiculoId);
      if (vehiculo) {
        setVehiculoFind(vehiculo);
      }
    }
  };
  
  const cargaDeVehiculos = async () => {
    await cargarVehiculos();
  }

  useEffect(() => {
    if (vehiculoFind !== null) {
      setVehiculo(vehiculoFind);
      setMostrar(true);
    }
  }, [vehiculoFind]);
  

  useEffect(() => {
    cargarPagina();
  }, [vehiculos]);


  useEffect(() => {
    window.scrollTo(0, 0);
    cargaDeVehiculos();
  }, []);

  
  return (
    <div>
      <Navbar />
      <SnackMensaje />
      <div style={{ marginTop: "60px" }}>
        {mostrar ? (
          <VehiculoView />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1 style={{ fontSize: "30px", color: "#000" }}>Cargando...</h1>
          </div>
        )}
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
};
