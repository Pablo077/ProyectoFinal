import { useState } from "react";
import { colores } from "../../../styles/colors"
import { ModalEliminarFavoritos } from "./ModalEliminarFavoritos";

interface Props {
    favorito: any;
    user: any;
    cargarFavorito: (user: any) => Promise<void>
}

export const AccionesListaFavoritos = (props: Props) => {
    const { favorito, user, cargarFavorito } = props;
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
    const handleClickEliminar = () => {
        setOpenModalEliminar(true);
    }
    return (
        <>
            <ModalEliminarFavoritos openModal={openModalEliminar} setOpenModal={setOpenModalEliminar} favorito={favorito} user={user} cargarFavorito={cargarFavorito} />
            <div style={{ display: "flex", textAlign: "center" }}>
                <h5 style={{ cursor: "pointer", color: colores.Jasper, margin: "5px 5px 5px 30px" }} onClick={handleClickEliminar}>ELIMINAR</h5>
            </div>
        </>
    )
}
