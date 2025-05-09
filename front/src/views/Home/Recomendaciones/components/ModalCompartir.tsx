import { Typography, SxProps, Theme } from "@mui/material";
import { Modals } from "../../../../components/Modals";
import { colores } from "../../../../styles/colors";
import { Cards } from "../../../../components/Cards";
import { linkFotosArchivos } from "../../../../utils/utils";
import IconButton from "@mui/material/IconButton";
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';
import { useContext, useState } from "react";
import { DynamicForm } from "../../../../components/Formik/DynamicForm";
import { formJson } from "./DataInputs";
import { VehiculoContext } from "../../../../context/VehiculoContext";


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    vehiculo: any;
}

const sxCard: SxProps<Theme> = {
    backgroundColor: colores.CornflowerBlue,
    margin: "8px",
};

const sxCardMedia: SxProps<Theme> = {
    height: 300,
};



export const ModalCompartir = (props: Props) => {
    const { openModal, setOpenModal, vehiculo } = props;
    const [redSelect, setRedSelect] = useState<string>("");
    const { setOpenSnack, setMensajeSnack, setAlertSnack } =
            useContext(VehiculoContext);

    const handleRedSelect = (red: string) => {
        setRedSelect(red);
    }

    const onSubmit = async (values: any) => {

        setMensajeSnack("Su mensaje se compartira en redes sociales");
        setAlertSnack("info");
        setOpenSnack(true);
        setOpenModal(false);
        
    };

    const Redes = () => {
        return (
            <span >
                <IconButton aria-label="add to favorites" onClick={() => handleRedSelect("facebook")}>
                    <Icon path={mdiFacebook} size={1.5} color={redSelect === "facebook" ? colores.Saffron : "inherit"} />
                </IconButton>

                <IconButton aria-label="add to favorites" onClick={() => handleRedSelect("twitter")}>
                    <Icon path={mdiTwitter} size={1.5} color={redSelect === "twitter" ? colores.Saffron : "inherit"} />
                </IconButton>

                <IconButton aria-label="add to favorites" onClick={() => handleRedSelect("instagram")}>
                    <Icon path={mdiInstagram} size={1.5} color={redSelect === "instagram" ? colores.Saffron : "inherit"} />
                </IconButton>

            </span>
        )
    }


    return (
        <>
            <Modals open={openModal} setOpen={setOpenModal}>
                <Typography textAlign={"center"} color={colores.AntiFlashWhite}>
                    Compartir vehículo
                </Typography>
                <Cards
                    actions={true}
                    sxCard={sxCard}
                    cardMedia={true}
                    cardContent={true}
                    image={vehiculo && linkFotosArchivos(
                        vehiculo?.marca,
                        vehiculo?.modelo,
                        vehiculo?.mainImage
                    )}
                    tituloImagen={vehiculo && vehiculo?.modelo}
                    sxCardMedia={sxCardMedia}
                    sxBox={{ minWidth: 400 }}
                    children2={<Redes />}
                >
                    <Typography component="div" variant="h5">{vehiculo?.marca}</Typography>
                    <Typography variant="body1">
                        {vehiculo?.modelo} con capacidad para {vehiculo?.pasajeros} pasajeros
                    </Typography>
                    <Typography variant="body1">
                        http://localhost:5173/Vehiculo/?vehiculoId={vehiculo?.id}
                    </Typography>
                </Cards>
                <div style={{width:"90%", margin:"0 auto"}}>
                    <DynamicForm
                        column={1}
                        formJson={formJson}
                        onSubmit={onSubmit}
                        textoBoton="Compartir"
                        ButtonSecondary={true}
                        textoBotonSecondary="Cancelar"
                        functionSecondary={() => setOpenModal(false)}
                    />
                </div>
            </Modals>
        </>
    )
}
