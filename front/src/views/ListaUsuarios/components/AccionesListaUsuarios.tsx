import { useState } from "react";
import { userList } from "../../../service/Users/apiUsers";
import { colores } from "../../../styles/colors";
import { ModalEditarUsuarios } from "./ModalEditarUsuarios";

interface Props {
  user: userList;
  cargarDatos: () => Promise<void>;
}

export const AccionesListaUsuarios = (props: Props) => {
  const { user, cargarDatos } = props;
  const [openModalEditar, setOpenModalEditar] = useState(false);

  const handleClickEditar = () => {
    setOpenModalEditar(true);
  };

  return (
    <>
      <ModalEditarUsuarios
        openModal={openModalEditar}
        setOpenModal={setOpenModalEditar}
        user={user}
        cargarDatos={cargarDatos}
      />
      <div style={{ display: "flex", textAlign: "center" }}>
        <h3
          style={{ cursor: "pointer", color: colores.Jasper }}
          onClick={handleClickEditar}
        >
          Editar rol
        </h3>
      </div>
    </>
  );
};
