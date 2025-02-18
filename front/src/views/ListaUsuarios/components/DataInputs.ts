import { FormJson } from '../../../components/Formik/interface';
import { userList } from '../../../service/Users/apiUsers';


const roles = [
    {id:1, rol:"USER"},
    {id:2, rol:"ADMIN"},
]


export const DataInputs = () => {
 const formData = (user:userList) => {
         const JsonInfo: FormJson[] = [
            {
                label: "Rol",
                name: "rol",
                type: "select",
                value: user.rol == "USER" ? 1 : 2,
                size: "small",
                validation: [
                    {
                        type: "required",
                    },
                ],
                selectValues: {
                    datos: roles,
                    datosMostrar: "rol",
                    value: "rol",
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
