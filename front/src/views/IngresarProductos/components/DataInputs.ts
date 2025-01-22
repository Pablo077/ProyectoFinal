import { useEffect, useState } from "react";
import { FormJson } from "../../../components/Formik/interface";
import { apiCaja, ICaja } from "../../../service/Caja/apiCaja";
// import { apiDireccion } from "../../../service/Direccion/apiDireccion";

export interface IingPr {
  email: string;
  password: string;
}

export const DataInputs = () => {
  const { getCajas } = apiCaja();
  // const {getDireccion} = apiDireccion();
  const [caja, setCaja] = useState<ICaja[] | undefined>();
  // const [direccion, setDireccion]= useState([]);
  const ObtenerDatos = async () => {
    const caja = await getCajas();
    // const direccion = await getDireccion();
    setCaja(caja);
    // setDireccion(direccion);
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

 
    const formJsonIP: FormJson[] = [
      {
        label: "Nombre",
        name: "nombre",
        type: "input",
        value: "",
        size: "small",
        validation: [
          {
            type: "required",
          },
        ],
      },
      {
        label: "Descripción",
        name: "descripcion",
        type: "input",
        value: "",
        size: "small",
        validation: [
          {
            type: "required",
          },
        ],
      },
      {
        label: "Pasajeros",
        name: "pasajeros",
        type: "number",
        value: "",
        size: "small",
        validation: [
          {
            type: "required",
          },
        ],
      },
      {
        label: "Caja",
        name: "caja_id",
        type: "select",
        value: "",
        size: "small",
        validation: [
          {
            type: "required",
          },
        ],
        selectValues: {
          datos: caja,
          datosMostrar: "tipo",
          value: "",
        },
        sxSelect: {
          textAlign: "left",
        },
      },
    ];
 

  return { formJsonIP };
};
