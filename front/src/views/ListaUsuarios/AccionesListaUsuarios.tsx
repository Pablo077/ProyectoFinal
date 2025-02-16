import { useState } from "react";
import { userList } from "../../service/Users/apiUsers"
import { ModalEditarUsuarios } from "./ModalEditarUsuarios";
import { colores } from "../../styles/colors";

interface Props {
    user: userList;
}

export const AccionesListaUsuarios = (props: Props) => {
    const { user } = props;
    const [openModalEditar, setOpenModalEditar] = useState(false);

    const handleClickEditar = () => {
        setOpenModalEditar(true);
    }

    return (
        <>
            <ModalEditarUsuarios openModal={openModalEditar} setOpenModal={setOpenModalEditar} user={user} />
            <div style={{ display: "flex", textAlign: "center" }}>
                <h3 style={{ cursor: "pointer", color: colores.Jasper }} onClick={handleClickEditar}>Editar rol</h3>
            </div>
        </>
    )
}
