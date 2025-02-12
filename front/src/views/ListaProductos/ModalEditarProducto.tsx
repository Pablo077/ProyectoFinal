import React, { useState } from 'react'
import { Vehiculo } from '../../service/Vehiculo/apiVehiculo';
import { useSnack } from '../../hook/useSnack';
import { Modals } from '../../components/Modals';
import { Typography } from '@mui/material';
import { colores } from '../../styles/colors';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    vehiculo: Vehiculo;
}

export const ModalEditarProducto = (props:Props) => {
    const { openModal, setOpenModal, vehiculo } = props;
    const { SnackStatus } = useSnack();
    const [openSnack, setOpenSnack] = useState(false);
    const [alertSnack, setAlertSnack] = useState<
        "success" | "error" | "info" | "warning"
    >("success");
    const [mensajeSnack, setMensajeSnack] = useState("");
    return (
        <>
            <SnackStatus
                mensaje={mensajeSnack}
                open={openSnack}
                setOpen={setOpenSnack}
                tipoAlert={alertSnack}
            />

            <Modals open={openModal} setOpen={setOpenModal}>
                <Typography textAlign={"center"} color={colores.AntiFlashWhite}>
                    Editar Vehículo
                </Typography>

            </Modals>
        </>
    )
}
