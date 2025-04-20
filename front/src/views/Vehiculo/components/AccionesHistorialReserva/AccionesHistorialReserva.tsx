import React, { useState } from "react";
import { colores } from "../../../../styles/colors";
import { ModalResena } from "./ModalResena";
import { Buttons } from "../../../../components/Buttons";

interface Props {
  reserva: any;
  cargaDatos: () => Promise<void>
}

export const AccionesHistorialReserva = (props: Props) => {
  const { reserva, cargaDatos } = props;
  const [openModalResena, setOpenModalResena] = useState(false);

  const handleClickResena = () => {
    setOpenModalResena(true);
  };

  return (
    <>
      <ModalResena
        openModal={openModalResena}
        setOpenModal={setOpenModalResena}
        reserva={reserva}
        cargaDatos={cargaDatos}
      />
      <div
        style={{
          display: "flex",
          textAlign: "center",
          marginTop: "0px",
          marginBottom: "4px",
        }}
      >
        <Buttons
          text="Añadir reseña"
          variant="text"
          onClick={handleClickResena}
          styles={{
            backgroundColor: colores.CornflowerBlue,
            color: colores.PennBlue,
            ":hover": {
              backgroundColor: colores.PennBlue,
              color: colores.AntiFlashWhite,
            },
          }}
        />
      </div>
    </>
  );
};
