import { Footer } from "../views/Home/Footer";
import { Navbar } from "../views/Home/Navbar";
import { SnackMensaje } from "../components/SnackMensaje";
import { VehiculoView } from "../views/Vehiculo/VehiculoView";

export const VehiculoPage = () => {
  return (
    <div>
      <Navbar />
      <SnackMensaje />
      <div style={{marginTop:"60px"}}>
        <VehiculoView />
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
};
