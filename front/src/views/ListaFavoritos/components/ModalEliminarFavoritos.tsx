import { Typography } from "@mui/material";
import { Modals } from "../../../components/Modals"
import { colores } from "../../../styles/colors";
import { Buttons } from "../../../components/Buttons";
import { useContext } from "react";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { apiFavorito } from "../../../service/Favorito/apiFavorito";


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    favorito: any;
    user: any;
    cargarFavorito: (user: any) => Promise<void>
}


export const ModalEliminarFavoritos = (props: Props) => {
    const { openModal, setOpenModal, favorito, user, cargarFavorito } = props;
    const { setOpenSnack, setMensajeSnack, setAlertSnack } = useContext(VehiculoContext);
    const { deleteFavorito } = apiFavorito();

    const handleOk = async (favorito: any) => {
        try {
            const response = await deleteFavorito(favorito.id);
            if (response === "Borrado exitoso") {
                setMensajeSnack("Eliminaste el vehiculo de favoritos");
                setAlertSnack("info");
                setOpenSnack(true);
                cargarFavorito(user);
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };



    return (
        <>
            <Modals open={openModal} setOpen={setOpenModal}>
                <Typography textAlign={"center"} color={colores.Jasper}>
                    Desea eliminar el siguiente vehículo
                </Typography>
                <Typography marginTop={"10px"}>Marca: {favorito.vehiculo?.marca}</Typography>
                <Typography>Modelo: {favorito.vehiculo?.modelo}</Typography>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <Buttons
                        variant="contained"
                        styles={{
                            backgroundColor: colores.Jasper,
                            color: colores.AntiFlashWhite,
                        }}
                        text="Confirmar"
                        onClick={() => handleOk(favorito)}
                    />
                    <Buttons
                        variant="contained"
                        styles={{
                            backgroundColor: colores.CornflowerBlue,
                            color: colores.PennBlue,
                            marginLeft: "10px",
                        }}
                        text="Cancelar"
                        onClick={handleClose}
                    />
                </div>
            </Modals>


        </>
    )
}
