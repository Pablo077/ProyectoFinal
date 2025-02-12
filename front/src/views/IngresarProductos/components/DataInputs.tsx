import { FormJson } from "../../../components/Formik/interface"
import { useEffect, useState } from "react";
import { apiCaja } from "../../../service/Caja/apiCaja";
import { apiDireccion } from "../../../service/Direccion/apiDireccion";
import { apiCategoria } from "../../../service/Categoria/apiCategoria";


export const DataInputs = () => {

  const { getCajas } = apiCaja();
  const { getDireccion } = apiDireccion();
  const { getCategoria } = apiCategoria();
  const [caja, setCaja] = useState([]);
  const [direccion, setDireccion] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const cargarDatos = async () => {
    setCaja(await getCajas());
    setDireccion(await getDireccion());
    setCategoria(await getCategoria());
  }

  useEffect(() => {
    cargarDatos();
  }, [])

  const JsonInfo: FormJson[] = [
    {
      label: "Marca",
      name: "marca",
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
      label: "Modelo",
      name: "modelo",
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
      label: "Motor",
      name: "motor",
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
        width: "100%",
      },
      sxSelect: {
        textAlign: "left",

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
        width: "100%",
      },
      sxSelect: {
        textAlign: "left",

      }
    },
    {
      label: "Categoría",
      name: "categoria_id",
      type: "select",
      value: "",
      size: "small",
      validation: [
        {
          type: "required",
        },
      ],
      selectValues: {
        datos: categoria,
        datosMostrar: "nombre",
        value: "",
      },
      sxForm: {
        width: "100%",
      },
      sxSelect: {
        textAlign: "left",

      }
    },

  ];

  return {
    JsonInfo
  }
}
