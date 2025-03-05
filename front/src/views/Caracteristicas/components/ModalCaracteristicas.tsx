import { Modals } from "../../../components/Modals";
import { Typography } from "@mui/material";
import { colores } from "../../../styles/colors";
import { useContext, useEffect, useState } from "react";
import { apiCaracteristica } from "../../../service/Caracterica/apiCaracteristica";
import { Vehiculo } from "../../../service/Vehiculo/apiVehiculo";
import { DataInputs } from "./DataInputs";
import { DynamicForm } from "../../../components/Formik/DynamicForm";
import { Iconos } from "./Iconos";
import { VehiculoContext } from "../../../context/VehiculoContext";
import { erroresAxios } from "../../../utils/utils";
import Icon from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';
import { Buttons } from "../../../components/Buttons";

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    vehiculo: Vehiculo;
}

export const ModalCaracteristicas = (props: Props) => {
    const { openModal, setOpenModal, vehiculo } = props;
    const { formData } = DataInputs();
    const { getCaracteristicasVehiculo, saveCaracteristica, updateCaracteristica } = apiCaracteristica();
    const [caracteristica, setCaracteristicas] = useState([]);
    const [edit, setEdit] = useState(false);
    const [borrar, setBorrar] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const { setOpenSnack, setMensajeSnack, setAlertSnack } =
        useContext(VehiculoContext);

    const CargarCaracteristicas = async () => {
        const result = await getCaracteristicasVehiculo(vehiculo);
        setCaracteristicas(result);
    }

    const onSubmit = async (values: any) => {
        try {
            const caracteristica = edit ? { id:values.id, nombre: values.Nombre, icono: values.icono, vehiculo: vehiculo } 
            : { nombre: values.Nombre, icono: values.icono, vehiculo: vehiculo };

            console.log(values)
            // let response
            // if(edit){
            //     response = await updateCaracteristica(caracteristica);
            // }
            // else{
            //     response = await saveCaracteristica(caracteristica);
            // }
            // if (response.id) {
            //     CargarCaracteristicas();
            //     setMensajeSnack(edit ? "Se actualiza correctamente" :"Se ingresa valor correctamente");
            //     setAlertSnack("success");
            //     setOpenSnack(true);
            // } else {
            //     setMensajeSnack("Error al actualizar");
            //     setAlertSnack("error");
            //     setOpenSnack(true);
            // }

        } catch (error) {
            setMensajeSnack(erroresAxios(error).data);
            setAlertSnack("error");
            setOpenSnack(true);
        }
    }

    const handleEditClick = (carac: any) => {
        setEdit(true);
        setSelected(carac);
    }

    const handleDeleteClick = (carac: any) => {
        setBorrar(true);
        setSelected(carac);
    }

    const back = () => {
        setBorrar(false);
        setSelected(null);
    }

    const functionSecondary = () => {
        if (edit) {
            setEdit(false);
            setSelected(null);
        } else {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        if (openModal === true) {
            CargarCaracteristicas()
        }
    }, [openModal])

    return (
        <>
            <Modals open={openModal} setOpen={setOpenModal}>
                <Typography textAlign={"center"} color={colores.AntiFlashWhite} sx={{ fontSize: '25px' }}>
                    Caracteristicas
                </Typography>

                {
                    borrar ?
                        <>
                            <Typography textAlign={"center"} color={colores.AntiFlashWhite} sx={{ fontSize: '20px', marginTop: '20px' }}>
                                ¿Estas seguro de eliminar?
                            </Typography>

                            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                                <Iconos iconNumber={selected.icono} />
                                <Typography sx={{ marginLeft: "5px" }}>{selected.nombre}</Typography>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Buttons variant="contained" text="Aceptar" styles={{}} />
                                <Buttons variant="contained" text="Volver" styles={{ marginLeft: "10px" }} onClick={back} />
                            </div>

                        </>
                        :
                        <>


                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '20px' }}>
                                {caracteristica?.map((carac: any) => (
                                    <div key={carac.id} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Iconos iconNumber={carac.icono} size={1.3} />
                                        <Typography sx={{ marginLeft: "5px" }}>{carac.nombre}</Typography>
                                        <span style={{ marginLeft: "5px" }}>
                                            <span onClick={() => handleEditClick(carac)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                                                <Icon path={mdiPencil} size={0.7} color={colores.Jasper} />
                                            </span>
                                            <span onClick={() => handleDeleteClick(carac)} style={{ cursor: 'pointer' }}>
                                                <Icon path={mdiDelete} size={0.7} color={colores.SlateGray} />
                                            </span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Typography textAlign={"center"} color={colores.AntiFlashWhite} sx={{ fontSize: '25px', marginTop: '20px' }}>
                                Agregar caracteristicas
                            </Typography>
                            <div style={{ marginTop: "20px", textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <DynamicForm
                                        key={selected ? selected.id : 'new'}
                                        column={2}
                                        formJson={formData(selected)}
                                        onSubmit={onSubmit}
                                        textoBoton={edit ? "Actualizar" : "Ingresar"}
                                        ButtonSecondary={true}
                                        functionSecondary={functionSecondary}
                                        textoBotonSecondary={edit ? "Volver" : "Cancelar"}
                                    />
                                </div>
                            </div>
                        </>
                }


            </Modals>
        </>
    )
}
