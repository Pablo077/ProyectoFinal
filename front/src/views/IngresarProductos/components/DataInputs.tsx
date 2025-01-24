import { FormJson } from "../../../components/Formik/interface"
import { useEffect, useState } from "react";
import { apiCaja } from "../../../service/Caja/apiCaja";
import { apiDireccion } from "../../../service/Direccion/apiDireccion";


export const DataInputs = () => {

    const {getCajas} = apiCaja();
      const {getDireccion} = apiDireccion();
      const [caja,setCaja] = useState([]);
      const [direccion,setDireccion] = useState([]);
    
    
    
      const cargarDatos = async ()=>{
        setCaja(await getCajas());
        setDireccion(await getDireccion());
      }
    
      useEffect(() => {
        cargarDatos();
      }, [])

    const JsonInfo: FormJson[] = [
        {
          label: "Nombre",
          name: "nombre",
          type: "input",
          value: "",
          size: "small",
          validation: [
            {
              type: "",
            },
          ],
          sxForm: {
            width: "%100",
          },
        },
        {
            label: "Descripción",
            name: "descripcion",
            type: "input",
            value: "",
            size: "small",
            validation: [
              {
                type: "",
              },
            ],
            sxForm: {
              width: "%100",
            },
          },
          {
            label: "Pasajeros",
            name: "pasajeros",
            type: "number",
            value: "",
            size: "small",
            validation: [
              {
                type: "",
              },
            ],
            sxForm: {
              width: "%100",
            },
          },
          {
            label: "Valijas grandes",
            name: "valijasGrandes",
            type: "number",
            value: "",
            size: "small",
            validation: [
              {
                type: "",
              },
            ],
            sxForm: {
              width: "%100",
            },
          },
          {
            label: "Valijas chicas",
            name: "valijasChicas",
            type: "number",
            value: "",
            size: "small",
            validation: [
              {
                type: "",
              },
            ],
            sxForm: {
              width: "%100",
            },
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
            sxForm: {
              width: "170px",
            },
            sxSelect:{
              textAlign:"left",
              with:"%100",
            }
          },
          {
            label: "Dirección",
            name: "direccion_id",
            type: "select",
            value: "",
            size: "small",
            validation: [
              {
                type: "required",
              },
            ],
            selectValues: {
              datos: direccion,
              datosMostrar: "tipo",
              value: "",
            },
            sxForm: {
              width: "170px",
            },
            sxSelect:{
              textAlign:"left",
              with:"%100",
            }
          },
        
      ];

  return {
    JsonInfo
  }
}
