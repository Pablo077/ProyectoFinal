import { FormJson } from "../../../../../components/Formik/interface";

export const DataInputs = () => {
    const formData = () => {
      
        const JsonInfo: FormJson[] = [
            {
                label: "Nombre",
                name: "nombre",
                type: "input",
                value:  "",
                size: "small",
                validation: [
                  {
                    type: "required",
                  },
                ],
                sxForm: {
                  width: "100%",
                },
              },
                {
                    label: "Apellido",
                    name: "apellido",
                    type: "input",
                    value: "",
                    size: "small",
                    validation: [
                    {
                        type: "required",
                    },
                    ],
                    sxForm: {
                    width: "100%",
                    },
                },
            
        ];
        return JsonInfo;
    }
    return {
        formData
    }
}