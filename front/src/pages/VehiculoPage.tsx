import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { SnackMensaje } from "../components/SnackMensaje";
import { VehiculoView } from "../views/Vehiculo/VehiculoView";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { VehiculoContext } from "../context/VehiculoContext";

export const VehiculoPage = () => {
  const location = useLocation();
  const { setVehiculo, vehiculos, cargarVehiculos } = useContext(VehiculoContext);

  // Convertir vehiculoId a número
  const vehiculoId = Number(location.pathname.split("/").pop());

  // Buscar el vehículo por ID
  const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === vehiculoId);

  if (!vehiculo) {
    cargarVehiculos();
    return <div>Vehículo no encontrado</div>;
  }

  setVehiculo(vehiculo);

  return (
    <div>
      <Navbar />
      <SnackMensaje />
      <div style={{ marginTop: "60px" }}>
        <VehiculoView />
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
};
