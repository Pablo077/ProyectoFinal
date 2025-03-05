import { FormJson } from "../../../components/Formik/interface";
import { IconosSelect } from "./Iconos";

export const DataInputs = () => {


    const formData = (selected: any) => {
        
        const JsonInfo: FormJson[] = [
            {
                label: "Icono",
                name: "icono",
                type: "select",
                value: selected ? selected.icono :"",
                size: "small",
                validation: [
                    {
                        type: "required",
                    },
                ],
                selectValues: {
                    datos: IconosSelect.datos,
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
            {
                label: "Caracteristica",
                name: "Nombre",
                type: "input",
                value: selected ? selected.nombre :"",
                size: "small",
                validation: [
                    {
                        type: "required",
                    },
                ],
                sxForm: {
                    width: "100%",
                    marginLeft: "10px",
                },
            },

        ];

        return JsonInfo
    }

    return {
        formData
    }
}





