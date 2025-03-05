import { useState } from "react"
import { ModalCaracteristicas } from "./ModalCaracteristicas";
import { colores } from "../../../styles/colors";
import { Vehiculo } from "../../../service/Vehiculo/apiVehiculo";


interface Props {
    vehiculo: Vehiculo;
}

export const AccionesListaProductos = (props: Props) => {
    const { vehiculo } = props;
    const [openModalCarac, setOpenModalCarac] = useState(false);

    const handleClickEditar = () => {
        setOpenModalCarac(true);
    };

    return (
        <>
            <ModalCaracteristicas openModal={openModalCarac} setOpenModal={setOpenModalCarac} vehiculo={vehiculo}/>
            <div style={{ display: "flex", textAlign: "center" }}>
                <h3
                    style={{ cursor: "pointer", color: colores.Jasper, margin: "0px" }}
                    onClick={handleClickEditar}
                >
                    Caracteristicas
                </h3>
            </div>
        </>
    )
}
