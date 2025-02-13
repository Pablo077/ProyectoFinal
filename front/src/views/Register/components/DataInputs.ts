import { FormJson } from "../../../components/Formik/interface";


export const formJson: FormJson[] = [
    {
        label: "Nombre",
        name: "firstname",
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
    {
        label: "Apellido",
        name: "lastname",
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
    {
        label: "Email",
        name: "email",
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
    {
        label: "Contraseña",
        name: "password",
        type: "password",
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




