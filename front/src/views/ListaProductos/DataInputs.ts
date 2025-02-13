import { useEffect, useState } from "react";
import { apiCaja } from "../../service/Caja/apiCaja";
import { apiCategoria } from "../../service/Categoria/apiCategoria";
import { apiDireccion } from "../../service/Direccion/apiDireccion";
import { FormJson } from "../../components/Formik/interface";
import { Caja, Categoria, Direccion, Vehiculo } from "../../service/Vehiculo/apiVehiculo";



export const DataInputs = () => {

    // const { getCajas } = apiCaja();
    // const { getDireccion } = apiDireccion();
    // const { getCategoria } = apiCategoria();
    // const [caja, setCaja] = useState([]);
    // const [direccion, setDireccion] = useState([]);
    // const [categoria, setCategoria] = useState([]);

    // const cargarDatos = async () => {
    //     setCaja(await getCajas());
    //     setDireccion(await getDireccion());
    //     setCategoria(await getCategoria());
    // }

    // useEffect(() => {
    //     cargarDatos();
    // }, [])


    const formData = (vehiculo:Vehiculo, caja: Caja[], direccion: Direccion[], categoria: Categoria[]) => {
        const JsonInfo: FormJson[] = [
            {
                label: "Marca",
                name: "marca",
                type: "input",
                value: vehiculo?.marca,
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
                value: vehiculo?.modelo,
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
                value: vehiculo?.motor,
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
                value: vehiculo?.pasajeros,
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
                value: vehiculo?.valijasGrandes,
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
                value: vehiculo?.valijasChicas,
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
                value: vehiculo?.caja.id,
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
                value: vehiculo?.direccion.id,
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
                value: vehiculo?.categoria.id,
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
        return JsonInfo;
    }


    return {
        formData
    }
}
