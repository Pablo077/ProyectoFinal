import { useState } from "react";
import { Vehiculo } from "../../../service/Vehiculo/apiVehiculo";
import { colores } from "../../../styles/colors";
import { ModalProducto } from "./ModalProducto";
import { ModalEditarProducto } from "./ModalEditarProducto";


interface Props {
  vehiculo: Vehiculo;
}

export const AccionesListaProductos = (props: Props) => {
  const { vehiculo } = props;
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);


  const handleClickEliminar = () => {
    setOpenModalEliminar(true);
  }

  const handleClickEditar = () =>{
    setOpenModalEditar(true);
  }

  return (
    <>
      <ModalProducto openModal={openModalEliminar} setOpenModal={setOpenModalEliminar} vehiculo={vehiculo} />
      <ModalEditarProducto openModal={openModalEditar} setOpenModal={setOpenModalEditar} vehiculo={vehiculo}/>
      <div style={{ display: "flex", textAlign:"center" }}>
        <h5 style={{ cursor: "pointer", color: colores.Jasper, margin:"5px" }} onClick={handleClickEditar}>Editar producto</h5>
        <h5 style={{ cursor: "pointer", color: colores.Jasper, margin: "5px 5px 5px 30px" }} onClick={handleClickEliminar}>Eliminar producto</h5>
      </div>
    </>
  );
};
