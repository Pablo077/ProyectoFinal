import { Buttons } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";

export const MenuBotones = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ListaProductos");
  };

  return (
    <>
      <Buttons
        text="Lista de productos"
        variant="contained"
        styles={{}}
        onClick={handleClick}
      />
    </>
  );
};
