import React, { useContext, useState } from 'react'
import { Modals } from '../../../../components/Modals'
import { Typography } from '@mui/material'
import { colores } from '../../../../styles/colors';
import { DynamicForm } from '../../../../components/Formik/DynamicForm';
import { formJson } from './DataInputs';
import { Ratings } from '../../../../components/Ratings';
import { apiPuntuacion } from '../../../../service/Puntuacion/apiPuntuacion';
import { VehiculoContext } from '../../../../context/VehiculoContext';
import { obtenerFechaActual } from '../../../../utils/utils';

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  reserva: any;
  cargaDatos: () => Promise<void>
}

export const ModalResena = (props:Props) => {
    const { openModal, setOpenModal, reserva, cargaDatos } = props;
    const [valor,setValor] = useState<number | null>(null);
    const { guardarPuntuacion } = apiPuntuacion();
    const { setOpenSnack, setMensajeSnack, setAlertSnack } =
        useContext(VehiculoContext);
    

const onSubmit = async (values: any) => {
    const data = {
      reservaId: reserva.id,
      valor: valor,
      resena: values.resena,
      fechaPuntuacion: obtenerFechaActual(),
    }
    try {
        const response = await guardarPuntuacion(data);
  
        if (response.id) {
          setMensajeSnack("Reseña guardada");
          setAlertSnack("success");
          setOpenSnack(true);
          cargaDatos();
          setOpenModal(false);
        } else {
          setMensajeSnack("Error al guardar reseña");
          setAlertSnack("error");
          setOpenSnack(true);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
   
}


  return (
    <>
    <Modals open={openModal} setOpen={setOpenModal}>
        <Typography textAlign={"center"} color={colores.AntiFlashWhite}>
          Añadir reseña
        </Typography>
        <div>
            <Ratings name="simple-controlled" titulo={true} tituloContenido='Puntuación' valueControlled={valor} setValueControlled={setValor} />
        </div>

        <div style={{ marginTop: "30px" }}>
          <DynamicForm
            column={1}
            formJson={formJson}
            onSubmit={onSubmit}
            textoBoton="Enviar"
            ButtonSecondary={true}
            textoBotonSecondary='Cancelar'
            functionSecondary={() => setOpenModal(false)}
          />
        </div>
      </Modals>
    </>
  )
}
