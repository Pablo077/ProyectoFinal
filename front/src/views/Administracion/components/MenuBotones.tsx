import { Buttons } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";

export const MenuBotones = () => {
  const navigate = useNavigate();

  const handleClickProductos = () => {
    navigate("/ListaProductos");
  };

  const handleClickUsuarios = () => {
    navigate("/ListaUsuarios");
  };

  const handleClickCaracteristicas = () =>{
    navigate("/Caracteristicas");
  }

  return (
    <>
      <Buttons
        text="Lista de usuarios"
        variant="contained"
        styles={{marginRight:"10px"}}
        onClick={handleClickUsuarios}
      />
      <Buttons
        text="Lista de productos"
        variant="contained"
        styles={{marginRight:"10px"}}
        onClick={handleClickProductos}
      />
      <Buttons
        text="Administrar características"
        variant="contained"
        styles={{marginRight:"10px"}}
        onClick={handleClickCaracteristicas}
      />
    </>
  );
};
