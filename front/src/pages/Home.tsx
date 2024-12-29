import { Navbar } from "../views/Home/Navbar";
import { Buscador } from "../views/Home/Buscador";
import { Categorias } from "../views/Home/Categorias";
import { Recomendaciones } from "../views/Home/Recomendaciones";
import { Footer } from "../views/Home/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "80px", height:"800px" }}>
        <Buscador />
        <Categorias />
        <Recomendaciones />
      </div>
      <Footer />
    </div>
  );
};
