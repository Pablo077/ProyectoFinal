import { useContext } from 'react'
import { useSnack } from '../hook/useSnack';
import { VehiculoContext } from '../context/VehiculoContext';

export const SnackMensaje = () => {
    const { mensajeSnack, openSnack, setOpenSnack, alertSnack } = useContext(VehiculoContext)
    const { SnackStatus } = useSnack();
    return (
        <>
            <SnackStatus
                mensaje={mensajeSnack}
                open={openSnack}
                setOpen={setOpenSnack}
                tipoAlert={alertSnack}
            />
        </>
    )
}
