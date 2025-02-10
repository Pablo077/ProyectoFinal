import { useState } from "react";
import { Vehiculo } from "../../service/Vehiculo/apiVehiculo";
import { ModalProducto } from "./ModalProducto";
import { colores } from "../../styles/colors";

interface Props {
  vehiculo: Vehiculo;
}

export const AccionesListaProductos = (props: Props) => {
  const { vehiculo } = props;
  const [openModal, setOpenModal] = useState(false);


const handleClick = () =>{
  setOpenModal(true);
}

  return (
    <>
      <ModalProducto openModal={openModal} setOpenModal={setOpenModal} vehiculo={vehiculo} />
      <h5 style={{cursor:"pointer", color:colores.Jasper}} onClick={handleClick}>Eliminar producto</h5>
    </>
  );
};
