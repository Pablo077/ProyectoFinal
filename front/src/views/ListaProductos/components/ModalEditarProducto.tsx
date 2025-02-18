import React, { useContext, useEffect, useState } from "react";
import { Vehiculo } from "../../../service/Vehiculo/apiVehiculo";
import { Modals } from "../../../components/Modals";
import { Typography } from "@mui/material";
import { colores } from "../../../styles/colors";
import { DynamicForm } from "../../../components/Formik/DynamicForm";
import { DataInputs } from "./DataInputs";
import { apiCaja } from "../../../service/Caja/apiCaja";
import { apiDireccion } from "../../../service/Direccion/apiDireccion";
import { apiCategoria } from "../../../service/Categoria/apiCategoria";
import { buscarPorId } from "../../../utils/utils";
import { apiVehiculo } from "../../../service/Vehiculo/apiVehiculo";
import { VehiculoContext } from "../../../context/VehiculoContext";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  vehiculo: Vehiculo;
}

export const ModalEditarProducto = (props: Props) => {
  const { openModal, setOpenModal, vehiculo } = props;
  const { formData } = DataInputs();
  const { putVehiculo } = apiVehiculo();
  const { getCajas } = apiCaja();
  const { getDireccion } = apiDireccion();
  const { getCategoria } = apiCategoria();
  const { cargarVehiculos, setOpenSnack, setMensajeSnack, setAlertSnack } =
    useContext(VehiculoContext);
  const [caja, setCaja] = useState([]);
  const [direccion, setDireccion] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const onSubmit = async (values: any) => {
    const cajaOb = buscarPorId(caja, values.caja_id);
    const direccionOb = buscarPorId(direccion, values.direccion_id);
    const categoriaOb = buscarPorId(categoria, values.categoria_id);

    // Eliminando las propiedades con desestructuración
    const { caja_id, direccion_id, categoria_id, ...valuesNuevo } = values;
    const valuesFinal = {
      ...valuesNuevo,
      caja: cajaOb,
      direccion: direccionOb,
      categoria: categoriaOb,
      mainImage: vehiculo.mainImage,
      id: vehiculo.id,
      filesName: vehiculo.filesName,
    };

    try {
      const response = await putVehiculo(valuesFinal);

      if (response.id) {
        setMensajeSnack("Vehiculo Actualizado");
        setAlertSnack("success");
        setOpenSnack(true);
        cargarVehiculos();
        setOpenModal(false);
      } else {
        setMensajeSnack("Error al actualizar");
        setAlertSnack("error");
        setOpenSnack(true);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const cargarDatos = async () => {
    setCaja(await getCajas());
    setDireccion(await getDireccion());
    setCategoria(await getCategoria());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <Modals open={openModal} setOpen={setOpenModal}>
        <Typography textAlign={"center"} color={colores.AntiFlashWhite}>
          Editar Vehículo
        </Typography>

        <div style={{ marginTop: "30px" }}>
          <DynamicForm
            column={2}
            formJson={formData(vehiculo, caja, direccion, categoria)}
            onSubmit={onSubmit}
            textoBoton="Actualizar"
          />
        </div>
      </Modals>
    </>
  );
};
